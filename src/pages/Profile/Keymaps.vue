<template lang="html">
    <prism
        language="coffeescript"
        :code="gistData.files['keymap.cson'].content"
    />
</template>

<script>
import Prism from 'vue-prismjs';

export default {
    components: {
        Prism,
    },

    computed: {
        id() { return this.$route.params.id; },
    },

    props: {
        gistData: Object,
    },

    mounted() {
        document.title = `${this.id} Keymaps | Atom Settings`;
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";

    pre {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: $border-radius;
    }
</style>
