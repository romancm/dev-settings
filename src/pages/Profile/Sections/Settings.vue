<template lang="html">
    <prism
        language="json"
        :code="atomData.files['settings.json'].content"
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
        atomData() { return store.getters.atomCache[this.id]; },
    },

    mounted() {
        document.title = `${this.id} Settings | Atom Settings`;
    },
};
</script>
