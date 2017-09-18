<template lang="html">
    <div class="container">
        <h2>Browse</h2>
        <div class="row">
            <div class="col-xs-12">
                Filters
            </div>
            <div class="col-xs-12">

                <p v-if="!users.length">No users</p>
                <div v-else class="users">
                    <div v-for="user in users" class="user">
                        <a :href="url(_id)">
                            <img :src="'https://api.adorable.io/avatars/' + user._id" alt="" class="profile-pic">
                        </a>
                        Roman Cervantes
                        <img src="https://lipis.github.io/flag-icon-css/flags/4x3/us.svg" alt="" width="50">
                        <i class="devicon-javascript-plain colored"></i>
                        <i class="devicon-ruby-plain colored"></i>
                        <i class="devicon-python-plain colored"></i>
                        <i class="devicon-mysql-plain colored"></i>
                        <i class="devicon-cplusplus-plain colored"></i>
                        <i class="devicon-csharp-plain colored"></i>
                        <i class="devicon-csharp-plain colored"></i>
                        <i class="devicon-angularjs-plain colored"></i>
                        <i class="devicon-php-plain colored"></i>

                    </div>
                </div>
            </div>
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

<style lang="scss" rel="stylesheet/scss" scoped>
    .users {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .user {
            width: 25%;
            .profile-pic {
                width: 100%;
            }
        }
    }
</style>
