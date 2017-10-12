<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2>Settings</h2>

                <aside class="sidebar col-xs-12 col-sm-3">
                    <div class="row">
                        <a v-for="route in settingsRoutes" class="btn btn-info" :class="{ active: isCurrentRoute(route.path), 'btn-warning': isMissingGist(route.path) }" :href="`${route.path}`">
                            <i :class="['fa', `fa-warning`]" aria-hidden="true" v-if="isMissingGist(route.path)"></i>
                            <i :class="['fa', `fa-${route.icon}`]" aria-hidden="true" v-else></i>
                            {{route.title}}
                        </a>
                    </div>
                </aside>

                <div class="settings-content col-xs-12 col-sm-9">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            settingsRoutes: [
                {
                    path: '/settings',
                    title: 'Get Started',
                    icon: 'home',
                },
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

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.path;
        },

        isMissingGist(route) {
            return route === '/settings/github' && !this.session.user.gistId;
        },
    },

    computed: {
        session() { return store.getters.session; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";
    .page-header {
        margin-bottom: 0;
    }
    .settings-content, .sidebar {
        padding-top: 15px;
    }

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
