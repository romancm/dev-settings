<template lang="html">
    <el-container>
        <el-header>
            <h2>Browse Settings</h2>
        </el-header>
        <el-container>
            <el-aside width="250px">
                <h3>Filters</h3>
                <!-- Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab blanditiis veniam illum amet atque! Est doloribus vero beatae praesentium nostrum, explicabo, laboriosam nobis debitis pariatur. Possimus labore quod, minus! -->
                <h5>Job Title</h5>
                <!-- <content-placeholders>
                    <content-placeholders-heading img />
                </content-placeholders> -->
                <el-select v-model="value5" multiple placeholder="Job title">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value5" multiple placeholder="Language">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </el-aside>
            <el-main>
                <el-switch
                    v-model="value3"
                    active-text="Pay by month"
                    inactive-text="Pay by year">
                </el-switch>

                <el-dropdown split-button type="primary" @command="handleCommand">
                    Sort by
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">Action 1</el-dropdown-item>
                        <el-dropdown-item command="b">Action 2</el-dropdown-item>
                        <el-dropdown-item command="c">Action 3</el-dropdown-item>
                        <el-dropdown-item command="e" divided>Clear</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <p v-if="!users.length">No users</p>
                <el-row :gutter="15">
                    <el-col :span="4" :xs="8" :sm="6" :md="4" :lg="3" v-for="user in users" :key="user.user">
                        <el-card :body-style="cardStyle">
                            <router-link :to="{ name: 'user', params: { id: user.user } }">
                                <avatar :user-data="user" public />
                            </router-link>
                            <div class="card-content">
                                <h3>{{user.user}}</h3>
                                <div class="languages">
                                    <i :class="'devicon-'+language+'-plain colored'" v-for="language in user.profile.languages"></i>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                </el-row>

                {{session.user.profile}}

                <div>
                    <el-card class="box-card" v-for="job in jobs.jobs" :key="job.name">
                        <a :href="job.url">
                            {{job.name}}
                        </a>
                        <p>{{job.hiring_company.name}} | {{job.posted_time_friendly}} | {{job.location}}</p>

                        <p v-html="job.snippet" />
                    </el-card>
                </div>
                <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link"><span>Job Search by</span> <span id="zr_logo_container"><img id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" /></span></a>
            </el-main>
        </el-container>
        <el-footer>
            <div class="block">
                <span class="demonstration">When you have more than 7 pages</span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-footer>
    </el-container>
</template>

<script>
    import msg from '@/msg';
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        data() {
            return {
                jobs: {},
                currentDate: new Date(),
                cardStyle: {
                    padding: '0',
                },
                options: [{
                    value: 'Option1',
                    label: 'Option1',
                }, {
                    value: 'Option2',
                    label: 'Option2',
                }, {
                    value: 'Option3',
                    label: 'Option3',
                }, {
                    value: 'Option4',
                    label: 'Option4',
                }, {
                    value: 'Option5',
                    label: 'Option5',
                }],
                value5: [],
            };
        },

        mounted() {
            this.load();
        },

        computed: {
            users() { return store.getters.users; },
            session() { return store.getters.session; },
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

                this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=javascript%20angular%20front%20end&location=&radius_miles=100&days_ago=&jobs_per_page=1&page=1&api_key=gii6sj3dk8hetjbv4qdw4bjafftedd4x')
                    .then(({ data }) => {
                        this.jobs = data;
                    })
                    .catch(() => {
                    });
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
</style>
