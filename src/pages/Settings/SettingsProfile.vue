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
                            <input class="form-control input-lg" type="text" v-model="session.user.profile.firstName">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label>Last name</label>
                            <input class="form-control input-lg" type="text" v-model="session.user.profile.lastName">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Location</label>
                    <input class="form-control input-lg" type="text" v-model="session.user.profile.location">
                </div>

                <div class="form-group">
                    <label>Bio</label>
                    <textarea class="form-control input-lg" type="text" v-model="session.user.profile.bio" />
                </div>

                <label>Job Title</label>

                <div class="form-group">
                    <div class="col-xs-6" v-for="checkbox in titleCheckboxes">
                        <label>
                            <input type="checkbox" :value="checkbox.id" v-model="session.user.profile.jobTitle">
                            {{checkbox.value}}
                        </label>
                    </div>
                </div>

                <label>Languages</label>

                <div class="form-group">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6" v-for="checkbox in languages">
                        <label class="language">
                            <input type="checkbox" :value="checkbox" v-model="session.user.profile.languages">
                            <i :class="'devicon-'+checkbox+'-plain colored'"></i>
                            {{checkbox}}
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
import msg from '@/msg';
import Avatar from '@/components/Avatar/Avatar';
import { store } from '@/store';

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
                'android',
                'angularjs',
                'apache',
                'backbonejs',
                'c',
                'coffeescript',
                'cplusplus',
                'csharp',
                'css3',
                'dot-net',
                'drupal',
                'go',
                'html5',
                'java',
                'javascript',
                'laravel',
                'meteor',
                'mocha',
                'mongodb',
                'mysql',
                'nodejs',
                'oracle',
                'php',
                'postgresql',
                'python',
                'rails',
                'react',
                'redis',
                'ruby',
                'sass',
                'swift',
                'typescript',
                'vuejs',
            ],
        };
    },

    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
    },

    methods: {
        updateProfile() {
            const payload = {
                profile: this.session.user.profile,
                userName: this.session.user.user,
                token: this.session.token,
            };

            this.loading = true;

            this.$http.put(`${this.environment.baseUrl}/profile/`, payload)
                .then(() => {
                    store.commit('reloadUserData');
                    this.$toasted.success('Updated');
                }).catch(() => {
                    this.$toasted.error(msg.errors.settings.profile);
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
