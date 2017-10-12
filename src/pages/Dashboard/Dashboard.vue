<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="alert alert-success">
                    <i class="fa fa-hand-peace-o fa-4x" aria-hidden="true"></i>
                    <div>
                        <h4>Welcome!</h4>
                        <p><strong>AtomSettings</strong> is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom</p>
                    </div>
                </div>
            </div>

            <div class="col-xs-12" v-if="session.user.gistId">
                <profile :user-data="session.user" :gist-data="session.github" />
            </div>

            <div class="col-xs-12" v-else>
                <div class="alert alert-info">
                    <i class="fa fa-github fa-4x" aria-hidden="true"></i>
                    <div>
                        <h4>Link Settings Gist</h4>
                        <p><strong>AtomSettings</strong> is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom</p>
                        <a href="/settings" class="btn btn-primary">Learn more</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '@/store';
    import Profile from '@/components/Profile/Profile';
    import Avatar from '@/components/Avatar/Avatar';

    export default {
        components: {
            Profile,
            Avatar,
        },

        computed: {
            session() { return store.getters.session; },
        },

        // mounted() {
        //     if (Object.keys(this.gistData).length === 0 && this.gistData.constructor === Object) {
        //         this.getGist();
        //     } else {
        //         // check how old data is, if too old, get latest data
        //         console.log('data cached!');
        //     }
        // },

        methods: {
            // getGist() {
            //     if (this.user.gistId) {
            //         const url = `https://api.github.com/gists/${this.user.gistId}`;
            //         this.$http.get(url).then(({ data }) => {
            //             store.commit('updateGistData', data);
            //             this.$toasted.success('got data from api');
            //         })
            //         .catch(() => {
            //             this.$toasted.error('error');
            //         })
            //         .then(() => {
            //             this.loading = false;
            //         });
            //     }
            // },
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
