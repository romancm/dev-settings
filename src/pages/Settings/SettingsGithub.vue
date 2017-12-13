<template>
    <div class="col-xs-12">
        <h3>Github</h3>
        <h4>Select gist to share your settings </h4>
        <!-- <p>{{filteredGists.length}} compatible settings gist found, {{gists.length}} gists found total.</p> -->

        <el-row gutter="20">
            <el-col :xs="24" :sm="6" :md="12" :lg="8" :xl="6" v-for="gist in gists" :key="gist.id">
                <el-card class="box-card" >
                    <h4>{{gist.description}}</h4>

                    <el-tag type="primary">
                        <strong>Gist Id:</strong> {{gist.id}}
                    </el-tag>

                    <el-tag type="info">
                        Created {{ moment(gist.created_at).format('MMM/DD/Y') }}
                    </el-tag>

                    <el-tag type="info">
                        Last Updated {{ moment(gist.updated_at).format('MMM/DD/Y') }}
                    </el-tag>

                    <hr>

                    <el-button type="success" plain size="small" v-if="gist.id === session.user.gistId">
                        <i class="fa fa-check" aria-hidden="true" />
                        Selected
                    </el-button>

                    <el-button type="success" plain size="small" @click="selectGist(gist.id)" v-else>
                        Select gist
                    </el-button>
                </el-card>
            </el-col>

            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="6" v-if="session.user.gistId">
                <el-button type="danger" plain size="small" @click="selectGist(null)">
                    <i class="fa fa-remove" aria-hidden="true" />
                    Deselect gist
                </el-button>

                <br>
                <br>

                <el-alert
                type="info"
                title="test"
                description="Deselecting your gist will automatically remove you from browse results.">
            </el-alert>
            </el-col>
        </el-row>

        <el-alert
            title="Public Gists Warning"
            show-icon
            type="warning"
            closable="false"
            description="If you use certain packages, storing auth-tokens, a malicious party could abuse them.">
        </el-alert>

        <!-- <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Not seeing your Gist?</h3>
            </div>
            <div class="panel-body">
                <p>We only display public gists, if your sync-settings gist is set to secret you may have to create a new public gist.</p>

                <a href="https://help.github.com/articles/about-gists/" class="btn btn-info" target="_blank">
                    Learn more about Gists
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </a>
            </div>
        </div> -->
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';
import moment from 'moment';

export default {
    data() {
        return {
            loading: false,
            loadingGists: false,
            gists: [],
        };
    },

    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
        /* eslint-disable arrow-body-style */
        filteredGists() {
            return this.gists.filter((gist) => {
                return gist.files && gist.files['init.coffee'];
            });
        },
    },

    mounted() {
        this.loadGist();
    },

    methods: {
        moment() {
            return moment();
        },

        selectGist(id) {
            const payload = {
                userName: this.session.user.user,
                gistId: id,
                token: this.session.token,
            };

            this.$http.put(`${this.environment.baseUrl}/profile/gist`, payload)
                .then(() => {
                    store.commit('reloadUserData');
                    this.$notify({
                        title: 'Success',
                        message: 'This is a success message',
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: msg.errors.settings.gist,
                    });
                })
                .then(() => {
                    this.loading = false;
                });
        },

        loadGist() {
            this.loadingGists = true;


            this.$http.get(`https://api.github.com/users/${this.session.user.user}/gists`)
                .then(({ data }) => {
                    this.gists = data;
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: msg.errors.user,
                    });
                })
                .then(() => {
                    this.loadingGists = false;
                });
        },

        updateGistId() {
            // TODO: update logic to save gist
            this.loading = true;

            const payload = {
                userName: this.user.userName,
                gistId: this.user.gistId,
                token: this.session.token,
            };

            this.$http.put(`${this.environment.baseUrl}/profile/gist/`, payload)
                .then(() => {
                    store.commit('reloadUserData');
                    this.$notify({
                        title: 'Success',
                        message: 'This is a success message',
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: 'Error',
                    });
                })
                .then(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/variables";

    .box-card {
        margin-bottom: $gp;
    }
// .gist {
//     display: flex;
//     align-items: center;
//     flex-direction: column;
//     padding: 20px;
//     cursor: pointer;
//     transition: all 500ms ease;
//     opacity: 0.7;
//
//     &:hover {
//         opacity: 1;
//         transition: all 500ms ease;
//     }
//
//     .fa {
//         margin-bottom: 20px;
//     }
//
//     // .selected {
//     //     opacity: 0;
//     //     top: 20px;
//     //     right: 20px;
//     //     position: absolute;
//     //     transition: all 500ms ease;
//     // }
//
//     // &.text-success {
//     //     .selected {
//     //         opacity: 1;
//     //     }
//     // }
//
// }
</style>
