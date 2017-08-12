<template>
    <div class="container">
    	<div class="row" ng-hide="user.token">
    		<div class="header col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 text-center">
    			<h2>Welcome!</h2>
    			<p>Use Molecule to share and discover your atom preferences!</p>
    		</div>
    	</div>
    	<div class="row">
    		<div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <pre>{{formData}}</pre>
    			<hr>
    			<form role="form" @submit.prevent="register" accept-charset="UTF-8">
    				<div class="row">
    					<div class="col-md-6">
    						<div class="form-group">
    							<label class="control-label" for="firstName">Your first name</label>
    							<input class="form-control input-lg" required="required" aria-required="true" placeholder="John" type="text" v-model="formData.firstName">
    						</div>
    					</div>
    					<div class="col-md-6">
    						<div class="form-group">
    							<label class="control-label" for="lastName">Last name (Optional)</label>
    							<input class="form-control input-lg" placeholder="Doe" type="text" v-model="formData.lastName">
    						</div>
    					</div>
    					<div class="col-md-12">
    						<div class="form-group email">
    							<label class="control-label" for="email">Your email address</label>
    							<input class="form-control input-lg" autofocus="autofocus" required="required" aria-required="true" placeholder="john.doe@gmail.com" type="email" value="" v-model="formData.email">
    						</div>
    					</div>
    					<div class="col-md-12">
    						<div class="form-group">
    							<label class="control-label" for="password">Create a password</label>
    							<input class="form-control password input-lg" required="required" aria-required="true" placeholder="Simple but hard to guess" type="password" v-model="formData.password">
    						</div>
    					</div>
    				</div>
    				<p class="text-center">
    					By continuing, you agree to our boilerplate
    					<a href="javascript:;" data-toggle="modal" data-target="#termsModal">Terms of Service</a> agreement.
    					<br>
    					No credit card is required for the free trial. You can cancel at anytime.
    				</p>
    				<div class="modal fade" id="termsModal" tabindex="-1" role="dialog" aria-labelledby="termsModalLabel">
    					<div class="modal-dialog" role="document">
    						<div class="modal-content">
    							<div class="modal-header">
    								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    								<h4 class="modal-title" id="termsModalLabel">Terms of Service</h4>
    							</div>
    							<div class="modal-body" ng-include="'/html/partials/_terms.html'"></div>
    							<div class="modal-footer">
    								<button type="button" class="btn btn-default" data-dismiss="modal">Dismiss</button>
    							</div>
    						</div>
    					</div>
    				</div>
    				<hr>
    				<p class="text-center">
    					<button type="submit" class="btn btn-lg btn-primary" ng-disabled="loading">
    						<span v-if="loading">
    							<i class="fa fa-cog fa-spin-fast fa-fw" aria-hidden="true"></i>
    							Creating Account
    						</span>
    						<span v-else>Create Account</span>
    					</button>
    					<br>
    					<small>Already have an account? <a href="#/login">Log in</a></small>
    				</p>
    			</form>
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
            loading: false,
            formData: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            },
        };
    },

    methods: {
        register() {
            this.loading = true;

            this.$http.post('https://atom-settings-api.herokuapp.com/account/create', this.formData)
            .then(() => {
                const loginData = {
                    email: this.formData.email,
                    password: this.formData.password,
                };
                this.$toasted.success('Account created');
                this.$http.post('https://atom-settings-api.herokuapp.com/account/login', loginData)
                .then(({ data }) => {
                    store.commit('updateSession', data.token);
                    store.commit('updateUser', data.user);
                    this.$router.push({ path: 'dashboard' });
                })
                .catch(() => {
                    this.$toasted.error('Account created, error while logging in');
                })
                .then(() => {
                    this.loading = false;
                });
            })
            .catch(() => {
                this.$toasted.error('Error');
                this.loading = false;
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>

