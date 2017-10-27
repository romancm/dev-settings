<template lang="html">
    <div>
        <h2>Snippets</h2>

        <prism
            language="coffeescript"
            :code="gistData.files['snippets.cson'].content"
            :plugins="[]"
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
        userData: Object,
    },
};
</script>

<style lang="css">
</style>
