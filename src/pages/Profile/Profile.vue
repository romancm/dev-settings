<template lang="html">
    <div class="profile">
            <div class="profile-card" v-if="user">
                <div class="info">
                    <img :src="user.avatar" :alt="user.user" class="avatar">
                    <h2>{{user.user}}</h2>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name="packages" label="Packages"></el-tab-pane>
                    <el-tab-pane name="init-script" label="Init Script"></el-tab-pane>
                    <el-tab-pane name="keymaps" label="Keymaps"></el-tab-pane>
                    <el-tab-pane name="settings" label="Settings"></el-tab-pane>
                    <el-tab-pane name="snippets" label="Snippets"></el-tab-pane>
                    <el-tab-pane name="styles" label="Styles"></el-tab-pane>
                </el-tabs>
            </div>

            <el-container>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
    </div>
</template>

<script>
import msg from '@/msg';
import moment from 'moment';
import Avatar from '@/components/Avatar/Avatar';
import { store } from '@/store';

export default {
    components: {
        Avatar,
    },

    data() {
        return {
            activeName: '',
            sections: [
                {
                    title: 'Packages',
                    routeName: 'packages',
                    tab: 'Packages',
                    icon: 'fa-archive',
                },
                {
                    title: 'Init Script',
                    routeName: 'init-script',
                    tab: 'Init Script',
                    icon: 'fa-terminal',
                },
                {
                    title: 'Keymaps',
                    routeName: 'keymaps',
                    tab: 'Keymaps',
                    icon: 'fa-keyboard-o',
                },
                {
                    title: 'Settings',
                    routeName: 'settings',
                    tab: 'Settings',
                    icon: 'fa-cog',
                },
                {
                    title: 'Snippets',
                    routeName: 'snippets',
                    tab: 'Snippets',
                    icon: 'fa-file-code-o',
                },
                {
                    title: 'Styles',
                    routeName: 'styles',
                    tab: 'Styles',
                    icon: 'fa-css3',
                },
            ],
        };
    },

    computed: {
        id() { return this.$route.params.id; },
        user() { return store.getters.userCache[this.id]; },
        gistData() { return store.getters.gistCache[this.id]; },
        environment() { return store.getters.environment; },
    },

    mounted() {
        this.init();
    },

    methods: {
        init() {
            this.setActive();

            if (!this.user) {
                this.getUser();
            } else if (!this.gistData) {
                this.getGistData();
            }
        },

        setActive() {
            document.title = `${this.id} Settings | Atom Settings`;
            this.activeName = this.$route.path.split(`${this.$route.params.id}/`)[1];
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

        handleClick({ name }) {
            this.$router.push({ path: `/browse/${this.$route.params.id}/${name}` });
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
    .profile {
        .profile-card {
            background: $color-white;
            display: flex;
            @media($xs) {
                flex-direction: column;
            }
            padding: $gp;
            // margin: $gp * 2;

            .info {
                padding-right: $gp * 2;
                display: flex;

                @media($xs) {
                    padding-right: 0;
                    background: $color-white;
                    border-bottom: 1px solid #ccc;
                    align-items: center;
                }

                h2 {
                    line-height: 1.5em;
                    margin: 0;
                }
                .avatar {
                    margin-right: $gp;
                    width: 50px;
                    height: 50px;
                }
            }
        }

        .el-tabs__header {
            margin-bottom: 0;
        }
        .el-main {
            margin-top: 0;
            padding-top: 0;
        }
    }
</style>
