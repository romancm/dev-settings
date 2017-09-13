<template lang="html">
  <div>
      <a href="/#/browse" class="btn btn-info">Browse</a>
      {{id}}
      <hr>
  </div>
</template>

<script>
export default {
    computed: {
        id() {
            return this.$route.params.id;
        },
    },

    created() {
        // TODO: Get user profile info
        console.log('boom');
        console.log(this.$route.params.id);
    },
};
</script>

<style lang="css">
</style>
