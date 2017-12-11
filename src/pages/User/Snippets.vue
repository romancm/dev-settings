<template lang="html">
    <prism
        language="coffeescript"
        :code="gistData.files['snippets.cson'].content"
    />
</template>

<script>
import Prism from 'vue-prismjs';

export default {
    components: {
        Prism,
    },

    props: {
        gistData: Object,
        userData: Object,
    },

    computed: {
        id() { return this.$route.params.id; },
    },

    mounted() {
        document.title = `${this.id} Snippets | Atom Settings`;
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/variables";

    pre {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: $border-radius;
    }
</style>
