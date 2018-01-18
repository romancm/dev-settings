<template lang="html">
    <div>
        <prism
            language="json"
            :code="atomData.files['settings.json'].content"
            v-if="editor === 'atom'"
        />

        <prism
            language="json"
            :code="cacheData.files['settings.json'].content"
            v-if="editor === 'code'"
        />
    </div>
</template>

<script>
import { store } from '@/store';
import Prism from 'vue-prismjs';

export default {
    components: {
        Prism,
    },

    computed: {
        editor() { return store.getters.editor; },
        id() { return this.$route.params.id; },
        atomData() { return store.getters.atomCache[this.id]; },
        cacheData() { return store.getters.codeCache[this.id]; },
    },

    mounted() {
        document.title = `${this.id} Settings | Atom Settings`;
    },
};
</script>
