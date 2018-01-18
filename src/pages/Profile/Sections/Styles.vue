<template lang="html">
    <prism
        language="less"
        :code="atomData.files['styles.less'].content"
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
        document.title = `${this.id} Styles | Atom Settings`;
    },
};
</script>
