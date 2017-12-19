<template lang="html">
    <div class="user-packages">
        <el-button
            type="primary"
            plain
            @click="togglePackageMenu"
            v-if="isMobile && !showPackageMenu"
        >
            <i class="fa fa-archive" aria-hidden="true"></i>
            Select Package
        </el-button>

        <el-container>
            <el-aside :class="{ show: showPackageMenu }">
                <el-menu
                    :default-active="packageName"
                    class="el-menu-vertical-demo"
                    @select="selectPackage"
                >
                    <el-menu-item :index="name" v-for="{name, version} in packages" :key="version">
                        <span slot="title">{{name}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main :class="{ hide: showPackageMenu }" v-loading="loading">
                <div class="package-toolbar" v-if="!loading && packageData">
                    <gh-btns-watch :slug="formattedRepository" show-count></gh-btns-watch>
            		<gh-btns-star :slug="formattedRepository" show-count></gh-btns-star>
            		<gh-btns-fork :slug="formattedRepository" show-count></gh-btns-fork>
                </div>

                <vue-markdown :source="packageData.readme" v-if="packageData" />
                <span v-if="!packageName">
                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                    Select a package
                </span>
            </el-main>
        </el-container>
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
        gistData() { return store.getters.gistCache[this.id]; },
        packages() { return JSON.parse(this.gistData.files['packages.json'].content); },
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
                // TODO: load default package?
                this.packageData = null;
            }
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";

    .package-toolbar {
        display: flex;
        align-items: center;

        .gh-button-container {
            margin: $gp $gp 0 0;
        }
    }

    .user-packages {
        .el-button {
            margin-bottom: $gp;
        }

        .el-menu {
            background: transparent;
            border-right: none;
            .el-menu-item {
                &.is-active {
                    background: $color-white;
                    border-top-left-radius: $border-radius;
                    border-bottom-left-radius: $border-radius;
                }
                height: 36px !important;
                line-height: 36px !important;
            }
        }

        .el-main {
            padding: $gp $gp * 2;
            background: $color-white;
            border-radius: $border-radius;

            img {
                max-width: 100%;
            }

            @media($xs) {
                &.hide {
                    display: none;
                    // width: 100% !important;
                }
            }
        }

        .el-aside {
            overflow-x: hidden;
            width: auto !important;
            max-width: 33%;

            @media($xs) {
                max-width: 100%;
                background: $color-white;
                display: none;
                &.show {
                    display: block;
                    width: 100% !important;
                }
            }
        }

        .el-aside, .el-main {
            height: calc(100vh - 170px);

            @media($xs) {
                height: auto;
            }
        }
    }

</style>
