<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
                <h3>Account</h3>
                <p>Once you delete your account, there is no going back. Please be certain.</p>

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
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
            showConfirm: false,
            confirmPassword: '',
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

            this.$http.post('https://atom-settings-api.herokuapp.com/account/delete', payload)
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
