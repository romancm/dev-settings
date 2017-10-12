<template lang="html">
    <div>
        <h2>Init Script</h2>
        <vue-markdown :source="gistData.files['init.coffee'].content" />
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    props: {
        gistData: Object,
        userData: Object,
    },
};
</script>

<style lang="css">
</style>
