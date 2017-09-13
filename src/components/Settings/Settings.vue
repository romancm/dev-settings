<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2 class="page-header">Settings</h2>

                <aside class="sidebar col-xs-12 col-sm-3">
                    <div class="row">
                        <a v-for="route in settingsRoutes" class="btn btn-info" :class="{ active: isCurrentRoute(route.path), 'btn-warning': isMissingGist(route.path) }" :href="`#${route.path}`">
                            <i :class="['fa', `fa-warning`]" aria-hidden="true" v-if="isMissingGist(route.path)"></i>
                            <i :class="['fa', `fa-${route.icon}`]" aria-hidden="true" v-else></i>
                            {{route.title}}
                        </a>
                    </div>
                </aside>

                <div class="settings-content col-xs-12 col-sm-9">
                    <div v-if="isSettingsHome">
                        <h3>Hello, {{user.firstName}}!</h3>
                        <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p>
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <vue-markdown :source="instructions" v-if="instructions" />
                            </div>
                        </div>
                    </div>
                    <router-view v-else />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '../../store';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            instructions: null,
            settingsRoutes: [
                {
                    path: '/settings/github',
                    title: 'Github',
                    icon: 'github',
                },
                {
                    path: '/settings/profile',
                    title: 'Profile',
                    icon: 'user',
                },
                {
                    path: '/settings/social',
                    title: 'Social Networks',
                    icon: 'share-alt',
                },
                {
                    path: '/settings/account',
                    title: 'Account',
                    icon: 'lock',
                },
            ],
        };
    },

    mounted() {
        this.getSyncReadme();
    },

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.path;
        },

        isMissingGist(route) {
            return route === '/settings/github' && !this.user.gistId;
        },

        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },
    },

    computed: {
        isSettingsHome() {
            return this.$route.path === '/settings';
        },
        user() { return store.getters.user; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";
    .sidebar {
        a {
            width: calc(100% - 30px);
            display: inline-flex;
            align-items: center;
            margin-bottom: 15px;

            @media($xs) {
                width: auto;
                margin-left: 15px;
                &:first-child {
                    margin-left: 0;
                }
            }
        }
    }

    .settings-content {
        border-left: 1px solid #eeeeee;
        @media($xs) {
            border: 0;
        }
    }
</style>
