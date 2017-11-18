<template>
    <el-container>
        <el-aside :width="sidebarWidth">
            <el-row>
                <el-menu
                    default-active="settingsGetStarted"
                    @select="select"
                    :collapse="isMobile"
                >
                    <el-menu-item v-for="({icon, name, path, title}, index) in settingsRoutes" :index="name">
                        <i :class="['fa', `fa-warning`]" aria-hidden="true" v-if="isMissingGist(name)"></i>
                        <i :class="['fa', `fa-${icon}`]" aria-hidden="true" v-else></i>
                        <span slot="title">{{title}}</span>
                    </el-menu-item>
                </el-menu>

                <el-button type="info" size="small" plain @click="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                </el-button>
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

        select(routeName) {
            this.$router.push({ name: routeName });
        },
        logout() {
            store.commit('logout');
            this.$toasted.success('Successfully logged out');
            this.$router.push({ path: '/logout' });
        },
    },

    computed: {
        session() { return store.getters.session; },
        isMobile() {
            return this.$mq.resize && this.$mq.below(768);
        },
        sidebarWidth() {
            return this.isMobile ? 'auto' : '240px';
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

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

    .el-button {
        margin: $gp $gp * 2;
    }
</style>
