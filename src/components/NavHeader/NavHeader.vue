<template>
    <header>
        <span>
            <router-link to="/" v-if="!token">Atom Settings</router-link>
            <router-link to="/dashboard" v-else>AS</router-link>
        </span>
        <div class="menu">
            <router-link to="/login" v-if="!token">Login</router-link>
            |
            <router-link to="/register" v-if="!token">Register</router-link>
            <span v-else>
                {{user.firstName}} |
                <router-link to="/settings/gist">Settings</router-link>
                <router-link to="/logout">Log out</router-link>
            </span>
        </div>
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
    height: 60px;
    padding: $gp;

    a {
        color: #fff;
    }

    span {
        flex: 1;
    }

    .menu {
    }
}
</style>
