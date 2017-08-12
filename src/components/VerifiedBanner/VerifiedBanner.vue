<template lang="html">
    <div class="well well-sm" v-if="session && !session.verified">
        <h4>Please verify your email address</h4>
        <p class="text-muted">
            Your account email address <span class="text-success">{{session.email}}</span> has not been verified.
        </p>
        <button class="btn btn-primary" disabled>Resend Email</button>
    </div>
</template>

<script>
export default {
    computed: {
        session() {
            return JSON.parse(localStorage.getItem('user'));
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";

    .well {
        margin-top: $gp;
    }
</style>
