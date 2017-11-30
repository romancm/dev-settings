<template lang="html">
    <el-footer height="auto">
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
        <el-row>
            <el-col :span="24"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
    </el-footer>
</template>

<script>
    import { store } from '@/store';
    import msg from '@/msg';

    export default {
        data() {
            return {
                jobs: {},
            };
        },

        mounted() {
            this.load();
        },

        computed: {
            environment() { return store.getters.environment; },
        },

        methods: {
            load() {
                // TODO: enhance this logic so endpoint isn't hit every time
                this.$http.get(`${this.environment.baseUrl}/browse/`)
                    .then(({ data }) => {
                        store.commit('updateBrowseData', data);
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: msg.errors.browse,
                        });
                    });

                this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=javascript%20angular%20front%20end&location=&radius_miles=100&days_ago=&jobs_per_page=10&page=1&api_key=gii6sj3dk8hetjbv4qdw4bjafftedd4x')
                    .then(({ data }) => {
                        this.jobs = data;
                    });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
