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
            tableData: [{
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }, {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }, {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }, {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            }],
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

            axios.post(`${this.environment.baseUrl}/admin/users/`, payLoad)
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
