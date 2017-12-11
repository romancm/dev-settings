<template lang="html">
    <el-container>
        <el-main>
            <h2>Admin</h2>
            <el-table :data="users" stripe border>
                <el-table-column prop="user" label="User" width="180" />
                <el-table-column prop="dateJoined" label="Date Joined" width="180" />
                <el-table-column prop="avatar" label="avatar" width="180" />
            </el-table>
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
        if (this.session.user.admin) {
            this.load();
        } else {
            this.$router.push({ path: '/' });
        }
    },

    methods: {
        moment() {
            return moment();
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
    .table {
        background: #fff;
    }
</style>
