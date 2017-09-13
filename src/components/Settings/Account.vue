<template>
    <div class="settings-account">
        <div class="col-xs-12">
            <div class="row">
                <div class="col-md-4">
                    <h3>Update Password</h3>
                    <form @submit.prevent="updatePassword" accept-charset="UTF-8">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="control-label" for="password">Current Password</label>
                                <input class="form-control" autofocus="autofocus" required="required" aria-required="true" type="password" id="password" v-model="password">
                            </div>
                            <div class="control-group">
                                <div class="form-group">
                                    <label class="control-label" for="newPassword">New Password</label>
                                    <input class="form-control" autofocus="autofocus" required="required" aria-required="true" type="password" id="newPassword" v-model="newPassword">
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="confirmPassword">Confirm your new password</label>
                                    <input class="form-control" required="required" aria-required="true" type="password" id="confirmPassword" v-model="confirmNewPassword">
                                </div>

                            </div>
                        </div>
                        <button name="button" type="submit" data-disable-with="Saving..." class="btn btn-success">Save</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- <div class="col-xs-12">
            <h3>Delete Account</h3>
            <p>Once you delete your account, there is no going back.</p>

            <button type="button" class="btn btn-default btn-danger" @click="showDeleteModal">
                Delete Account
            </button>

            <modal name="deleteAccountModal" :adaptive="true">
                <h4 class="modal-title" id="deleteModalLabel">Confirm Account Deletion</h4>
                <p>We are sorry to hear you'd like to remove your account.</p>
                <p class="text-danger">By pressing the button below, all data associated with your account will be <strong>permanently</strong> deleted.</p>
                <form>
                    <div class="form-group">
                        <label for="confirmPassword" class="control-label">Enter your current password:</label>
                        <input class="form-control" type="password" v-model="confirmPassword">
                    </div>
                </form>
                <button type="button" class="btn btn-default" @click="hideDeleteModal">Cancel</button>
                <button type="button" class="btn btn-default btn-danger btn-group-xs" @click="deleteAccount" :disabled="!confirmPassword">Delete Account</button>
            </modal>
        </div> -->

    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            showConfirm: false,
            confirmPassword: '',
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        showDeleteModal() {
            this.$modal.show('deleteAccountModal');
        },
        hideDeleteModal() {
            this.$modal.hide('deleteAccountModal');
        },

        deleteAccount() {
            const payload = {
                email: this.user.email,
                token: this.session.token,
                password: this.confirmPassword,
            };

            this.$http.post('http://localhost:3333/account/delete', payload)
            .then(() => {
                this.$router.push({ path: '/logout' });
                this.$toasted.success('Boom!');
            })
            .catch(() => {
                this.$toasted.error(':(');
            })
            .then(() => {
                // this.loading = false;
            });
        },

        updatePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                this.$toasted.show('Passwords don\'t match');
                return;
            }

            const payload = {
                email: this.user.email,
                token: this.session.token,
                password: this.password,
                newPassword: this.newPassword,
            };


            this.$http.post('http://localhost:3333/account/updatePassword', payload)
            .then(() => {
                this.$toasted.success('Boom!');
            })
            .catch(() => {
                this.$toasted.error(':(');
            })
            .then(() => {
                // this.loading = false;
            });
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
@import "../../styles/_variables";
.v--modal {
    padding: $gp;
    // background: #f0c;
}
</style>
