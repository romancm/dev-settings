<template>
    <el-container>
        <el-aside width="auto">
            <el-row>
                <div class="userInfo">
                    <img :src="user.avatar" alt="user.user">
                    <strong class="userName">
                        {{user.user}}
                    </strong>
                </div>
                <el-menu
                    :default-active="activeName"
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
            activeName: 'link',
            settingsRoutes: [
                {
                    name: 'settingsLink',
                    title: 'Link Settings',
                    icon: 'home',
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

    mounted() {
        this.activeName = this.$route.name;
    },

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.name;
        },

        isMissingGist(name) {
            return name === 'settingsGithub' && !this.user.gistId;
        },

        select(routeName) {
            this.$router.push({ name: routeName });
        },
    },

    computed: {
        user() { return store.getters.session.user; },
        isMobile() {
            return this.$mq.resize && this.$mq.below(768);
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .userInfo {
        display: flex;
        flex-direction: column;
        width: 156px;

        @media($xs) {
            width: 64px;
        }

        img {
            width: 100%;
            margin: $gp;

            @media($xs) {
                margin: 0;
            }
        }

        .userName {
            margin-bottom: $gp;
            text-align: center;
            width: 100%;
            overflow-x: auto;
            margin-left: $gp;
            @media($xs) {
                display: none;
            }
        }
    }

    h2 {
        margin-top: 0;
    }

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
                &.is-active {
                    background: $color-white;
                }

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
