<template lang="html">
    <div class="profile row">
        <div class="col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        Profile
                    </h3>
                </div>
                <div class="panel-body">
                    <avatar size="md" />
                    <h3>{{gistData.owner.login}}</h3>
                    <p>Last updated {{moment(gistData.lastUpdated).fromNow()}}</p>
                    <a :href="gistData.owner.html_url" class="btn btn-default" target="_blank">
                        Github Profile <i class="fa fa-external-link" aria-hidden="true"></i>
                    </a>
                </div>
            </div>

        </div>

        <div class="col-xs-12 text-center">
            <div class="row">
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-archive fa-5x" aria-hidden="true"></i>
                        <br>
                        Packages
                    </div>
                </div>
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-terminal fa-5x" aria-hidden="true"></i>
                        <br>
                        Init Script
                    </div>
                </div>
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-keyboard-o fa-5x" aria-hidden="true"></i>
                        <br>
                        Keymaps
                    </div>
                </div>
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-cog fa-5x" aria-hidden="true"></i>
                        <br>
                        settings
                    </div>
                </div>
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-file-code-o fa-5x" aria-hidden="true"></i>
                        <br>
                        snippets
                    </div>
                </div>
                <div class="col-xs-6 col-sm-4 col-lg-2">
                    <div class="panel panel-default">
                        <i class="fa fa-css3  fa-5x" aria-hidden="true"></i>
                        <br>
                        Styles
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-4 packages">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title text-primary">
                        <i class="fa fa-archive" aria-hidden="true"></i>
                        Packages
                    </h3>
                </div>
                <div class="panel-body">
                    <a v-for="{name, version} in packages" @click="getPackage(name)"
                        :class="['package-btn btn btn-sm btn-default', { 'btn-primary' : isActive(name)}]"
                    >
                        {{name}}
                        <span class="label label-info">{{version}}</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-xs-8" v-if="activePackage">
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default package-preview">
                        <div class="panel-heading">
                            <h3 class="panel-title">{{activePackage.name}}</h3>

                            <p>Downloads {{ activePackage.downloads }}</p>
                        </div>
                        <div class="panel-body">
                            <vue-markdown :source="activePackage.readme" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import VueMarkdown from 'vue-markdown';
import Avatar from '../Avatar/Avatar';

import { store } from '../../store';

export default {
    components: {
        VueMarkdown,
        Avatar,
    },

    data() {
        return {
            activePackage: null,
        };
    },

    props: {
        id: String,
    },

    computed: {
        user() { return store.getters.user; },
        gistData() { return store.getters.gistData; },
        packages() {
            return JSON.parse(store.getters.gistData.files['packages.json'].content);
        },
    },

    mounted() {
        if (!this.gistData.id || this.gistData.id !== this.user.gistId) {
            this.getGist();
        }
    },

    methods: {
        isActive(packageName) {
            return this.activePackage && this.activePackage.name === packageName;
        },

        moment() {
            return moment();
        },

        getPackage(packageName) {
            this.$http.get(`https://www.atom.io/api/packages/${packageName}`).then(({ data }) => {
                this.activePackage = data;
                this.nextTick(() => {
                    this.$forceUpdate();
                });
            });
        },

        getGist() {
            if (this.user.gistId) {
                const url = `https://api.github.com/gists/${this.user.gistId}`;
                this.$http.get(url).then(({ data }) => {
                    store.commit('updateGistData', data);
                    this.$toasted.success('got data from api');
                })
                .catch(() => {
                    this.$toasted.error('error');
                })
                .then(() => {
                    this.loading = false;
                });
            }
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .packages {
        .package-btn {
            margin-bottom: 5px;
            width: 100%;
            text-align: left;
        }
    }

    .package-preview {
        background: #fff;
        overflow: auto;
    }
</style>
