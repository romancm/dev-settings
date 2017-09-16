<template lang="html">
    <div class="container" v-if="session.token && !user.verified && !hideVerifyBanner">
        <div class="row">
            <div class="col-xs-12">
                <div class="well well-sm">
                    <i class="fa fa-check-circle-o fa-4x" aria-hidden="true"></i>
                    <div>
                        <h4>Please verify your email address</h4>
                        <p class="text-muted">
                            Your account email address <span class="text-success">{{user.email}}</span> has not been verified.
                        </p>
                        <p>You must verify your email address in order to be listed</p>
                        <!-- <button class="btn btn-primary" disabled>Resend Email</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../../store';

    export default {
        computed: {
            session() { return store.getters.session; },
            user() { return store.getters.user; },
            gistData() { return store.getters.gistData; },
            hideVerifyBanner() { return this.$route.meta.hideVerifyBanner; },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";

    .well {
        display: flex;
        align-items: center;
        .fa {
            margin: 0 15px;
        }
    }
</style>
