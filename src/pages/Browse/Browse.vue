<template lang="html">
    <div class="container">
        <h2>Browse</h2>
        <div class="row">
            <div class="col-xs-12">
                Filters
            </div>
            <div class="col-xs-12">

                <p v-if="!users.length">No users</p>
                <div v-else class="users row">
                    <div v-for="user in users" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                        <router-link :to="{ name: 'user', params: { id: user.user } }">
                            <avatar :user-data="user" public />
                        </router-link>

                        {{user.profile.firstName}}
                        {{user.profile.lastName}}

                        <!-- <img src="https://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="" width="50"> -->
                        <div class="languages">
                            <i :class="'devicon-'+language+'-plain colored'" v-for="language in user.profile.languages"></i>
                        </div>
                        <!-- <i class="devicon-javascript-plain colored"></i>
                        <i class="devicon-ruby-plain colored"></i>
                        <i class="devicon-python-plain colored"></i>
                        <i class="devicon-mysql-plain colored"></i>
                        <i class="devicon-cplusplus-plain colored"></i>
                        <i class="devicon-csharp-plain colored"></i>
                        <i class="devicon-csharp-plain colored"></i>
                        <i class="devicon-angularjs-plain colored"></i> -->

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import msg from '@/msg';
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        mounted() {
            this.load();
        },

        computed: {
            users() { return store.getters.users; },
            environment() { return store.getters.environment; },
        },

        components: {
            Avatar,
        },

        methods: {
            load() {
                // TODO: enhance this logic so endpoint isn't hit every time
                this.$http.get(`${this.environment.baseUrl}/browse/`)
                    .then(({ data }) => {
                        store.commit('updateBrowseData', data);
                    })
                    .catch(() => {
                        this.$toasted.error(msg.errors.browse);
                        console.log('boom');
                    });
            },

            url(id) {
                return `/browse/${id}/packages`;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .profile-pic {
        width: 100%;
    }
</style>
