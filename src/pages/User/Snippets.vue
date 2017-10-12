<template lang="html">
    <div>
        <h2>Snippets</h2>
        <pre>{{gistData.files['snippets.cson'].content}}</pre>
        <!-- <vue-markdown :source="gistData.files['snippets.cson'].content" /> -->
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
