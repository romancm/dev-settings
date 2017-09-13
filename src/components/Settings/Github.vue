<template>
    <div class="col-xs-12" v-if="user && user.settings">
        <h3>Sync Atom</h3>
        <form @submit.prevent="updateGistId()" accept-charset="UTF-8">
            <div class="form-group">
                <label class="control-label" for="gistId">
                    Paste Gist ID here
                </label>
                <input
                class="form-control input-lg gist-id"
                autocomplete="off"
                autofocus="autofocus"
                required="required"
                aria-required="true"
                id="gistId"
                v-model="user.settings.gistId"
                maxlength="32">
            </div>
            <button name="button" type="submit" class="btn btn-lg btn-success" :disabled="!user.settings.gistId">
                <span v-if="loading">
                    <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                    Saving Gist Id
                </span>
                <span v-if="!loading">Save</span>
            </button>
        </form>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            loading: false,
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        updateGistId() {
            this.loading = true;

            const updateGistIdData = {
                userId: this.user._id,
                gistId: this.user.settings.gistId,
                token: this.session.token,
            };

            this.$http.put('http://localhost:3333/account/settings/gist', updateGistIdData)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>
