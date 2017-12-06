<template>
    <el-container>
        <el-aside width="auto">
            <el-row>
                <el-menu
                    default-active="settingsGetStarted"
                    @select="select"
                    :collapse="isMobile"
                >
                    <el-menu-item v-for="({icon, name, path, title}, index) in settingsRoutes" :index="name" :key="index">
                        <i :class="['fa', `fa-warning`]" aria-hidden="true" v-if="isMissingGist(name)"></i>
                        <i :class="['fa', `fa-${icon}`]" aria-hidden="true" v-else></i>
                        <span slot="title">{{title}}</span>
                    </el-menu-item>
                </el-menu>
            </el-row>
        </el-aside>
        <el-main>
            <h2>Settings</h2>
            <router-view />
        </el-main>
    </el-container>
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
                    title: 'About You',
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

        select(routeName) {
            this.$router.push({ name: routeName });
        },
    },

    computed: {
        session() { return store.getters.session; },
        isMobile() {
            return this.$mq.resize && this.$mq.below(768);
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .el-main {
        background: rgba(255, 255, 255, 0.7);
        height: calc(100vh - 60px);
        border-left: 1px solid $color-base-border;
    }

    .el-aside {
        height: 100%;

        .el-menu {
            border-right: 0;
            background: transparent;
            .el-menu-item {
                .fa {
                    margin: 0 10px;

                    @media($xs) {
                        margin: 0;
                        text-align: center;
                        font-size: 20px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
