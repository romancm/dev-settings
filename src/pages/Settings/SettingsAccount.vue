<template>
    <div class="settings-account">
        <div class="col-xs-12">
            <h3>Delete Account</h3>
            <p>Once you delete your account, there is no going back.</p>

            <button type="button" class="btn btn-default btn-danger" @click="showDeleteModal">
                Delete Account
            </button>

            <modal name="deleteAccountModal" :adaptive="true">
                <h4 class="modal-title text-center" id="deleteModalLabel">
                    Confirm Account Deletion
                </h4>
                <p class="text-center">We are sorry to hear you'd like to remove your account.</p>
                <p class="text-danger">By pressing the button below, all data associated with your account will be <strong>permanently</strong> deleted.</p>
                <button type="button" class="btn btn-default" @click="hideDeleteModal">Cancel</button>
                <button type="button" class="btn btn-default btn-danger btn-group-xs" @click="deleteAccount">Delete Account</button>
            </modal>
        </div>

    </div>
</template>

<script>
import { store } from '@/store';

export default {
    data() {
        return {
            showConfirm: false,
        };
    },

    computed: {
        session() { return store.getters.session; },
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
                userName: this.session.user.user,
                token: this.session.token,
            };

            console.log(payload);

            this.$http.post('http://localhost:3333/account/delete', payload)
            .then(() => {
                store.commit('logout');
                this.$router.push({ path: '/' });
                this.$toasted.success('Account Deleted');
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
    @import "~styles/_variables";

    .v--modal {
        padding: $gp * 2;
        // background: #f0c;
    }
</style>
