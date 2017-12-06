<template lang="html">
    <div class="col-xs-12">
        <!-- <h3>Hello, {{session.github.login}}!</h3> -->
        <!-- <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p> -->
        <div class="panel panel-default">
            <div class="panel-body">
                <vue-markdown :source="instructions" v-if="instructions" />
            </div>
        </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            instructions: null,
        };
    },

    mounted() {
        this.getSyncReadme();
    },

    computed: {
        session() { return store.getters.session; },
    },

    methods: {
        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },
    },
};
</script>
