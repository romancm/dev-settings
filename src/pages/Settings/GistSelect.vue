<template lang="html">
    <div>
        <el-row :gutter="20">
            <el-col :xs="24" v-for="gist in gists" :key="gist.id">
                <div class="gist">
                    <i class="fa fa-cog fa-3x" aria-hidden="true" />
                    <div class="info">
                        <h5>{{gist.description}}</h5>
                        <p><strong>ID:</strong> {{gist.id}}</p>
                        <p><strong>Created</strong> {{ moment(gist.created_at).format('MMM/DD/Y') }}</p>
                        <p><strong>Last Updated</strong> {{ moment(gist.updated_at).format('MMM/DD/Y') }}</p>
                    </div>

                    <el-button type="success" plain size="small" v-if="gist.id === session.user.gistId">
                        <i class="fa fa-check" aria-hidden="true" />
                        Linked
                    </el-button>

                    <el-button type="success" plain size="small" @click="selectGist(gist.id)" v-else-if="filteredGists.includes(gist)">
                        <i class="fa fa-link" aria-hidden="true" />
                        Link
                    </el-button>

                    <el-button type="warning" plain size="small" v-else>
                        <i class="fa fa-bad" aria-hidden="true" />
                        Not compatible
                    </el-button>
                </div>
            </el-col>

            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="24" v-if="session.user.gistId">
                <el-popover ref="unlink" placement="right" width="300" v-model="showUnlinkPopover" trigger="manual">
                    <div class="popover-content">
                        <h5>Are you sure?</h5>
                        <p class="small">Unlinking your gist will automatically <br /> remove you from browse results.</p>
                        <div class="popover-actions">
                            <el-button size="mini" type="info" @click="closeLogoutPopover" plain>No</el-button>
                            <el-button type="primary" size="mini" @click="selectGist(null)">Yes</el-button>
                        </div>
                    </div>
                </el-popover>

                <el-button v-popover:unlink type="danger" plain size="small">
                    <i class="fa fa-remove" aria-hidden="true" />
                    Unlink Settings
                </el-button>
            </el-col>
        </el-row>
        <br>
    <br>
    </div>
</template>

<script>
    import { store } from '@/store';
    import moment from 'moment';
    import msg from '@/msg';

    export default {
        data() {
            return {
                showUnlinkPopover: false,
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
@import "~styles/_variables";

.gist {
    background: $color-white;
    padding: $gp;
    border: 1px solid $color-base-border;
    display: flex;
    align-items: center;
    color: $color-secondary-text;
    margin-bottom: $gp;

    @media($xs) {
        flex-direction: column;
        align-items: flex-start;
    }

    i {
        margin-right: $gp;
    }

    .info {
        display: flex;
        // align-items: center;
        flex-direction: column;
    }

    .el-button {
        margin-left:  auto;
    }

    h5 {
        color: $color-primary;
    }

    h5, p {
        margin: 0;
    }
}
</style>
