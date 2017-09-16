<template lang="html">
    <div class="container" v-if="session.token && !user.verified">
        <div class="row">
            <div class="col-xs-12">
                <div class="well well-sm">
                    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
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
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";

    .well {
        // margin-top: $gp;
        display: flex;
        align-items: center;
        .fa {
            font-size: 55px;
            margin: 0 15px;
            color: #999;
        }
    }
</style>
