<template lang="html">
    <el-container>
        <el-main v-if="users">
            <h2>Admin</h2>
            <table style="width:100%">
                <tr>
                    <th>Profile Pic</th>
                    <th>Date Joined</th>
                    <th>User name</th>
                </tr>
                <tr v-for="{user, _id, avatar, dateJoined, profile} in users" :key="_id">
                    <td>
                        <img :src="avatar" :alt="user" width="75">
                    </td>
                    <td :title="dateJoined">
                        {{ formatDate(dateJoined) }}
                    </td>
                    <td>{{user}}</td>
                </tr>
            </table>
        </el-main>
    </el-container>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import { store } from '@/store';


export default {
    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
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
        formatDate(date) {
            return moment(date, 'YYYYMMDD').fromNow();
        },

        load() {
            const payLoad = {
                token: this.session.token,
                userId: this.session.user._id,
            };

            const url = `${this.environment.baseUrl}/admin/users/`;

            axios.post(url, payLoad)
                .then(({ data }) => {
                    this.loading = false;
                    this.users = data;
                })
                .catch((error) => {
                    this.$notify.error({
                        title: 'Error',
                        message: error.response.data.message,
                    });
                });
        },

        isInactive(user) {
            return !user.verified && moment().diff(user.dateJoined, 'days') > 7;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/variables";

    table {
        background: $color-white;
        text-align: left;
    }
</style>
