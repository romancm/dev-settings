<template>
    <div>
        <div class="col-md-4">
                <h3>Social Networks</h3>

                <pre>{{user.socialNetworks}}</pre>

                <form @submit.prevent="save">
                    <div class="form-group">
                        <div class="form-group">
                            <label class="control-label">Github</label>
                            <input type="text" class="form-control input-lg" v-model="user.socialNetworks.github">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Twitter</label>
                            <input type="text" class="form-control input-lg" v-model="user.socialNetworks.twitter">
                        </div>

                        <div class="form-group">
                            <label class="control-label">LinkedIn</label>
                            <input type="text" class="form-control input-lg" v-model="user.socialNetworks.linkedin">
                        </div>
                    </div>

                    <button name="button" type="submit" class="btn btn-success">Save</button>
                </form>

        </div>
    </div>
</template>

<script>
import { store } from '../../store';

export default {
    data() {
        return {
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
        };
    },

    computed: {
        session() { return store.getters.session; },
        user() { return store.getters.user; },
    },

    methods: {
        save() {
            const payload = {
                userId: this.user._id,
                token: this.session.token,
                socialNetworks: this.user.socialNetworks,
            };

            this.$http.put('http://localhost:3333/profile/social', payload)
            .then(() => {
                store.commit('reloadUserData');
                this.$toasted.success('Updated');
            }).catch((error) => {
                this.$toasted.error(error.reponse.data.message);
            });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .job-title {
        height: auto;
        float: left;
    }

    h3, form {
        float: left;
        width: 100%;
    }
</style>
