<template>
    <div class="settings-profile">
        <h3>Profile</h3>
        <!-- <pre>{{session.user}}</pre> -->
        <el-form ref="form">
            <!-- <avatar size="xl" /> -->
            <el-col :span="11">
                <el-form-item label="First name">
                    <el-input v-model="session.user.profile.firstName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="11" :offset="2">
                <el-form-item label="Last name">
                    <el-input v-model="session.user.profile.lastName"></el-input>
                </el-form-item>
            </el-col>

            <el-form-item label="Location">
                <el-input v-model="session.user.profile.location"></el-input>
            </el-form-item>

            <el-form-item label="Bio">
                <el-input type="textarea" v-model="session.user.profile.bio"></el-input>
            </el-form-item>

            <el-form-item label="Field of expertise / Job title">
                <br>
                <el-checkbox-group v-model="session.user.profile.jobTitle">
                    <el-checkbox :label="checkbox.value" border name="type" v-for="checkbox in titleCheckboxes" />
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="Languages">
                <br>
                <el-checkbox-group v-model="session.user.profile.languages">
                    <el-checkbox-button :label="checkbox" border name="type" v-for="checkbox in languages">
                        <i :class="'devicon-'+checkbox+'-plain colored'"></i>
                        {{checkbox}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" plain @click="updateProfile">Save</el-button>
            </el-form-item>
        </el-form>
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
        onSubmit() {
            console.log('submit!');
        },

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
</style>
