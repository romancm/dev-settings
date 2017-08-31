<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h3 class="page-header">You've been successfully logged out</h3>
                <button class="btn btn-lg btn-info" @click="login">
                    Login again
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        login() {
            this.$router.push({ path: 'login' });
        },
    },
};
</script>
