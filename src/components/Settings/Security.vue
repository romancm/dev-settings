<template>
    <div class="container">
        <div class="row">
            <pre>{{password}} {{newPassword}} {{confirmNewPassword}}</pre>
            <div class="col-xs-12">
                <div class="col-md-4">
    				<h3>Update Password</h3>
                    <form @submit.prevent="updatePassword" accept-charset="UTF-8">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="control-label" for="password">Current Password</label>
    							<input class="form-control" autofocus="autofocus" required="required" aria-required="true" type="password" id="password" v-model="password">
                            </div>
    						<div class="control-group">
    							<div class="form-group">
    								<label class="control-label" for="newPassword">New Password</label>
    								<input class="form-control" autofocus="autofocus" required="required" aria-required="true" type="password" id="newPassword" v-model="newPassword">
    							</div>
    							<div class="form-group">
    								<label class="control-label" for="confirmPassword">Confirm your new password</label>
    								<input class="form-control" required="required" aria-required="true" type="password" id="confirmPassword" v-model="confirmNewPassword">
    							</div>

    						</div>
                        </div>
                        <button name="button" type="submit" data-disable-with="Saving..." class="btn btn-success">Save</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js PWA',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        updatePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                this.$toasted.show('Passwords don\'t match');
                return;
            }

            const payload = {
                email: this.user.email,
                token: this.session.token,
                password: this.password,
                newPassword: this.newPassword,
            };


            this.$http.post('https://atom-settings-api.herokuapp.com/account/updatePassword', payload)
            .then(() => {
                this.$toasted.success('Boom!');
            })
            .catch(() => {
                this.$toasted.error(':(');
            })
            .then(() => {
                // this.loading = false;
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>
