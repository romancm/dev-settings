<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <a href="/#/browse" class="btn btn-info">Browse</a>
                <profile :gist-data="gistData" :user-data="userData"/>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from '../User/Profile';

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
    },

    mounted() {
        this.$http.get(`http://localhost:3333/browse/${this.id}`)
        .then(({ data }) => {
            this.userData = data;
            this.getGist(data.gistId);
        })
        .catch((error) => {
            this.$toasted.error(error.response.data.message);
        })
        .then(() => {
            // this.loading = false;
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
