<template lang="html">
    <div class="container">
        <div class="row">
            <h2>Browse</h2>

            <p v-if="!users.length">No users</p>
            <ul v-else>
                <li v-for="{firstName, lastName, _id} in users">
                    <a :href="url(_id)">
                        {{firstName}} {{lastName}} {{_id}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    mounted() {
        this.load();
    },

    computed: {
        users() { return store.getters.users; },
    },

    methods: {
        load() {
            // TODO: enhance this logic so endpoint isn't hit every time
            axios.get('http://localhost:3333/browse/')
                .then(({ data }) => {
                    store.commit('updateBrowseData', data);
                });
        },

        url(id) {
            return `/#/browse/${id}`;
        },
    },
};
</script>

<style lang="css">
</style>
