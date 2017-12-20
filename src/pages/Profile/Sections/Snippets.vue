<template lang="html">
    <prism
        language="coffeescript"
        :code="gistData.files['snippets.cson'].content"
    />
</template>

<script>
import { store } from '@/store';
import Prism from 'vue-prismjs';

export default {
    components: {
        Prism,
    },

    computed: {
        id() { return this.$route.params.id; },
        gistData() { return store.getters.gistCache[this.id]; },
    },

    mounted() {
        document.title = `${this.id} Snippets | Atom Settings`;
    },
};
</script>
