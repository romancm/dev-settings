<template lang="html">
    <div>
        <h4>Link gist to share your settings </h4>
        <el-row :gutter="20">
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
                        Linked
                    </el-button>

                    <el-button type="success" plain size="small" @click="selectGist(gist.id)" v-else>
                        Link gist
                    </el-button>
                </el-card>
            </el-col>

            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="24" v-if="session.user.gistId">
                <el-button type="danger" plain size="small" @click="selectGist(null)">
                    <i class="fa fa-remove" aria-hidden="true" />
                    Unlink gist
                </el-button>

                <br>



            </el-col>
        </el-row>
        <br>
        <el-alert
        type="info"
        show-icon
        title="Keep in mind"
        description="Unlinking your gist will automatically remove you from browse results.">
    </el-alert>
    <br>
        <el-alert
            title="Public Gists Warning"
            show-icon
            type="warning"
            :closable="false"
            description="If you use certain packages, storing auth-tokens, a malicious party could abuse them.">
        </el-alert>



        <!-- <p>{{filteredGists.length}} compatible settings gist found, {{gists.length}} gists found total.</p> -->


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
    import { store } from '@/store';
    import moment from 'moment';
    import msg from '@/msg';

    export default {
        data() {
            return {
                gists: [],
            };
        },

        mounted() {
            this.loadGist();
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

        methods: {
            moment() {
                return moment();
            },

            loadGist() {
                // this.loadingGists = true;

                this.$http.get(`https://api.github.com/users/${this.session.user.user}/gists`)
                    .then(({ data }) => {
                        this.gists = data;
                        // this.loadingGists = false;
                    })
                    .catch(() => {
                        console.log('err');
                        this.$notify.error({
                            title: 'Error',
                            message: msg.errors.user,
                        });
                    });
            },

            selectGist(id) {
                const payload = {
                    userName: this.session.user.user,
                    gistId: id,
                    token: this.session.token,
                };

                this.$http.put(`${this.environment.baseUrl}/profile/gist`, payload)
                .then(({ data }) => {
                    store.commit('reloadUserData');

                    this.$message({
                        showClose: false,
                        center: true,
                        message: data.message,
                        type: 'success',
                    });
                })
                .catch(() => {
                    this.$message({
                        center: true,
                        type: 'error',
                        message: msg.errors.settings.gist,
                    });
                })
                .then(() => {
                    this.loading = false;
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
</style>
