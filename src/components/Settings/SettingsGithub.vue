<template>
    <div class="col-xs-12">
        <h3>Sync Atom</h3>

        <div class="row">
            <div class="col-xs-12">
                <div
                    class="col-xs-6 col-md-3 text-center thumbnail gist"
                    v-for="{description, id} in gists"
                    @click="selectGist(id)"
                    :class="{ 'text-success': session.user.gistId == id }"
                >
                <i class="fa fa-check-circle fa-3x selected " aria-hidden="true" />
                {{session.user.gistId == id}}
                    <i class="fa fa-file-code-o fa-5x" aria-hidden="true" />
                    {{description}}
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
import { store } from '../../store';

export default {
    data() {
        return {
            loading: false,
            loadingGists: false,
            gists: null,
        };
    },

    computed: {
        session() { return store.getters.session; },
    },

    mounted() {
        this.loadGist();
    },

    methods: {
        selectGist(id) {
            const payload = {
                userName: this.session.user.user,
                gistId: id,
                token: this.session.token,
            };

            this.$http.put('http://localhost:3333/profile/gist', payload)
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

        loadGist() {
            this.loadingGists = true;

            this.$http.get('https://api.github.com/users/romancm/gists')
                .then(({ data }) => {
                    console.log(data);
                    this.gists = data;
                })
                .catch(() => {
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
                userId: this.user._id,
                gistId: this.user.gistId,
                token: this.session.token,
            };

            console.log(payload);

            this.$http.put('http://localhost:3333/profile/gist', payload)
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
.gist {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    cursor: pointer;
    transition: all 500ms ease;
    opacity: 0.7;

    &:hover {
        opacity: 1;
        transition: all 500ms ease;
    }

    .fa {
        margin-bottom: 20px;
    }

    .selected {
        opacity: 0;
        top: 20px;
        right: 20px;
        position: absolute;
        transition: all 500ms ease;
    }

    &.text-success {
        .selected {
            opacity: 1;
        }
    }

}
</style>
