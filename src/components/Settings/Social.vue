<template>
    <div class="row">
        <div class="col-xs-12">
            <div class="col-md-4">
                <h3>Social Networks</h3>
                <pre>{{user.settings.social}}</pre>
                <form @submit.prevent="saveSocialNetwork" id="facebook" accept-charset="UTF-8">
                    <label class="control-label">Facebook</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="user.settings.social.facebook">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Save</button>
                        </span>
                    </div>
                </form>
                <form @submit.prevent="saveSocialNetwork" id="twitter" accept-charset="UTF-8">
                    <label class="control-label">Twitter</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="user.settings.social.twitter">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Save</button>
                        </span>
                    </div>
                </form>
                <form @submit.prevent="saveSocialNetwork" id="linkedin" accept-charset="UTF-8">
                    <label class="control-label">LinkedIn</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="user.settings.social.linkedin">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Save</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        saveSocialNetwork(e) {
            const payload = {
                userId: this.user._id,
                token: this.session.token,
                socialNetwork: e.target.id,
                socialNetworkUser: this.user.settings.social[e.target.id],
            };

            this.$http.put('https://atom-settings-api.herokuapp.com/account/settings/social', payload)
            .then(() => {
                store.commit('reloadUserData');
                this.$toasted.success('Boom!');
            }).catch(() => {
                this.$toasted.error('Error!');
            });
        },
    },
};
</script>
