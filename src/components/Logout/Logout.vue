<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
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
                <!-- <button class="btn btn-lg btn-info" @click="login">
                    Login again
                </button> -->
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    computed: {
        session() { return store.getters.session; },
        sessionExpired() { return this.$route.query.sessionExpired; },
    },

    mounted() {
        console.log(this.$route.query.sessionExpired);
        if (this.session.token) {
            store.commit('logout');
        }
    },
    methods: {
        login() {
            this.$router.push({ path: 'login' });
        },
    },
};
</script>
