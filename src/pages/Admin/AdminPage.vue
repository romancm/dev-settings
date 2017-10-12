<template lang="html">
    <div class="container">
        <h2>Admin</h2>
        <div class="row">
            <div class="col-xs-12">
                <table class="table table-hover table-responsive table-striped table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Languages</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr v-for="user in users" :class="{ 'danger': isInactive(user)}">
                          <td>{{user.profile.firstName}}</td>
                          <td>{{user.profile.lastName}}</td>
                          <td>{{user.email}}</td>
                          <td>
                              <span v-if="user.verified" class="text-success">
                                  Verified
                              </span>
                              <span v-else class="text-danger" :class="{'danger': isInactive(user)}">Not Verified</span>
                          </td>
                          <td>{{user.dateJoined}}</td>
                          <td><pre>{{user.profile.languages}}</pre></td>
                      </tr>
                  </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { store } from '@/store';


export default {
    computed: {
        session() { return store.getters.session; },
    },

    data() {
        return {
            users: null,
        };
    },

    mounted() {
        this.load();
    },

    methods: {
        moment() {
            return moment();
        },

        load() {
            const payLoad = {
                token: this.session.token,
                userId: this.user._id,
            };

            axios.post('http://localhost:3333/admin/users', payLoad)
                .then(({ data }) => {
                    this.users = data;
                })
                .catch((error) => {
                    this.$toasted.error(error.response.data.message);
                })
                .then(() => {
                    this.loading = false;
                });
        },

        isInactive(user) {
            return !user.verified && moment().diff(user.dateJoined, 'days') > 7;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .table {
        background: #fff;
    }
</style>
