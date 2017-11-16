<template>
    <el-menu
        :default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#fff"
    >
        <el-menu-item v-for="({name, title, isButton, auth, titleAuth}, index) in menuItems" :index="index">
            <span v-if="isButton">
                <el-button type="success">
                    <span v-if="!session.token">
                        {{title}}
                    </span>
                    <span v-else>
                        {{titleAuth}}
                    </span>
                </el-button>
            </span>
            <span v-else>
                <span>
                    {{title}}
                </span>
            </span>

        </el-menu-item>
         <!-- v-if="!session.token && !auth" -->
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

        data() {
            return {
                active: false,
                hideNav: false,
                menuItems: [
                    { name: 'dashboard', title: 'AtomSettings' },
                    { name: 'browse', title: 'Browse' },
                    { name: 'settingsGetStarted', title: 'Settings', auth: true },
                    { name: 'session', title: 'Login with GitHub', titleAuth: 'Logout', isButton: true },
                ],
            };
        },

        methods: {
            logout() {
                store.commit('logout');
                this.$toasted.success('Successfully logged out');
                this.$router.push({ path: '/logout' });
            },

            handleSelect(i) {
                const name = this.menuItems[i].name;
                if (name === 'session') {
                    if (this.session && this.session.token) {
                        this.$router.push({ name: 'logout' });
                    } else {
                        window.location.href = this.githuburl;
                    }
                } else {
                    this.$router.push({ name });
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";
    .userMenu {
        background: #cf0;
        float: right;
        color: #fff;
        .el-submenu__title i {
            color: #fff;
        }
        .avatar {
            float: left;
        }
    }

    // .el-menu {
    //     right: $gp;
    //     left: auto;
    // }
</style>
