<template>
    <div class="settings-social">
        <h3>Social Networks</h3>
        <el-form ref="form" @submit.native.prevent="save">
            <el-row :gutter="15">
                <el-col :span="12" :xs="24" :sm="12" :md="8">
                    <el-form-item label="Twitter">
                        <el-input v-model="session.user.socialNetworks.twitter"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" :xs="24" :sm="12" :md="8">
                    <el-form-item label="Facebook">
                        <el-input v-model="session.user.socialNetworks.linkedin"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" plain :loading="loading" @click="save">Save</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';

export default {
    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
    },

    data() {
        return {
            loading: false,
        };
    },

    methods: {
        save() {
            this.loading = true;
            const payload = {
                userName: this.session.user.user,
                token: this.session.token,
                socialNetworks: this.session.user.socialNetworks,
            };

            this.$http.put(`${this.environment.baseUrl}/profile/social`, payload)
            .then(({ data }) => {
                this.loading = false;
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
            });
        },
    },
};
</script>
