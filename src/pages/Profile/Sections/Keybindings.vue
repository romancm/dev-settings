<template lang="html">
    <div>
        <prism
            language="coffeescript"
            :code="codeData.files['keybindings.json'].content"
        />
        <prism
            language="coffeescript"
            :code="codeData.files['keybindingsMac.json'].content"
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
        id() { return this.$route.params.id; },
        codeData() { return store.getters.codeCache[this.id]; },
    },

    mounted() {
        document.title = `${this.id} Keymaps | Atom Settings`;
    },
};
</script>
