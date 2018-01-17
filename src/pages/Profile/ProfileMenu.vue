<template lang="html">
    <div>
        <!-- <pre>{{user}}</pre> -->
        ONLY CACHE CODE/ATOM NOT BOTH AT ONCE
        <pre>{{codeData}}</pre>
        <pre>{{atomData}}</pre>
        <el-menu :default-active="activeName" mode="horizontal" class="el-menu-vertical-demo" @select="handleMenuClick" v-if="editor === 'atom'">
            <el-menu-item index class="avatar">
                <img :src="user.avatar" :alt="user.user">
                <!-- {{user.user}} -->
                <span slot="title">{{user.user}}</span>
            </el-menu-item>
            <el-menu-item index="packages">
                <i class="fa fa-arrow-left" aria-hidden="true" v-if="isPackageSelected" />
                <i class="fa fa-archive" aria-hidden="true" v-else />

                <span slot="title">Packages</span>
            </el-menu-item>
            <el-menu-item index="init-script">
                <i class="fa fa-terminal" aria-hidden="true" />
                <span slot="title">Init Script</span>
            </el-menu-item>
            <el-menu-item index="keymaps">
                <i class="fa fa-keyboard-o" aria-hidden="true" />
                <span slot="title">Keymaps</span>
            </el-menu-item>
            <el-menu-item index="settings">
                <i class="fa fa-cogs" aria-hidden="true" />
                <span slot="title">Settings</span>
            </el-menu-item>
            <el-menu-item index="snippets">
                <i class="fa fa-code" aria-hidden="true" />
                <span slot="title">Snippets</span>
            </el-menu-item>
            <el-menu-item index="styles">
                <i class="fa fa-css3" aria-hidden="true" />
                <span slot="title">Styles</span>
            </el-menu-item>
        </el-menu>

        <el-menu :default-active="activeName" mode="horizontal" class="el-menu-vertical-demo" @select="handleMenuClick" v-if="editor === 'code'">
            <el-menu-item index class="avatar">
                <img :src="user.avatar" :alt="user.user">
                <span slot="title">{{user.user}}</span>
            </el-menu-item>
            <el-menu-item index="packages">
                <i class="fa fa-arrow-left" aria-hidden="true" v-if="isPackageSelected" />
                <i class="fa fa-archive" aria-hidden="true" v-else />

                <span slot="title">Extensions</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import msg from '@/msg';
import moment from 'moment';
import { store } from '@/store';

export default {
    data() {
        return {
            activeName: '',
            sections: ['packages', 'init-script', 'keymaps', 'settings', 'snippets', 'styles'],
        };
    },

    computed: {
        editor() { return store.getters.editor; },
        environment() { return store.getters.environment; },
        gistData() { return store.getters.gistCache[this.id]; },
        atomData() { return store.getters.atomCache[this.id]; },
        codeData() { return store.getters.codeCache[this.id]; },
        id() { return this.$route.params.id; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        packages() { return this.gistData ? JSON.parse(this.gistData.files['packages.json'].content) : null; },
        routeName() { return this.$route.name; },
        user() { return store.getters.userCache[this.id]; },
        isPackageSelected() { return this.$route.params.packageName; },
    },

    watch: {
        routeName() {
            this.activeName = this.routeName;
        },
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            // TODO: clean up this logic
            if (!this.user) {
                this.getUser();
            }

            if (!this.atomData) {
                this.getAtomData();
                console.log('get atom data');
            }

            if (!this.codeData) {
                this.getCodeData();
                console.log('get code data');
            }
        },


        getAtomData(id) {
            console.log(this.user);
            const atomGistId = id || this.user.atom;
            console.log(atomGistId);

            if (atomGistId) {
                const url = `https://api.github.com/gists/${atomGistId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        store.commit('cacheUserAtomData', data);
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error',
                        });
                    });
            }
        },

        getCodeData(id) {
            console.log(this.user);
            const codeGistId = id || this.user.code;
            console.log(codeGistId);

            if (codeGistId) {
                const url = `https://api.github.com/gists/${codeGistId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        store.commit('cacheUserCodeData', data);
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error',
                        });
                    });
            }
        },

        moment() {
            return moment();
        },

        isCurrentRoute(route) {
            return route === this.$route.name;
        },

        getUser() {
            this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
                .then(({ data }) => {
                    console.log(data);
                    store.commit('cacheUser', data);

                    this.getGistData(data.gistId);
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: msg.errors.user,
                    });
                });
        },

        handleMenuClick(name) {
            console.log(name);
            console.log(this.$route.path);
            if (this.sections.includes(name) || name === '') {
                this.$router.push({ path: `/profile/${this.$route.params.id}/${name}` });
            } else {
                this.$router.push({ path: `/profile/${this.$route.params.id}/packages/${name}` });
            }
        },
    },

};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";

    .avatar {
        padding: 0;
        // height: 64px;

        .el-tooltip  {
            padding: 0 !important;
        }

        img {
            cursor: pointer;
            max-width: 100%;
            height: 64px;
            width: 64px;
            display: flex;
        }
    }

    .profile {
    display: flex;
    flex-direction: column;

    pre[class*="language-"] {
        padding: $gp * 2;
        font-size: 11px;
        margin: 0;
        overflow: auto;
        border-radius: 0;
        width: 100%;
        min-height: calc(100vh - 360px);

        @media($xs) {
            padding: $gp;
        }
    }


        .el-menu {
            border-right: none;
            .el-menu-item, .el-submenu {
                text-align: center;

                i {
                    font-size: $menu-icon-size;
                }
            }
            .el-submenu {
                .el-menu {
                    // display: block !important;
                    background: transparent;
                    margin-left: 0 !important;
                    border: 0 !important;
                    box-shadow: none !important;

                    .el-menu-item-group {
                        .el-menu-item-group__title {
                            background: #ccc;
                            height: 30px;
                            margin-top: 13px;
                            display: flex;
                            color: $color-white;
                            align-items: center;
                            font-size: 14px;
                            color: $color-primary-text;
                            padding: 0 $gp * 2 !important;
                        }

                        > ul {
                            height: calc(100vh - 300px);
                            overflow-y: auto;
                            // margin-top: $gp;
                            background: $color-white;
                            margin-left: $gp;

                            li {
                                height: auto;
                                text-align: left;
                                line-height: normal;
                                padding: $gp / 2 $gp !important;

                                font-size: 13px;
                                min-width: 200px;
                                color: $color-atom;
                            }
                        }
                    }


                }
                &.is-active, &.is-opened {
                    .el-submenu__title i {
                        color: $color-primary;
                    }
                }
            }
        }
}
</style>
