<template lang="html">
    <div class="container text-center">
        <i class="fa fa-cog fa-spin fa-5x" aria-hidden="true"></i>
        <p class="lead">Authorizing</p>
    </div>
</template>

<script>
    import i18n from '@/i18n';
    import { store } from '@/store';

    export default {
        computed: {
            environment() { return store.getters.environment; },
        },

        mounted() {
            this.validateGithubCode();
        },

        methods: {
            validateGithubCode() {
                if (this.$route.query.code) {
                    this.$http.post(`${this.environment.baseUrl}/auth/`, {
                        code: this.$route.query.code,
                    })
                    .then((res) => {
                        this.login(res);
                    })
                    .catch(() => {
                        this.$toasted.error(i18n.errors.handshake.validation);
                        this.$router.push({ path: '/' });
                    });
                }
            },

            login(user) {
                this.$http.post(`${this.environment.baseUrl}/auth/register`, user)
                    .then((res) => {
                        const session = {
                            user: res.data,
                            token: res.data.token,
                            github: user.data,
                        };

                        store.commit('updateSession', session);
                        this.$router.push({ path: '/dashboard' });
                    })
                    .catch((error) => {
                        this.$toasted.error(error.response.data.message);
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
</style>
