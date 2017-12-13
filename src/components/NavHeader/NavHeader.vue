<template>
    <el-menu
        mode="horizontal"
        @select="handleNavItem"
        text-color="#fff"
        active-text-color="#fff"
        :class="{ isHome }"
    >
        <el-menu-item index="home" class="logo">Atom Settings</el-menu-item>
        <el-menu-item index="browse">Browse</el-menu-item>
        <el-menu-item index="login" class="right" v-if="!session.token">
            <el-button type="success" plain>Login</el-button>
        </el-menu-item>
        <el-menu-item index="settingsGetStarted" class="right settings" v-else>
            <i class="fa fa-cog fa-2x" aria-hidden="true" />
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
            isHome() { return this.$route.name === 'home'; },
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
    .el-menu {
        background: linear-gradient(to right,  rgba(23, 165, 255, .7) 0%, rgba(255, 55, 169, .7) 100%);
        border-bottom: none;

        &.isHome {
            background: transparent;
        }
    }

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
