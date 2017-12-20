<template lang="html">
    <div class="profile">
        <aside>
            <user-card />
            <el-menu :default-active="activeName" class="el-menu-vertical-demo" collapse @select="handleMenuClick">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="fa fa-archive" aria-hidden="true" />
                        <span slot="title">Packages</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">
                            Packages
                        </span>
                        <el-menu-item :index="name" v-for="{ name } in packages">{{name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
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
        </aside>

        <router-view />
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';
import moment from 'moment';
import UserCard from './UserCard';

export default {
    components: {
        UserCard,
    },

    data() {
        return {
            activeName: '',
            sections: ['packages', 'init-script', 'keymaps', 'settings', 'snippets', 'styles'],
        };
    },

    computed: {
        id() { return this.$route.params.id; },
        user() { return store.getters.userCache[this.id]; },
        gistData() { return store.getters.gistCache[this.id]; },
        environment() { return store.getters.environment; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        packages() { return JSON.parse(this.gistData.files['packages.json'].content); },
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            document.title = `${this.id} Settings | Atom Settings`;

            // TODO: clean up this logic
            if (!this.user) {
                this.getUser();
            } else if (!this.gistData) {
                this.getGistData();
            }
        },

        getUser() {
            this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
                .then(({ data }) => {
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

        getGistData(id) {
            const gistId = id || this.user.gistId;

            if (gistId) {
                const url = `https://api.github.com/gists/${gistId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        store.commit('cacheUserGistData', data);
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error',
                        });
                    });
            }
        },

        handleMenuClick(name) {
            if (this.sections.includes(name)) {
                this.$router.push({ path: `/browse/${this.$route.params.id}/${name}` });
            } else {
                this.$router.push({ path: `/browse/${this.$route.params.id}/packages/${name}` });
            }
        },

        moment() {
            return moment();
        },

        isCurrentRoute(route) {
            return route === this.$route.name;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";
    @import "~styles/_profile";

    aside {
        background: #fff;
    }

    .profile {
        display: flex;
        // align-items: center;
        // flex-direction: column;
    }

    .el-menu {
        border-right: none;
        > li {
            text-align: center;
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
</style>
