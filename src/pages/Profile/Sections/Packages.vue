<template lang="html">
    <div class="user-packages">
        <div class="package-toolbar" :v-loading="!loading && packageData">
            <gh-btns-watch :slug="formattedRepository" :show-count="!isMobile"/>
            <gh-btns-star :slug="formattedRepository" :show-count="!isMobile"/>
            <gh-btns-fork :slug="formattedRepository" :show-count="!isMobile"/>
        </div>

        <vue-markdown :source="packageData.readme" v-if="packageData" />
    </div>
</template>

<script>
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
        packageName() { return this.$route.params.packageName; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        formattedRepository() { return !this.loading && this.packageData && this.packageData.repository ? this.packageData.repository.url.split('github.com/')[1] : 'atom/about'; },
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


    .package-toolbar {

        position: fixed;
        padding: $gp $gp / 2;
        background: $color-white;
        top: 60px;
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
        height: calc(100vh - 100px);
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.2) !important;
        // border-top: 1px solid #ccc;
        padding: $gp * 2;
        width: 100%;
        @media($xs) {
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