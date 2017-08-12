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
                        <input autofocus="autofocus" class="input-lg form-control" type="email">
                    </div>
                    <button name="button" type="submit" data-disable-with="Saving..." class="btn btn-success">Reset Password</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
        };
    },

    methods: {
        resetPassword() {
            this.$toasted.success('Boom!');
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>

