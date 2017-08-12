<template>
    <div class="container">
	<div class="row">
		<div class="col-xs-12">
			<div class="row">
				<div class="col-md-6 col-sm-12">
					<div class="panel panel-default">
						<div class="panel-heading">About you</div>
						<div class="panel-body">
							<form role="form" id="new_user" accept-charset="UTF-8" method="post">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label" for="firstName">Your first name</label>
											<input class="form-control" required="required" aria-required="true" placeholder="John" type="text" id="firstName" ng-model="formData.firstName">
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label" for="lastName">Last name</label>
											<input class="form-control" placeholder="Doe" type="text" id="lastName" ng-model="formData.lastName">
										</div>
									</div>
									<div class="col-md-12">
										<div class="form-group email">
											<label class="control-label" for="email">Your email address</label>
											<input class="form-control" required="required" aria-required="true" placeholder="john.doe@gmail.com" type="email" value="" id="email" ng-model="formData.email">
										</div>
									</div>
									<div class="col-md-12">
										<div class="form-group">
											<label class="control-label" for="password">Create a password</label>
											<input class="form-control password" required="required" aria-required="true" placeholder="Simple but hard to guess" type="password" id="password" ng-model="formData.password">
										</div>
									</div>
								</div>
								<button type="submit" class="btn btn-md btn-success pull-right" ng-disabled="loading">
									<span ng-show="loading">
										<i class="fa fa-refresh fa-spin-fast fa-fw" aria-hidden="true"></i>
										Saving Changes
									</span>
									<span ng-hide="loading">Save Changes</span>
								</button>

							</form>
						</div>
					</div>

				</div>
			</div>
			<form class="settings-form" method="post"><input name="utf8" type="hidden" value="✓">
				<div class="row">
				<div class="col-md-6">
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label>
									First name
								</label>
								<input class="form-control" type="text" value="Roman " name="user[first_name]" id="user_first_name">
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group">
								<label>
									Last name
								</label>
								<input class="form-control" type="text" value="Cervantes" name="user[last_name]" id="user_last_name">
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<div class="form-group">
								<label class="control-label">
									Location
								</label>
								<div class="controls">
									<input type="text" name="user[location]" id="user_location" class="form-control">
								</div>
								<span class="help-block">
									E.g. 'Springfield' or 'Salem Office'
								</span>
							</div>
						</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>
										Mobile phone number
									</label>
									<input class="form-control" type="text" value="" name="user[mobile_phone_number]" id="user_mobile_phone_number">
									<span class="help-block">
										For numbers outside of the US &amp; Canada, please prepend the country code
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group well">
							<div class="row">
								<div class="col-md-8">
									<label>
										Headshot image
									</label>
									<input class="form-control" type="file" name="user[avatar]" id="user_avatar">
									<span class="help-block">
										Pick a file from your computer
									</span>
								</div>
								<div class="col-md-4">
									<img alt="RC" class="img-circle" src="https://res-1.cloudinary.com/status-hero/image/gravatar/c_fill,d_initials-rc.png,h_200,w_200/748157a1118620ce6135d4269aad0a08.jpg">
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr>
				<p class="text-muted pull-right">
					<em>
						Account
						administrators:
						Cade Fassett, Kevin Kirkland, Kirk Lee, Shawn Lonas, Eric Martineau, Josh McCoy, Voltaire Ojastro, David Pinkus, Amanda Taylor and Steve Valero
					</em>
				</p>
				<p>
					<button name="button" type="submit" data-disable-with="Saving..." class="btn btn-primary">Save Changes</button>
				</p>
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
            msg: 'Welcome to Your Vue.js PWA',
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>
