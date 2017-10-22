<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <profile :gist-data="gistData" :user-data="userData"/>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import msg from '@/msg';
import { store } from '@/store';
import Profile from '@/components/Profile/Profile';

export default {
    data() {
        return {
            gistData: null,
            userData: null,
        };
    },

    components: {
        Profile,
    },

    computed: {
        id() { return this.$route.params.id; },
        environment() { return store.getters.environment; },
    },

    mounted() {
        this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
        .then(({ data }) => {
            this.userData = data;
            this.getGist(data.gistId);
        })
        .catch(() => {
            this.$toasted.error(msg.errors.user);
        })
        .then(() => {
            this.loading = false;
        });
    },

    methods: {
        getGist(id) {
            const url = `https://api.github.com/gists/${id}`;
            this.$http.get(url).then(({ data }) => {
                this.gistData = data;
                // TODO: cache this data?
            })
            .catch(() => {
                this.$toasted.error('error');
            })
            .then(() => {
                this.loading = false;
            });
        },
    },
};
</script>

<style lang="css">
</style>
