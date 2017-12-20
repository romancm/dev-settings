<template lang="html">
    <div class="profile-card" v-if="user">
        <img :src="user.avatar" :alt="user.user" class="avatar">
    </div>
</template>

<script>
    import { store } from '@/store';

    export default {
        computed: {
            id() { return this.$route.params.id; },
            user() { return store.getters.userCache[this.id]; },
            environment() { return store.getters.environment; },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .profile-card {
        overflow: hidden;
        height: 64px;
        width: 64px;
        display: flex;
        background: $color-white;
        border-right: none;
        
        .avatar {
            max-width: 100%;
        }
    }
</style>
