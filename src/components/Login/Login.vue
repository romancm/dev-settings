<template>
    <div class="row">
        <!-- <div class="col-xs-12" ng-show="account.token"> -->
        <!-- <div class="col-xs-12">
            <div class="alert alert-success">You are already logged in!</div>
            <a href="#logout" class="btn btn-lg btn-info">Log out?</a>
        </div> -->
        <!-- <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3" ng-hide="account.token"> -->
        <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
            <h3 class="page-header">
                Login
            </h3>

        <pre>{{loginData}}</pre>

        <form ref="form" @submit.prevent="submit">
            <div class="form-group">
                <label for="user_email">Email</label>
                <input autofocus="autofocus" class="input-lg form-control" type="email" name="email" id="user_email" v-model="loginData.email">
            </div>
            <div class="form-group">
                <label for="user_password">Password</label>
                <input class="input-lg form-control" type="password" name="password" id="user_password" v-model="loginData.password">
            </div>
            <!-- <div class="form-group">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" value="" v-model="loginData.retain">
                        Keep me logged in
                    </label>
                </div>
            </div> -->
            <button name="button" type="submit" class="btn btn-lg btn-success" :disabled="!loginData.password || !loginData.email">
                <span v-if="loading">
                    <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                    Working
                </span>
                <span v-if="!loading">Go</span>
            </button>

            <hr>
            <ul>
                <li>
                    <a href="./#/reset-password">Forgot your password?</a>
                </li>
                <li>
                    <a href="./#/register">No account? Start a free trial!</a>
                </li>
            </ul>
        </form>
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
                // retain: false,
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
