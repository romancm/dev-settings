<template>
    <div class="col-xs-12">
        <h3>About You</h3>

        <form @submit.prevent="updateProfile()">
            <avatar size="lg" />
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
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6" v-for="checkbox in languages">
                        <label class="language">
                            <input type="checkbox" :value="checkbox.id" v-model="user.profile.languages">
                            <i :class="'devicon-'+checkbox.id+'-plain colored'"></i>
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
</template>

<script>
import Avatar from '../Avatar/Avatar';
import { store } from '../../store';

export default {
    components: {
        Avatar,
    },

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
                { id: 'android', value: 'android' },
                { id: 'angularjs', value: 'angularjs' },
                { id: 'apache', value: 'apache' },
                { id: 'backbonejs', value: 'backbonejs' },
                { id: 'c', value: 'c' },
                { id: 'coffeescript', value: 'coffeescript' },
                { id: 'cplusplus', value: 'cplusplus' },
                { id: 'csharp', value: 'csharp' },
                { id: 'css3', value: 'css3' },
                { id: 'dot-net', value: 'dot-net' },
                { id: 'drupal', value: 'drupal' },
                { id: 'go', value: 'go' },
                { id: 'html5', value: 'html5' },
                { id: 'java', value: 'java' },
                { id: 'javascript', value: 'javascript' },
                { id: 'laravel', value: 'laravel' },
                { id: 'meteor', value: 'meteor' },
                { id: 'mocha', value: 'mocha' },
                { id: 'mongodb', value: 'mongodb' },
                { id: 'mysql', value: 'mysql' },
                { id: 'nodejs', value: 'nodejs' },
                { id: 'oracle', value: 'oracle' },
                { id: 'php', value: 'php' },
                { id: 'postgresql', value: 'postgresql' },
                { id: 'python', value: 'python' },
                { id: 'rails', value: 'rails' },
                { id: 'react', value: 'react' },
                { id: 'redis', value: 'redis' },
                { id: 'ruby', value: 'ruby' },
                { id: 'sass', value: 'sass' },
                { id: 'swift', value: 'swift' },
                { id: 'typescript', value: 'typescript' },
                { id: 'vuejs', value: 'vuejs' },
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

<style lang="scss" rel="stylesheet/scss" scoped>
.language {
    font-size: 20px;
    cursor: pointer;
    i {
        font-size: 100px;
    }
}
</style>
