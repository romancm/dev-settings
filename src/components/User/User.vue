<template lang="html">
  <div>
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
        console.log(this.$route.params.id);
    },
};
</script>

<style lang="css">
</style>
