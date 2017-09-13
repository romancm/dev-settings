<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <h2 class="text-center">Forgot your password</h2>
                <hr>
                <form @submit.prevent="resetPassword">
                    <p>Fill in your email address below and we'll send you instructions to reset it.</p>

                    <div class="form-group">
                        <label for="user_email">Email</label>
                        <input autofocus class="input-lg form-control" type="email" v-model="recoveryEmail">
                    </div>

                    <button name="button" type="submit" class="btn btn-lg btn-success" :disabled="!recoveryEmail || loading" >
                        <span v-if="!loading">Reset Password</span>
                        <i class="fa fa-spinner fa-spin-fast" aria-hidden="true" v-else/>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            recoveryEmail: '',
            loading: false,
        };
    },

    methods: {
        resetPassword() {
            this.loading = true;

            this.$http.post('http://localhost:3333/account/resetPassword', {
                email: this.recoveryEmail,
            })
            .then(({ data }) => {
                this.$toasted.success(data.message);
            })
            .catch((error) => {
                this.$toasted.error(error.response.data.message);
            })
            .then(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
</style>

