<template>
    <div class="col-xs-12">
        <h3>Sync Atom</h3>

        <div class="row">
            <div class="col-xs-12">
                <p>{{filteredGists.length}} compatible settings gist found, {{gists.length}} gists found total.</p>
                <div class="col-xs-6 col-md-3 panel" v-for="{id, owner, created_at, updated_at} in filteredGists" @click="selectGist(id)">
                    <button class="btn btn-success" v-if="session.user.gistId == id">
                        <i class="fa fa-check-circle fa-3x " aria-hidden="true" />
                        Compatible
                    </button>
                    <i class="fa fa-cog fa-5x" aria-hidden="true" />
                    Settings / {{owner.login}}
                    <br>
                    <img :src="owner.avatar_url" alt="" width="20">
                    Last Updated {{ moment(updated_at).fromNow() }}
                </div>
                <div class="col-xs-6 col-md-3 text-center thumbnail gist" @click="selectGist(null)" :class="{ 'text-danger': session.user.gistId === null }" >
                    Remove
                </div>
            </div>
        </div>

        <div class="panel panel-default">
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
        </div>
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
                    this.$toasted.success('Boom!');
                })
                .catch(() => {
                    this.$toasted.error(msg.errors.settings.gist);
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
                    this.$toasted.error(msg.errors.user);
                    this.$toasted.error(':(');
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
                    this.$toasted.success('Boom!');
                })
                .catch(() => {
                    this.$toasted.error(':(');
                })
                .then(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
