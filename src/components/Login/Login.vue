<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <h2 class="text-center">Login</h2>
                <hr>
                <form @submit.prevent="submit">
                    <div class="form-group">
                        <label>Email</label>
                        <input autofocus class="input-lg form-control" type="email" v-model="loginData.email">
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input class="input-lg form-control" type="password" v-model="loginData.password">
                    </div>

                    <button type="submit" class="btn btn-lg btn-info" :disabled="!loginData.password || !loginData.email || loading">
                        <span v-if="loading">
                            <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                            logging in
                        </span>
                        <span v-else>Login</span>
                    </button>

                    <hr>

                    <a href="./#/reset-password">Forgot your password?</a>
                    |
                    <a href="./#/register">No account? Register now!</a>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { store } from '../../store';

export default {
    data() {
        return {
            loading: false,
            loginData: {
                email: '',
                password: '',
            },
        };
    },

    methods: {
        submit() {
            this.loading = true;
            this.$http.post('https://atom-settings-api.herokuapp.com/account/login', this.loginData)
            .then(({ data }) => {
                store.commit('updateSession', data.token);
                store.commit('updateUser', data.user);
                this.$router.push({ path: 'dashboard' });
            })
            .catch(() => {
                this.$toasted.error('Error while logging in');
            })
            .then(() => {
                this.loading = false;
            });
        },
    },
};
</script>
