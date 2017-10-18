<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h2>Settings</h2>

                <aside class="sidebar col-xs-12 col-sm-3">
                    <div class="row">
                        <router-link  v-for="{icon, name, path, title} in settingsRoutes" :to="{ name: name }" class="btn btn-info" :class="{ active: isCurrentRoute(name), 'btn-warning': isMissingGist(name) }">
                            <i :class="['fa', `fa-warning`]" aria-hidden="true" v-if="isMissingGist(name)"></i>
                            <i :class="['fa', `fa-${icon}`]" aria-hidden="true" v-else></i>
                            {{title}}
                        </router-link>
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
import { store } from '@/store';

export default {
    data() {
        return {
            settingsRoutes: [
                {
                    name: 'settingsGetStarted',
                    title: 'Get Started',
                    icon: 'home',
                },
                {
                    name: 'settingsGithub',
                    title: 'Github',
                    icon: 'github',
                },
                {
                    name: 'settingsProfile',
                    title: 'Profile',
                    icon: 'user',
                },
                {
                    name: 'settingsSocial',
                    title: 'Social Networks',
                    icon: 'share-alt',
                },
                {
                    name: 'settingsAccount',
                    title: 'Account',
                    icon: 'lock',
                },
            ],
        };
    },

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.name;
        },

        isMissingGist(name) {
            return name === 'settingsGithub' && !this.session.user.gistId;
        },
    },

    computed: {
        session() { return store.getters.session; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

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
