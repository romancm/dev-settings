<template>
    <div>
        <div class="col-xs-12">
            <div class="row">
                <h3>About You</h3>

                <form @submit.prevent="updateProfile()">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>First name</label>
                                    <input class="form-control input-lg" type="text" v-model="user.profile.firstName">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Last name</label>
                                    <input class="form-control input-lg" type="text" v-model="user.profile.lastName">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Bio</label>
                            <textarea class="form-control input-lg" type="text" v-model="user.profile.bio" />
                        </div>

                        <label>Job Title</label>

                        <div class="form-group">
                            <div class="col-xs-6" v-for="checkbox in titleCheckboxes">
                                <label>
                                    <input type="checkbox" :value="checkbox.id" v-model="user.profile.jobTitle">
                                    {{checkbox.value}}
                                </label>
                            </div>
                        </div>

                        <label>Languages</label>

                        <div class="form-group">
                            <div class="col-xs-6" v-for="checkbox in languages">
                                <label>
                                    <input type="checkbox" :value="checkbox.id" v-model="user.profile.languages">
                                    {{checkbox.value}}
                                </label>
                            </div>
                        </div>
                    </div>


                    <button name="button" type="submit" class="btn btn-lg btn-success">
                        <span v-if="loading">
                            <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                            Saving
                        </span>
                        <span v-if="!loading">Save</span>
                    </button>
                </form>
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            loading: false,
            localSocial: {
                facebook: null,
                twitter: null,
                linkedin: null,
            },
            titleCheckboxes: [
                { id: 'web', value: 'Web Development' },
                { id: 'mobile', value: 'Mobile Development' },
                { id: 'data-science', value: 'Data Science' },
                { id: 'appdev', value: 'Application Development' },
                { id: 'backend', value: 'Back-end Developement' },
                { id: 'api', value: 'API Development' },
                { id: 'other', value: 'Other' },
                { id: 'hobby', value: 'Hobbyist' },
            ],
            languages: [
                { id: 'java', value: 'Java' },
                { id: 'python', value: 'Python' },
                { id: 'c ', value: 'C ' },
                { id: 'ruby', value: 'Ruby' },
                { id: 'javascript', value: 'JavaScript' },
                { id: 'c#', value: 'C#' },
                { id: 'php', value: 'PHP' },
                { id: 'objective-c', value: 'Objective-C' },
                { id: 'sql', value: 'SQL' },
                { id: 'с++', value: 'С++' },
                { id: 'c#', value: 'C#' },
                { id: 'go', value: 'Go' },
                { id: 'swift', value: 'Swift' },
            ],
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        updateProfile() {
            const payload = {
                profile: this.user.profile,
                userId: this.user._id,
                token: this.session.token,
            };

            this.loading = true;

            this.$http.put('http://localhost:3333/profile/', payload)
            .then(() => {
                store.commit('reloadUserData');
                this.$toasted.success('Updated');
            }).catch((error) => {
                this.$toasted.error(error.reponse.data.message);
            }).then(() => {
                this.loading = false;
            });
        },
    },
};
</script>
