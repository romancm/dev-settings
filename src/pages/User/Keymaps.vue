<template lang="html">
    <div>
        <h2>Keymaps</h2>
        <prism
            language="coffeescript"
            :code="gistData.files['keymap.cson'].content"
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
