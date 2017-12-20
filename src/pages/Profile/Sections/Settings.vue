<template lang="html">
    <prism
        language="json"
        :code="gistData.files['settings.json'].content"
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
        document.title = `${this.id} Settings | Atom Settings`;
    },
};
</script>
