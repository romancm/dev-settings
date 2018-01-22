<template lang="html">
    <div class="jobs">
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
</template>

<script>
    export default {
        data() {
            return {
                jobs: {},
            };
        },
        mounted() {
            this.$http.get('https://api.ziprecruiter.com/jobs/v1?search=&location=&radius_miles=100&days_ago=&jobs_per_page=20&api_key=ddu42ffqjikzzs2zcsuerw8az9rgxhte')
                .then(({ data }) => {
                    this.jobs = data.jobs;
                });
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

    h5 {
        margin: 0 0 $gp / 2;
        display: flex;
        align-items: center;
        img {
            height: 22px;
        }
    }

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
</style>
