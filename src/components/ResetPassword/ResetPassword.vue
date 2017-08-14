<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <h3 class="page-header">Forgot your password?</h3>
                <form role="form" accept-charset="UTF-8" @submit.prevent="resetPassword">
                    <input name="utf8" type="hidden" value="✓">
                    <p>Fill in your email address below and we'll send you instructions to reset it.</p>
                    <div class="form-group">
                        <label for="user_email">Email</label>
                        <input autofocus="autofocus" class="input-lg form-control" type="email" v-model="recoveryEmail">
                    </div>
                    <button name="button" type="submit" class="btn btn-success" :disabled="!recoveryEmail">
                        <span v-if="loading">
                            <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                            Working...
                        </span>
                        <span v-if="!loading">Reset Password</span>
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

            this.$http.post('https://atom-settings-api.herokuapp.com/account/resetPassword', {
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
<style lang="scss" rel="stylesheet/scss">
</style>

