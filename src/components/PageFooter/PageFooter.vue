<template lang="html">
    <div class="page-footer">
        <div class="footer-top">
            <a href="https://www.ziprecruiter.com/jobs" id="jobs_widget_link"><span>Job Search by</span> <span id="zr_logo_container"><img id="zr_logo" src="https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png" alt="ZipRecruiter" width="120" /></span></a>

            <el-carousel :interval="10000" type="card">
                <el-carousel-item v-for="job in jobs" :key="job.name">
                    <a :href="job.url" target="_blank">
                        <el-card>
                            <h6>{{job.name}}</h6>
                            <p>{{job.hiring_company.name}} | {{job.posted_time_friendly}} | {{job.location}}</p>

                            <p class="snippet" v-html="job.snippet" />
                        </el-card>
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="footer-bottom">
            <p>&copy; {{ new Date().getFullYear() }} Atom Settings</p>
        </div>
    </div>
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

                this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=javascript%20angular%20front%20end&location=&radius_miles=100&days_ago=&jobs_per_page=20&api_key=ddu42ffqjikzzs2zcsuerw8az9rgxhte')
                    .then(({ data }) => {
                        this.jobs = data.jobs;
                    });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">
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

    .page-footer {
        padding: $gp * 2;
        background: rgba(255, 255, 255, 0.7);

        h5 {
            margin: 0 0 $gp / 2;
            display: flex;
            align-items: center;
            img {
                height: 22px;
            }
        }

        .footer-top {
            a {
                text-decoration: none;
            }
            .el-carousel__indicators, .el-carousel__arrow {
                display: none;
            }

            .el-carousel__container {
                height: 140px !important;

                @media($xs) {
                    height: 220px !important;
                }
            }

            .el-card__body {
                h6 {
                    margin: 0;
                }
                p {
                    font-size: 10px;
                    margin: 0;

                    &.snippet {
                        margin-top: $gp;

                        @media($xs) {
                            height: 40px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
            }
        }

        .footer-bottom {
            margin-top: $gp;
            font-size: 10px;
            text-align: center;
            color: $color-regular-text;
            p {
                margin: 0;
            }
        }
    }
</style>
