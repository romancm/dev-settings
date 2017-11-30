<template>
    <el-menu
        mode="horizontal"
        @select="handleNavItem"
        background-color="#409eff"
        text-color="#fff"
        active-text-color="#fff"
    >
        <el-menu-item index="dashboard" class="logo">Atom Settings</el-menu-item>
        <el-menu-item index="browse">Browse</el-menu-item>
        <el-menu-item index="login" class="right" v-if="!session.token">
            <el-button type="success" plain>Login</el-button>
        </el-menu-item>
        <el-menu-item index="settingsGetStarted" class="right settings" v-else>
            <i class="el-icon-setting" aria-hidden="true"></i>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        components: {
            Avatar,
        },

        computed: {
            session() { return store.getters.session; },
            meta() { return this.$route.meta; },
            environment() { return store.getters.environment; },
            githuburl() {
                return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`;
            },
        },

        methods: {
            handleNavItem(routeName) {
                if (routeName === 'login') {
                    window.location.href = this.githuburl;
                } else {
                    this.$router.push({ name: routeName });
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";
    .logo {
        font-size: 18px;
        font-weight: bold;
    }
    .el-menu--horizontal {
        .el-menu-item {
            border-bottom: none !important;
            background: transparent !important;
        }
        .settings {
            i {
                color: #fff !important;
                margin-right: 0;
            }
        }
        .right {
            float: right;
        }
    }
</style>
