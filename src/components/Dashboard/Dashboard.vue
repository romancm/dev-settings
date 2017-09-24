<template lang="html">
    <div class="container">
        <div class="row">
            <!-- <div class="col-xs-12">
                <div class="alert alert-success">
                    <i class="fa fa-hand-peace-o fa-4x" aria-hidden="true"></i>
                    <div>
                        <h4>Welcome!</h4>
                        <p><strong>AtomSettings</strong> is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom</p>
                    </div>
                </div>
            </div> -->
            <!-- <div class="col-xs-12" v-if="!user.gistId">
                <div class="alert alert-info">
                    <i class="fa fa-github fa-4x" aria-hidden="true"></i>
                    <div>
                        <h4>Link Settings Gist</h4>
                        <p><strong>AtomSettings</strong> is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom</p>
                        <a href="/#/settings" class="btn btn-primary">Learn more</a>
                    </div>
                </div>
            </div> -->

            <div class="col-xs-12">
                <profile />
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';
import Profile from '../User/Profile';
import Avatar from '../Avatar/Avatar';

export default {
    components: {
        Profile,
        Avatar,
    },

    computed: {
        user() { return store.getters.user; },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .alert {
        display: flex;
        align-items: center;

        .fa {
            margin: 0 15px;
        }
    }
</style>
