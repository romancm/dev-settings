<template lang="html">
    <div class="package-preview" v-if="source">
        {{source}}
        <modal name="modal" adaptive="true" scrollable="true" height="500">
            <vue-markdown :source="source.readme" />
        </modal>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            currentPackage: null,
        };
    },

    props: {
        source: [String, Object],
    },

    methods: {
        open() {
            this.$modal.show('termsModal');
            this.$modal.show('modal');
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.package-preview {
    padding: 15px;
    overflow: auto;
}
</style>
