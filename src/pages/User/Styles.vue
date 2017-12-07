<template lang="html">
    <div>
        <h2>Styles</h2>
        <prism
            language="less"
            :code="gistData.files['styles.less'].content"
        />
    </div>
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
        document.title = `${this.id} Styles | Atom Settings`;
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    pre {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: 5px;
    }
</style>
