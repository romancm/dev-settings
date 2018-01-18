<template lang="html">
    <section class="profile">
        <profile-menu />
        <profile-home v-if="routeName === 'profileCode'" />
        <router-view />
    </section>
</template>

<script>
import { store } from '@/store';
import msg from '@/msg';
import ProfileHome from '../Sections/ProfileHome';
import ProfileMenu from '../ProfileMenu';

export default {
    components: {
        ProfileHome,
        ProfileMenu,
    },

    computed: {
        codeData() { return store.getters.codeCache[this.id]; },
        id() { return this.$route.params.id; },
        user() { return store.getters.userCache[this.id]; },
        environment() { return store.getters.environment; },
        routeName() { return this.$route.name; },
    },

    mounted() {
        document.title = `${this.id} Settings`;
        store.commit('setEditor', 'code');
        this.init();
    },

    watch: {
        environment() {
            this.init();
        },
        id() {
            this.init();
        },
    },

    methods: {
        init() {
            if (!this.user) {
                this.getUser();
            } else if (!this.codeData) {
                this.getCodeData();
            }
        },

        getUser() {
            if (this.environment.baseUrl) {
                this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
                    .then(({ data }) => {
                        store.commit('cacheUser', data);
                        if (!this.codeData) {
                            this.getCodeData(data.gistId);
                        }
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: msg.errors.user,
                        });
                    });
            }
        },

        getCodeData(id) {
            const gistId = id || this.user.code;

            if (gistId) {
                const url = `https://api.github.com/gists/${gistId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        store.commit('cacheUserCodeData', data);
                    })
                    .catch(() => {
                        this.$notify.error({
                            title: 'Error',
                            message: 'Error',
                        });
                    });
            }
        },
    },
};
</script>
