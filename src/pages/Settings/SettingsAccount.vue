<template>
    <div class="settings-account">
        <h3>Account</h3>
        <el-button type="info" plain @click="logout">
            <i class="fa fa-sign-out" aria-hidden="true"></i>
            Logout
        </el-button>

        <el-alert type="info" :closable="false">
            <h4>Delete your account</h4>
            <p>Once you delete your account, your data will be permanently removed.</p>
            <el-button type="info" plain @click="toggleDeleteModal">Delete Account</el-button>
        </el-alert>

        <el-dialog title="Confirm Account Deletion" :visible.sync="showConfirmDialog">
            <div class="content">
                <p>We are sorry to hear you'd like to remove your account.</p>
                <p class="text-danger">By pressing the button below, all data associated with your account will be <strong>permanently</strong> deleted.</p>
            </div>
            <span slot="footer">
                <el-button @click="showConfirmDialog = false">Cancel</el-button>
                <el-button type="danger" @click="deleteAccount">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';

export default {
    data() {
        return {
            showConfirmDialog: false,
        };
    },

    computed: {
        session() { return store.getters.session; },
        environment() { return store.getters.environment; },
    },

    methods: {
        toggleDeleteModal() {
            this.showConfirmDialog = !this.showConfirmDialog;
        },

        deleteAccount() {
            const payload = {
                userName: this.session.user.user,
                token: this.session.token,
            };

            this.$http.post(`${this.environment.baseUrl}/account/delete`, payload)
            .then(() => {
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
            store.commit('logout');
            this.$notify({
                title: 'Success',
                message: 'This is a success message',
                type: 'success',
            });
            this.$router.push({ path: '/logout' });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" >
    @import "~styles/_variables";

    .el-dialog {
        @media($xs) {
            width: 90%;
        }
    }

    .el-alert {
        margin-top: $gp * 2;
        padding: $gp * 2;
        
        h4 {
            margin-top: 0;
        }
    }
</style>
