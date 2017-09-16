<template>
    <header>
        <div class="container">
            <span class="logo">
                <router-link to="/dashboard" v-if="token">
                    <img src="../../assets/logo.png" alt="">
                </router-link>

                <router-link to="/" v-else>
                    <img src="../../assets/logo-full.png" alt="">
                </router-link>

                <router-link to="/browse">
                    Browse
                </router-link>
            </span>

            <section class="user-menu">
                <span v-if="token">
                    <span @click="toggleUserMenu" id="userMenu">
                        <img v-if="gistData.owner" class="img-thumbnail img-responsive img-circle" :src="gistData.owner.avatar_url" alt="" width="50" />
                        <span v-else class="initials img-thumbnail img-responsive img-circle">
                            {{user.profile.firstName}}
                            {{user.profile.lastName}}
                        </span>
                    </span>

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
                <span v-else>
                    <router-link to="/login" v-if="!token">Login</router-link>
                    |
                    <router-link to="/register" v-if="!token">Register</router-link>
                </span>
            </section>
        </div>
    </header>
</template>

<script>
import { store } from '../../store';

export default {
    computed: {
        token() { return store.getters.session.token; },
        user() { return store.getters.user; },
        gistData() { return store.getters.gistData; },
    },

    data() {
        return {
            active: false,
        };
    },

    methods: {
        logout() {
            store.commit('logout');
            this.$toasted.success('Successfully logged out');
            this.$router.push({ path: 'logout' });
        },

        blur(e) {
            if (e.target.parentNode.id !== 'userMenu') {
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
    @import "../../styles/_variables";
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

        .img-thumbnail {
            cursor: pointer;
            background: #b75c5c;
            border-color: rgba(0,0,0,0.1);
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
