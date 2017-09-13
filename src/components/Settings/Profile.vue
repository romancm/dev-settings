<template>
    <div>
        <div class="col-xs-12">
            <div class="row">
                <h3>About You</h3>
                <pre>{{user.title}}</pre>
                <form class="settings-form" method="post"><input name="utf8" type="hidden" value="✓">
                    <div class="form-group">
                        <pre>{{jobTitles}}</pre>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Web Development" v-model="jobTitles">
                            Web Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Mobile Development" v-model="jobTitles">
                            Mobile Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Data Science" v-model="jobTitles">
                            Data Science
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Application Development" v-model="jobTitles">
                            Application Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Back-end Developement" v-model="jobTitles">
                            Back-end Developement
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Software Tools Development" v-model="jobTitles">
                            Software Tools Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="API Development" v-model="jobTitles">
                            API Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Embedded Systems Development" v-model="jobTitles">
                            Embedded Systems Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Security Software Development" v-model="jobTitles">
                            Security Software Development
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Cloud Computing" v-model="jobTitles">
                            Cloud Computing
                        </label>
                        <label class="checkbox-inline">
                            <input type="checkbox" value="Distributed Computing" v-model="jobTitles">
                            Distributed Computing
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            First name
                        </label>
                        <input class="form-control" type="text" value="Roman " name="user[first_name]" id="user_first_name">
                    </div>

                    <div class="form-group">
                        <label>
                            Last name
                        </label>
                        <input class="form-control" type="text" value="Cervantes" name="user[last_name]" id="user_last_name">
                    </div>

                    <div class="form-group">
                        <label class="control-label">
                            Location
                        </label>
                        <div class="controls">
                            <input type="text" name="user[location]" id="user_location" class="form-control">
                        </div>
                        <span class="help-block">
                            E.g. 'Springfield' or 'Salem Office'
                        </span>
                    </div>

                    <div class="form-group">
                        <label>
                            Mobile phone number
                        </label>
                        <input class="form-control" type="text" value="" name="user[mobile_phone_number]" id="user_mobile_phone_number">
                        <span class="help-block">
                            For numbers outside of the US &amp; Canada, please prepend the country code
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <hr>

        <!-- <div class="col-md-4">
            <div class="row">
                <h3>Social Networks</h3>
                <form @submit.prevent="saveSocialNetwork" id="facebook" accept-charset="UTF-8">
                    <label class="control-label">Facebook</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="localSocial.facebook">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit" :disabled="!localSocial.facebook">Save</button>
                        </span>
                    </div>
                </form>

                <form @submit.prevent="saveSocialNetwork" id="twitter" accept-charset="UTF-8">
                    <label class="control-label">Twitter</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="localSocial.twitter">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Save</button>
                        </span>
                    </div>
                </form>

                <form @submit.prevent="saveSocialNetwork" id="linkedin" accept-charset="UTF-8">
                    <label class="control-label">LinkedIn</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="localSocial.linkedin">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="submit">Save</button>
                        </span>
                    </div>
                </form>
            </div>
        </div> -->
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            jobTitles: [],
            localSocial: {
                facebook: null,
                twitter: null,
                linkedin: null,
            },
            msg: 'Welcome to Your Vue.js PWA',
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    mounted() {
        if (this.user.socialNetworks) {
            this.localSocial = this.user.socialNetworks;
        }
        if (this.user.title) {
            this.jobTitles = this.user.title;
        }
    },

    methods: {
        saveSocialNetwork(e) {
            const payload = {
                userId: this.user._id,
                token: this.session.token,
                socialNetwork: e.target.id,
                socialNetworkUser: this.localSocial[e.target.id],
            };

            this.$http.put('http://localhost:3333/account/social', payload)
            .then(() => {
                store.commit('reloadUserData');
                this.$toasted.success('Updated');
            }).catch((error) => {
                this.$toasted.error(error.reponse.data.message);
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
</style>
