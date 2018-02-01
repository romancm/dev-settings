<template>
    <div class="settings-social">
        <el-form ref="form" @submit.native.prevent="save">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12">
                    <el-alert type="info" :closable="false" title="Twitter">
                        <el-form-item>
                            <el-input placeholder="username" v-model="session.user.socialNetworks.twitter">
                                <template slot="prepend">https://twitter.com/</template>
                            </el-input>
                        </el-form-item>

                        <el-button type="primary" plain :loading="loading" @click="save">
                            <icon name="floppy-o" v-if="!loading" />
                            Save
                        </el-button>
                    </el-alert>
                </el-col>

                <el-col :xs="24" :sm="12">
                    <el-alert type="info" :closable="false" title="LinkedIn">
                        <el-form-item>
                            <el-input placeholder="username" v-model="session.user.socialNetworks.linkedin">
                                <template slot="prepend">https://linkedin.com/in/</template>
                            </el-input>
                        </el-form-item>

                        <el-button type="primary" plain :loading="loading" @click="save">
                            <icon name="floppy-o" v-if="!loading" />
                            Save
                        </el-button>
                    </el-alert>
                </el-col>
            </el-row>

            <!-- <el-form-item>
                <el-button type="primary" plain :loading="loading" @click="save">Save</el-button>
            </el-form-item> -->
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
