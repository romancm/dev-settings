<template lang="html">
    <div class="settings-profile">
        <!-- <pre>{{session.user}}</pre> -->
        <h3>Hello, {{session.github.login}}!</h3>
        <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p>

        <el-steps :active="active" finish-status="success" v-if="!session.user.gistId">
            <el-step title="Install package">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </el-step>
            <el-step title="Step 2"></el-step>
            <el-step title="Select Gist"></el-step>
        </el-steps>

        <!-- <div v-if="!showInst && session.user.gistId">
            You're set!

            Want to change your gist?
            <el-button @click="showInst = true">Click here</el-button>
        </div> -->

        <div class="instructions" v-if="showInst">
            <div v-if="active === 0">
                <h1>Install SyncSettings package</h1>
                <p><pre>apm install sync-settings</pre> or using the Install packages pane from Atom Settings.</p>
                <!-- <div class="panel panel-default">
                    <div class="panel-body">
                        <vue-markdown :source="instructions" v-if="instructions" />
                    </div>
                </div> -->
            </div>
            <div v-if="active === 1">
                Create Gist and configure sync Settings
            </div>
            <div v-if="active === 2">
                <gist-select />
            </div>

        </div>
        <el-button style="margin-top: 12px;" @click="next">Next step</el-button>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';
import msg from '@/msg';
import moment from 'moment';
import GistSelect from './GistSelect';

export default {
    components: {
        VueMarkdown,
        GistSelect,
    },

    data() {
        return {
            instructions: null,
            active: 0,
            loading: false,
            loadingGists: false,
            gists: [],
            showInst: false,
        };
    },

    mounted() {
        this.loadGist();
        this.getSyncReadme();

        this.active = this.session.user.gistId ? 2 : 0;
        this.showInst = Boolean(!this.session.user.gistId);
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
        next() {
            this.active += 1;

            if (this.active > 3) {
                this.active = 0;
            }
        },

        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },
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

    .el-steps {
        margin: 0 auto;

        @media($lg) {
            width: 600px;

        }
    }
    .el-step__icon {
        font-size: 12px;
    }
</style>
