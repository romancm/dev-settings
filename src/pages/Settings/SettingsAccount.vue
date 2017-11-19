<template>
    <div class="settings-account">
        <h3>Account</h3>
        <p>Once you delete your account, your data will be permanently removed.</p>

        <el-button type="danger" plain @click="toggleDeleteModal">Delete Account</el-button>

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
                this.$toasted.error(msg.errors.settings.account);
            });
        },
    },
};
</script>