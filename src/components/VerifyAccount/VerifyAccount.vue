<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 text-center verify-account">
                <span v-if="loading && !error">
                    <i class="fa fa-refresh fa-spin-fast fa-4x" aria-hidden="true"></i>
                    <p class="lead">Verifying Account</p>
                </span>

                <span class="text-success" v-if="!loading && !error">
                    <i class="fa fa-check fa-4x " aria-hidden="true"></i>
                    <p class="lead">{{success}}</p>
                </span>

                <span v-if="!loading && error">
                    <i class="fa fa-times fa-4x text-danger" aria-hidden="true"></i>
                    <p class="lead">{{ error }}</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { store } from '../../store';

    export default {
        data() {
            return {
                loading: true,
                error: false,
                success: null,
            };
        },

        computed: {
            params() {
                return this.$route.params;
            },
        },

        mounted() {
            this.verifyAccount();
        },

        methods: {
            verifyAccount() {
                axios.post('http://localhost:3333/auth/verify/', this.params)
                    .then(({ data }) => {
                        this.success = data.message;
                        store.commit('reloadUserData');
                    })
                    .catch((error) => {
                        this.error = error.response.data.message;
                    })
                    .then(() => {
                        this.loading = false;
                    });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../styles/_variables";

    .verify-account {
        > span {
            .fa {
                margin: 30px 0;
            }
        }
    }
</style>
