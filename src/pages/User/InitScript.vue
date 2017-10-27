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

    props: {
        gistData: Object,
    },
};
</script>

<style lang="css">
</style>
