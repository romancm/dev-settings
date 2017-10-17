<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                {{sessionExpired}}
                <h3 class="page-header">
                    <span v-if="sessionExpired">
                        Your session has expired
                    </span>
                    <span v-else>
                        You've been successfully logged out
                    </span>
                </h3>
                <p v-if="sessionExpired">
                    You've been automatically logged out.
                </p>
                <!-- <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=5a92b9da5f2017553b90" class="btn btn-primary" v-else>
                    <i class="fa fa-github" />
                    Login again
                </a> -->
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '@/store';

    export default {
        computed: {
            session() { return store.getters.session; },
            sessionExpired() { return this.$route.query.sessionExpired; },
            // environment() { return store.getters.environment; },
        },

        mounted() {
            if (this.session.token) {
                store.commit('logout');
            }
        },
    };
</script>
