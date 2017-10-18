<template lang="html">
  <div class="avatar" @click="click">
      <span v-if="public">
          <img
              :class="['img-thumbnail', 'img-responsive', { 'img-circle': circle }, size]"
              :src="userData.avatar"
              v-if="userData.avatar"
          />

          <img
              :class="['img-thumbnail', 'img-responsive', { 'img-circle': circle }, size]"
              :src="'https://api.adorable.io/avatars/' + userData._id"
              v-else
          />
      </span>
      <span v-else>
          <img
              :class="['img-thumbnail', 'img-responsive', { 'img-circle': circle }, size]"
              :src="session.github.avatar_url"
              v-if="session"
          />
      </span>
  </div>
</template>

<script>
    import { store } from '@/store';

    export default {
        computed: {
            session() { return store.getters.session; },
        },

        props: {
            size: String,
            public: Boolean,
            userData: Object,
            circle: Boolean,
        },

        methods: {
            click() {
                this.$emit('click');
            },
        },

    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    img {
        cursor: pointer;
        border-color: rgba(0,0,0,0.1);

        &.img-thumbnail {
            background: var(--avatar-border-bg, #fff);
        }

        &.xs { width: 50px; }
        &.sm { width: 75px; }
        &.md { width: 100px; }
        &.lg { width: 150px; }
        &.xl { width: 200px; }
    }
</style>
