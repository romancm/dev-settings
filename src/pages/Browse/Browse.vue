<template lang="html">
    <el-container>
        <el-header height="auto">
            <h2>Browse Settings</h2>
        </el-header>

        <el-container>
            <el-aside width="250px">
                <h3>Filter by</h3>

                <h5>Job Title</h5>
                <el-select
                    v-model="selectedJobTitles"
                    multiple
                    placeholder="Filter by Job title"
                    filterable
                    no-match-text="No results"
                >
                    <el-option
                        v-for="item in jobTitles"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

                <h5>Languages</h5>
                <el-select
                    v-model="selectedLanguages"
                    multiple
                    placeholder="Filter by language"
                    filterable
                    no-match-text="No results"
                >
                    <el-option
                        v-for="item in languages"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-aside>

            <el-main v-loading="loading">
                <el-row>
                    <el-pagination
                        v-if="users.totalPages > 1"
                        layout="prev, pager, next"
                        :page-size="users.pageSize"
                        :current-page.sync="currentPage"
                        :total="users.totalUserCount"
                        @currentChange="test"
                        >
                    </el-pagination>
                </el-row>

                <el-row :gutter="20">
                    <p v-if="!users.results.length">No users</p>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="user in users.results" :key="user.user">
                        <router-link :to="{ name: 'user', params: { id: user.user } }" class="user-card">
                            <img :src="user.avatar" alt="user.user" width="200" height="200">
                        </router-link>
                    </el-col>
                </el-row>

                <el-row>
                    <el-pagination
                        v-if="users.totalPages > 1"
                        layout="prev, pager, next"
                        :page-size="users.pageSize"
                        :current-page.sync="currentPage"
                        :total="users.totalUserCount"
                        @currentChange="test"
                        >
                    </el-pagination>
                </el-row>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import msg from '@/msg';
    import { JOB_TITLES, LANGUAGES_FRAMEWORKS } from '@/shared';
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        data() {
            return {
                jobs: {},
                currentPage: 1,
                selectedJobTitles: [],
                selectedLanguages: [],
                loading: true,
            };
        },

        mounted() {
            // TODO: save params in storage and preload them on mount
            this.load();
        },

        computed: {
            users() { return store.getters.users; },
            session() { return store.getters.session; },
            environment() { return store.getters.environment; },
            // page() { return this.$route.query.p; },
            jobTitles() { return JOB_TITLES; },
            languages() { return LANGUAGES_FRAMEWORKS; },
        },

        components: {
            Avatar,
        },

        watch: {
            currentPage() {
                // this.$router.push({ query: { p: this.currentPage } });
                this.load();
            },
            selectedJobTitles() {
                this.currentPage = 1;
                this.load();
            },
            selectedLanguages() {
                this.currentPage = 1;
                this.load();
            },
        },

        methods: {
            load() {
                this.loading = true;
                this.$http.get(`${this.environment.baseUrl}/browse/?page=${this.currentPage}&title=${this.selectedJobTitles}&languages=${this.selectedLanguages}`)
                    .then(({ data }) => {
                        store.commit('updateBrowseData', data);
                        this.loading = false;
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: msg.errors.browse,
                        });
                    });

                // this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=javascript%20angular%20front%20end&location=&radius_miles=100&days_ago=&jobs_per_page=1&page=1&api_key=gii6sj3dk8hetjbv4qdw4bjafftedd4x')
                //     .then(({ data }) => {
                //         this.jobs = data;
                //     })
                //     .catch(() => {
                //     });
            },

            remoteMethod(query) {
                console.log(query);
            },

            url(id) {
                return `/browse/${id}/packages`;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .el-aside {
        padding: 0 $gp * 2;
        @media($md) {}
        @media($lg) {}
    }

    .user-card {
        border-radius: $border-radius;
        overflow: hidden;
        background: $color-white;
        float: left;
        margin: $gp 0;

        img {
            float: left;
            max-height: 100%;
            max-width: 100%;
            // height: auto;
            // height: auto;
        }
    }

    .el-pagination {
        padding: $gp 0;
    }


    .el-header {
        // background: #cf0;
    }
</style>
