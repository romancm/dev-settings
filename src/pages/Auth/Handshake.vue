<template lang="html">
    <div class="handshake" :class="{ error }">
        <span v-if="error">
            <i class="fa fa-exclamation-triangle fa-5x" aria-hidden="true" />
            <h2>Uh Oh!</h2>
            <p>There was a problem while <br />authenticating your <strong>Github</strong> account.</p>
            <el-button type="primary" @click="goHome">Home</el-button>
            <el-button type="info" @click="tryAgain">Try again</el-button>
        </span>

        <span v-else>
            <i class="fa fa-cog fa-spin fa-5x" aria-hidden="true" />
            <h2>Authorizing</h2>
        </span>
    </div>
</template>

<script>
    import { store } from '@/store';

    export default {
        computed: {
            environment() { return store.getters.environment; },
            githuburl() {
                return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`;
            },
        },

        data() {
            return {
                error: false,
            };
        },

        mounted() {
            if (this.$route.query.code) {
                this.validateGithubCode();
            }
        },

        methods: {
            goHome() {
                this.$router.push({ path: '/' });
            },

            tryAgain() {
                window.location.href = this.githuburl;
            },

            validateGithubCode() {
                const payload = {
                    code: this.$route.query.code,
                };

                const url = `${this.environment.baseUrl}/auth/`;

                this.$http.post(url, payload)
                    .then((res) => {
                        this.login(res);
                    })
                    .catch(() => {
                        this.error = true;
                    });
            },

            login(user) {
                const url = `${this.environment.baseUrl}/auth/register`;

                this.$http.post(url, user)
                    .then((res) => {
                        const session = {
                            user: res.data,
                            token: res.data.token,
                            github: user.data,
                        };

                        store.commit('setSession', session);
                        this.$router.push({ path: '/settings/profile' });
                    })
                    .catch((error) => {
                        this.$notify.error({
                            title: 'Error',
                            message: error.response.data.message,
                        });
                        this.$router.push({ path: '/' });
                    })
                    .then(() => {
                        this.loading = false;
                    });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/variables";
    .handshake {
        height: 120px;
        width: 300px;
        z-index: 15;
        top: 50%;
        left: 50%;
        margin: -60px 0 0 -150px;
        text-align: center;
        color: $color-primary;
        position: absolute;
        overflow: hidden;

        &.error {
            height: 230px;
            margin: -115px 0 0 -150px;
            color: $color-danger;
        }

        h2 {
            margin: 0;
        }
    }
</style>
