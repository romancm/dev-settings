<template lang="html">
    <profile :gist-data="gistData" :user-data="userData"/>
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
        document.title = `${this.id} Settings | Atom Settings`;

        this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
        .then(({ data }) => {
            this.userData = data;
            this.getGist(data.gistId);
        })
        .catch(() => {
            this.$notify.error({
                title: 'Error',
                message: msg.errors.user,
            });
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
            })
            .catch(() => {
                this.$notify.error({
                    title: 'Error',
                    message: 'Error',
                });
            })
            .then(() => {
                this.loading = false;
            });
        },
    },
};
</script>
