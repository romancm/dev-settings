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
                    <div class="col-xs-12 col-sm-2">
                        <img class="img-thumbnail img-responsive img-circle" :src="gistData.owner.avatar_url" alt="" width="100" />
                    </div>
                    <div class="col-xs-12 col-sm-10">
                        <h3>{{gistData.owner.login}}</h3>
                        <p>Last updated {{moment(gistData.lastUpdated).fromNow()}}</p>
                        <a :href="gistData.owner.html_url" class="btn btn-default" target="_blank">
                            Github Profile <i class="fa fa-external-link" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-xs-3" id="packages">
            <h2>Packages</h2>
            <ul>
                <li v-for="package in parse(gistData.files['packages.json'].content)" @click="getPackage(package.name)">
                    {{package.name}}
                    {{package.version}}
                </li>
            </ul>
        </div>

        <div class="col-xs-9" v-if="activePackage">
            <modal name="packageModal" height="700" adaptive>
                <vue-markdown :source="activePackage.readme" />
            </modal>

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

import { store } from '../../store';

export default {
    components: {
        VueMarkdown,
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
    },

    mounted() {
        if (this.id) {
            console.log('no data passed, get id');
            console.log(this.id);
        }
    },

    methods: {
        mounted() {
            this.init();
        },

        init() {
            if (!this.gistData.id || this.gistData.id !== this.user.gistId) {
                this.getGist();
            }
        },

        moment() {
            return moment();
        },

        parse(o) {
            return JSON.parse(o);
        },
        getPackage(packageName) {
            this.$http.get(`https://www.atom.io/api/packages/${packageName}`).then(({ data }) => {
                console.log(data);
                this.activePackage = data;

                // this.$modal.show('packageModal');

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
    .package-preview {
        background: #fff;
        overflow: auto;
    }
</style>
