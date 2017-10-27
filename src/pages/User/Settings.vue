<template lang="html">
    <div>
        <h2>Settings</h2>
        <prism
            language="json"
            :code="gistData.files['settings.json'].content"
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
