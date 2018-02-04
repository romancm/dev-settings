<template lang="html">
    <div>
        <profile-menu />
        <profile-home v-if="routeName === 'profileAtom'" />
        <router-view />
    </div>
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
        editor() { return store.getters.editor; },
        atomData() { return store.getters.atomCache[this.id]; },
        // codeData() { return store.getters.codeCache[this.id]; },
        id() { return this.$route.params.id; },
        user() { return store.getters.userCache[this.id]; },
        environment() { return store.getters.environment; },
        routeName() { return this.$route.name; },
    },

    mounted() {
        document.title = `${this.id} Settings | Atom Settings`;
        store.commit('setEditor', 'atom');
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
            } else if (!this.atomData) {
                this.getAtomData();
                // this.getCodeData();
            }
        },

        getUser() {
            if (this.environment.baseUrl) {
                this.$http.get(`${this.environment.baseUrl}/browse/${this.id}`)
                    .then(({ data }) => {
                        store.commit('cacheUser', data);
                        if (!this.atomData) {
                            this.getAtomData(data.gistId);
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

        getAtomData(id) {
            const atomGistId = id || this.user.atom;

            if (atomGistId) {
                const url = `https://api.github.com/gists/${atomGistId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        store.commit('cacheUserAtomData', data);
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
