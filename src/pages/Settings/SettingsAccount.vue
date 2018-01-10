<template>
    <div class="settings-account">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
                <el-alert type="primary" :closable="false" title="Sign out">
                    <p class="small">Your session will automatically expire in 1 month, but you can always manually sign out if you want to.</p>

                    <el-popover ref="logout" placement="right" width="180" v-model="showLogoutPopover" trigger="manual">
                        <div class="popover-content">
                            <h5>Are you sure?</h5>
                            <div class="popover-actions">
                                <el-button size="mini" type="info" @click="closeLogoutPopover" plain>No</el-button>
                                <el-button type="primary" size="mini" @click="logout">Yes</el-button>
                            </div>
                        </div>
                    </el-popover>

                    <el-button v-popover:logout type="" plain size="small">
                        <i class="fa fa-sign-out" aria-hidden="true" />
                        Sign out
                    </el-button>
                </el-alert>
            </el-col>

            <el-col :xs="24" :sm="12">
                <el-alert type="error" :closable="false" title="Delete your account">
                    <p class="small">Your user data will be <strong>permanently</strong> removed from our database.</p>

                    <el-popover ref="logout" placement="right" width="180" v-model="showAccountDeletePopover" trigger="manual">
                        <div class="popover-content">
                            <h5>Are you sure?</h5>
                            <div class="popover-actions">
                                <el-button size="mini" type="info" @click="closeAccountDeletePopover" plain>No</el-button>
                                <el-button type="danger" size="mini" @click="deleteAccount" plain>Yes</el-button>
                            </div>
                        </div>
                    </el-popover>

                    <el-button v-popover:logout type="danger" plain size="small">
                        <i class="fa fa-trash" aria-hidden="true" />
                        Delete Account
                    </el-button>
                </el-alert>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';

export default {
    data() {
        return {
            showLogoutPopover: false,
            showAccountDeletePopover: false,
        };
    },

    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
    },

    methods: {
        closeAccountDeletePopover() {
            this.showAccountDeletePopover = false;
        },

        deleteAccount() {
            const payload = {
                userName: this.session.user.user,
                token: this.session.token,
            };

            this.$http.post(`${this.environment.baseUrl}/account/delete`, payload)
                .then(() => {
                    this.closeAccountDeletePopover();
                    store.commit('logout');
                    this.$router.push({ name: 'exit-page' });
                })
                .catch(() => {
                    this.$notify.error({
                        title: 'Error',
                        message: msg.errors.settings.account,
                    });
                });
        },

        logout() {
            this.closeLogoutPopover();
            store.commit('logout');
            this.$router.push({ path: '/logout' });
        },

        closeLogoutPopover() {
            this.showLogoutPopover = false;
        },
    },
};
</script>
