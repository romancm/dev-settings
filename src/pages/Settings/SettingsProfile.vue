<template>
    <div class="settings-profile">
        <!-- <div role="alert" class="el-message el-message--success is-center" style="z-index: 2013;">
            <i class="el-message__icon el-icon-success"></i>
            <p class="el-message__content">Congrats, this is a success message.</p>
        </div> -->
        <h3>Profile</h3>
        <el-form ref="form">
            <el-row>
                <el-col :xs="{ span: 24, offset: 0}" :sm="{ span: 11 }">
                    <el-form-item label="First name">
                        <el-input v-model="session.user.profile.firstName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="{ span: 24, offset: 0}" :sm="{ span: 11, offset: 2 }">
                    <el-form-item label="Last name">
                        <el-input v-model="session.user.profile.lastName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="Location">
                <el-input v-model="session.user.profile.location"></el-input>
            </el-form-item>

            <el-form-item label="Bio">
                <el-input type="textarea" v-model="session.user.profile.bio"></el-input>
            </el-form-item>

            <el-form-item label="Field of expertise">
                <br>
                <el-checkbox-group v-model="session.user.profile.jobTitle">
                    <el-checkbox :label="value" border size="mini" name="type" v-for="{value, label} in jobTitles" :key="value">
                        {{label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="Languages">
                <br>
                <el-checkbox-group v-model="session.user.profile.languages">
                    <el-checkbox :label="value" border size="mini" name="type" v-for="{value, label} in languages" :key="value">
                        <i :class="'devicon-'+value+'-plain colored'"></i>
                        {{label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" plain :loading="loading" @click="updateProfile">Save</el-button>
            </el-form-item>
        </el-form>

        <!-- <el-row>
            <h3>
                Available for hire
                <el-popover
                    ref="jobHint"
                    title="Why are you asking?"
                    width="300"
                    trigger="hover"
                >
                    We have partnered with <img src='https://www.ziprecruiter.com/img/logos/logo-sm-black-304px.png' /> to show you job opportunities that you may be interested in based on your skillset
                </el-popover>
                <el-button v-popover:jobHint type="text"><i class="fa fa-question"></i></el-button>
            </h3>
            <el-switch v-model="value1" active-text="Yes" inactive-text="No" />
        </el-row> -->
    </div>
</template>

<script>
import msg from '@/msg';
import { JOB_TITLES, LANGUAGES_FRAMEWORKS } from '@/shared';
import Avatar from '@/components/Avatar/Avatar';
import { store } from '@/store';

export default {
    components: {
        Avatar,
    },

    data() {
        return {
            loading: false,
            value1: false,
        };
    },

    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
        jobTitles() { return JOB_TITLES; },
        languages() { return LANGUAGES_FRAMEWORKS; },
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
                .then(({ data }) => {
                    store.commit('reloadUserData');

                    this.$message({
                        showClose: false,
                        center: true,
                        message: data.message,
                        type: 'success',
                    });
                }).catch(() => {
                    this.$message({
                        center: true,
                        type: 'error',
                        message: msg.errors.settings.profile,
                    });
                }).then(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "~styles/_variables";

.el-row {
    margin-bottom: 0;
}

.el-popover {
    img {
        display: inline-block;
        // position: absolute;
        height: 20px;
        margin-top: -5px;
    }
}

.el-checkbox-group {
    display: flex;
    // align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}
.el-checkbox {
    margin: $gp / 2 !important;
}
</style>
