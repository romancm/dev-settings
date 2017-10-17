<template>
    <header>
        <div class="container">
            <span class="logo">
                <router-link to="/dashboard" v-if="session">
                    <img src="../../assets/logo.png" alt="">
                </router-link>

                <router-link to="/" v-else>
                    <img src="../../assets/logo-full.png" alt="">
                </router-link>

                <router-link to="/browse" v-if="!meta.hideNav">
                    Browse
                </router-link>
            </span>

            <section class="user-menu" v-if="!meta.hideNav">
                <span v-if="session && session.github">
                    <avatar id="userMenu" size="xs" @click="toggleUserMenu" circle />

                    <div class="user-dropdown" v-show="active">
                        <router-link to="/dashboard">
                            <i class="fa fa-tachometer" aria-hidden="true"></i>
                            Dashboard
                        </router-link>
                        <router-link to="/settings">
                            <i class="fa fa-cog" aria-hidden="true"></i>
                            Settings
                        </router-link>
                        <a @click="logout">
                            <i class="fa fa-sign-out" aria-hidden="true"></i>
                            Log out
                        </a>
                    </div>
                </span>

                <a :href="'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + environment.githubClientId" class="btn btn-primary" v-else>
                    <i class="fa fa-github" />
                    Sign in with Github
                </a>
            </section>
        </div>
    </header>
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
        },

        data() {
            return {
                active: false,
                hideNav: false,
            };
        },

        methods: {
            logout() {
                store.commit('logout');
                this.$toasted.success('Successfully logged out');
                this.$router.push({ path: '/logout' });
            },

            blur(e) {
                if (e.target.parentNode.parentNode.id !== 'userMenu') {
                    this.active = !this.active;
                    window.removeEventListener('click', this.blur);
                }
            },

            toggleUserMenu() {
                window.addEventListener('click', this.blur);
                this.active = !this.active;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    header {
        background-color: #c66;
        border-bottom: 5px solid #b75c5c;
        margin-bottom: 15px;

        .container {
            color: #fff;
            height: 70px;
            padding: $gp;
            display: flex;
            align-items: center;
            align-content: space-between;

        }

        a {
            color: #fff;
        }

        .logo {
            flex: 1;

            a:first-child {
                margin-right: 15px;
            }
        }

        .user-menu {
            position: relative;

            .avatar {
                --avatar-border-bg: #b75c5c;
            }

            .user-dropdown {
                background-color: #b75c5c;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                padding: 15px;
                width: 120px;
                right: 5px;
                top: 65px;
                z-index: 100;
                position: absolute;
                a {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    &:last-child {
                        margin: 0;
                    }
                }
            }
        }
    }
</style>
