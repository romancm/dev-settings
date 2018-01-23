<template lang="html">
    <div class="jobs-page">
        <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link">
            <span>Job Search by</span>
            <span id="zr_logo_container">
                <img id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" />
            </span>
        </a>

        <masonry
            :cols="{default: 4, 1200: 4, 992: 3, 768: 2, 480: 1}"
            :gutter="{default: '10px' }"
        >
            <div
                v-for="n in 20"
                :key="n"
                class="placeholder"
                v-if="loading"
            >
                <el-card>
                    <content-placeholders>
                        <content-placeholders-text :lines="Math.ceil(Math.random() * 7 + 3)" />
                        <el-button type="info" disabled class="button-placeholder">&nbsp;</el-button>
                    </content-placeholders>
                </el-card>
            </div>

            <div v-for="job in jobs" :key="job.name" v-else>
                <el-card>
                    <h3>{{job.name}}</h3>
                    <p class="small">{{job.hiring_company.name}} | {{job.posted_time_friendly}} | {{job.location}}</p>
                    <p class="snippet" v-html="job.snippet" />

                    <a :href="job.url" class="el-button el-button--success is-plain">
                        Apply
                    </a>
                </el-card>
            </div>
        </masonry>
    </div>
</template>

<script>
import moment from 'moment';
import { store } from '@/store';

export default {
    data() {
        return {
            jobs: {},
            loading: false,
        };
    },

    computed: {
        today() { return moment().format('MM/DD/YYYY'); },
        preferences() { return store.getters.preferences; },
    },

    mounted() {
        this.loading = true;

        this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=Software+Web+Developer+frontend&location=&radius_miles=100&days_ago=1&jobs_per_page=100&api_key=ddu42ffqjikzzs2zcsuerw8az9rgxhte')
            .then(({ data }) => {
                this.loading = false;
                this.jobs = data.jobs;
                this.updatePreferences();
            });
    },

    methods: {
        updatePreferences() {
            if (this.preferences && this.preferences.jobsTimestamp !== this.today) {
                store.commit('setPreference', { jobsTimestamp: this.today });
            }
        },
    },
};
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";
    #jobs_widget_link {
        font-size: 0.83em;
        font-weight: bold;
        color: $color-primary-text;
        display: flex;

        #zr_logo {
            height: 22px;
            width: auto;
        }
    }

    .button-placeholder {
        width: 80px;
    }

    .jobs-page {
        padding: $gp $gp * 2;
        .el-card {
            margin-bottom: $gp;

            a {
                text-decoration: none;
            }
        }
    }
</style>
