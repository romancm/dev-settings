<template lang="html">
    <div class="user-packages">
        <div class="package-list" v-if="!packageName">
            <el-button type="text" plain v-for="{ name } in packages" :key="name" @click="goToPackage(name)">
                <i class="fa" :class="getPackageIcon(name)"></i>
                {{name}}
            </el-button>
        </div>

        <div v-else>
            <div class="package-toolbar" :v-loading="!loading && packageData">
                <gh-btns-watch :slug="formattedRepository" :show-count="!isMobile"/>
                <gh-btns-star :slug="formattedRepository" :show-count="!isMobile"/>
                <gh-btns-fork :slug="formattedRepository" :show-count="!isMobile"/>
            </div>

            <vue-markdown :source="packageData.readme" v-if="packageData" />
        </div>
    </div>
</template>

<script>
import { store } from '@/store';
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            packageData: null,
            loading: false,
            showPackageMenu: true,
        };
    },


    computed: {
        id() { return this.$route.params.id; },
        editor() { return store.getters.editor; },
        packageName() { return this.$route.params.packageName; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        gistData() { return store.getters.gistCache[this.id]; },
        packages() { return this.gistData ? JSON.parse(this.gistData.files['packages.json'].content) : null; }, // eslint-disable-line
        formattedRepository() { return !this.loading && this.packageData && this.packageData.repository ? this.packageData.repository.url.split('github.com/')[1] : 'atom/about'; }, // eslint-disable-line
        sections() { return Math.ceil(this.packages.length / 30); },
    },

    watch: {
        packageName() {
            this.loadPackage();
        },
    },

    mounted() {
        document.title = `${this.id} Packages | Atom Settings`;

        this.loadPackage();
    },

    methods: {
        getPackageIcon(name) {
            if (name.includes('language')) { return 'fa-language'; }
            if (name.includes('theme')) { return 'fa-paint-brush'; }
            if (name.includes('-ui')) { return 'fa-paint-brush'; }
            if (name.includes('syntax')) { return 'fa-code'; }

            return 'fa-archive';
        },

        selectPackage(name) {
            this.showPackageMenu = false;

            const params = {
                ...this.$route.params,
                packageName: name,
            };

            this.$router.push({ name: 'package', params });
        },

        togglePackageMenu() {
            this.showPackageMenu = !this.showPackageMenu;
        },

        goToPackage(name) {
            this.$router.push({ path: `/${this.editor}/${this.$route.params.id}/packages/${name}` });
        },

        loadPackage() {
            if (this.packageName) {
                this.loading = true;
                this.$http.get(`https://www.atom.io/api/packages/${this.packageName}`)
                .then(({ data }) => {
                    this.loading = false;
                    this.packageData = data;
                })
                .catch(() => {
                    console.log('err');
                });
            } else {
                // this.selectPackage('about');
                this.packageData = null;
            }
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";
    .package-list {
        margin: 0;
        padding: 0;
        height: calc(100vh -60px);
        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;

        @media($xs) {
            column-count: 1;
            // height: calc(100vh -30px);
        }
        @media($sm) {
            column-count: 2;
        }
        .el-button {
            width: 100%;
            text-align: left;
            padding-left: $gp;
            // padding: 0 $gp;
            &+.el-button {
                margin: 0;
            }
        }
    }

    .package-toolbar {

        position: absolute;
        padding: $gp $gp / 2;
        background: $color-white;
        top: 0;
        right: 0;
        border-bottom: 1px solid $color-base-border;
        border-left: 1px solid $color-base-border;

        @media($xs) {
            background: transparent;
            position: static;
            padding: 0;
            top: auto;
            border: none;
            display: flex;

            .gh-button-container {
                margin: 0 $gp 0 0;
            }
        }

    }

    .user-packages {
        position: relative;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.2) !important;
        padding: $gp * 2;
        @media($xs) {
            height: calc(100vh - 80px);
            padding: $gp;
        }
        img {
            max-width: 100%;
        }
        pre {
            padding: $gp;
        }

        pre {
        	color: #c5c8c6;
        	text-shadow: 0 1px rgba(0, 0, 0, 0.3);
            font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
            overflow: auto;
            border-radius: 0.3em;
            background: #1d1f21;
            border-radius: .3em;
        }
    }

</style>
