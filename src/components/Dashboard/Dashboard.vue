<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="alert alert-success" v-if="!user.verified">
                    <p class="lead">Welcome to Molecule!</p>
                    <p>Molecule is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom</p>
                </div>
            </div>

            <div class="col-xs-12" v-if="user.settings && user.settings.gistId && gistData">
                <h1>Dashboard</h1>
                <div class="col-xs-12 col-md-6">
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

                <div class="row">
                    <div class="col-xs-12">
                        <h2>{{activePackage.name}}</h2>

                        <p>Downloads {{ activePackage.downloads | number : fractionSize}}</p>
                        <pre>{{activePackage}}</pre>

                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-12" id="packages">
                        <h2>Packages</h2>
                        <ul>
                            <li v-for="package in parse(gistData.files['packages.json'].content)" @click="getPackage(package.name)">
                                {{package.name}}
                                {{package.version}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div v-else>
                <h2>No gist set</h2>
            </div>

            <!-- <style-guide/> -->
        </div>

    </div>
</template>

<script>
import moment from 'moment';
import { store } from '../../store';
import StyleGuide from '../StyleGuide/StyleGuide';

// console.log(store.getters.getTodos);

export default {
    components: {
        StyleGuide,
    },

    data() {
        return {
            activePackage: {},
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
        gistData() { return store.getters.gistData; },
    },

    mounted() {
        this.init();
    },

    methods: {
        moment() {
            return moment();
        },

        init() {
            if (!this.gistData.id || this.gistData.id !== this.user.settings.gistId) {
                this.getGist();
            }
        },

        parse(o) {
            return JSON.parse(o);
        },

        getPackage(packageName) {
            this.$http.get(`https://www.atom.io/api/packages/${packageName}`).then(({ data }) => {
                this.activePackage = data;
            });
        },

        getGist() {
            if (this.user.settings && this.user.settings.gistId) {
                const url = `https://api.github.com/gists/${this.user.settings.gistId}`;
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

<style lang="css">
</style>
