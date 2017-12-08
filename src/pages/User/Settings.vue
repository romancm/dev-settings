<template lang="html">
    <prism
        language="json"
        :code="gistData.files['settings.json'].content"
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
    },

    computed: {
        id() { return this.$route.params.id; },
    },

    mounted() {
        document.title = `${this.id} Settings | Atom Settings`;
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    pre {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: 5px;
    }
</style>
