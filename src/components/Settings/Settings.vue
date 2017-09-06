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

                <div class="col-xs-12 col-sm-9">
                    <div v-if="isSettingsHome">
                        <pre>{{user}}</pre>
                        <h3>Hello, {{user.firstName}}!</h3>
                        <!-- {{user.settings.gistId}} -->
                    </div>
                    <router-view v-else />
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
                    path: '/settings/profile',
                    title: 'Profile',
                    icon: 'user',
                },
                {
                    path: '/settings/github',
                    title: 'Github',
                    icon: 'github',
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
            return route === '/settings/github' && (!this.user.settings || !this.user.settings.gistId);
        },
    },

    computed: {
        isSettingsHome() {
            return this.$route.path === '/settings/';
        },
        user() { return store.getters.user; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";
    .sidebar {
        a {
            width: 100%;
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
</style>
