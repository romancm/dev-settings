<template lang="html">
    <div>
        <h2>Key Maps</h2>
        <vue-markdown :source="gistData.files['keymap.cson'].content" />
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
