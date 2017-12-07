<template lang="html">
    <div>
        <h2>Init Script</h2>
        <prism
            language="coffeescript"
            :code="gistData.files['init.coffee'].content"
        />
    </div>
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
        document.title = `${this.id} Init Script | Atom Settings`;
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    pre {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: 5px;
    }
</style>
