<template>
    <header>
            <span class="logo">
                <router-link to="/" v-if="!token">
                    <img src="../../assets/logo-full.png" alt="">
                </router-link>
                <router-link to="/dashboard" v-else>
                    <img src="../../assets/logo.png" alt="">
                </router-link>
            </span>
            <section>
                <span v-if="token">
                    {{user.firstName}} |
                    <router-link to="/settings/gist">Settings</router-link>
                    <router-link to="/logout">Log out</router-link>
                </span>
                <span v-else>
                    <router-link to="/login" v-if="!token">Login</router-link>
                    |
                    <router-link to="/register" v-if="!token">Register</router-link>
                </span>
            </section>
    </header>
</template>

<script>
import { store } from '../../store';

export default {
    computed: {
        token() { return store.getters.session.token; },
        user() { return store.getters.user; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";
header {
    background-color: #c66;
    border-bottom: 5px solid rgba(0,0,0,0.1);
    color: #fff;
    display: flex;
    align-items: center;
    align-content: space-between;
    height: 70px;
    padding: $gp;

    a {
        color: #fff;
    }

    .logo {
        flex: 1;
    }
}
</style>
