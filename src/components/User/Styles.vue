<template lang="html">
    <div>
        <h2>Styles</h2>
        <pre>{{gistData.files['styles.less'].content}}</pre>
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
