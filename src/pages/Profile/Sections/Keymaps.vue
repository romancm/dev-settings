<template lang="html">
    <prism
        language="coffeescript"
        :code="atomData.files['keymap.cson'].content"
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
        document.title = `${this.id} Keymaps | Atom Settings`;
    },
};
</script>
