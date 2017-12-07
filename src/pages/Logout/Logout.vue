<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :xs="{ span: 20, offset: 1}" :sm="{ span: 12, offset: 6 }">
                    <h2>
                        <span v-if="sessionExpired">
                            Your session has expired
                        </span>
                        <span v-else>
                            You've been successfully logged out
                        </span>
                    </h2>
                    <span v-if="!sessionExpired">
                        <p>Thank you for spending some quality time with us today!</p>
                        <p>Didn't mean to log out?</p>
                    </span>
                    <el-button type="primary" @click="login">Login</el-button>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { store } from '@/store';

    export default {
        computed: {
            session() { return store.getters.session; },
            sessionExpired() { return this.$route.query.sessionExpired; },
            environment() { return store.getters.environment; },
            githuburl() {
                return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`;
            },
        },

        mounted() {
            if (this.session.token) {
                store.commit('logout');
            }
        },

        methods: {
            login() {
                window.location.href = this.githuburl;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";

    .success {
        color: $color-success;
    }
</style>
