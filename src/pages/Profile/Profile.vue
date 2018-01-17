<template lang="html">
    <div class="profile">
        <profile-menu />
        <profile-home v-if="routeName === 'profile'" />
        <router-view />
    </div>
</template>

<script>
import UserCard from './UserCard';
import ProfileHome from './Sections/ProfileHome';
import ProfileMenu from './ProfileMenu';

export default {
    components: {
        UserCard,
        ProfileHome,
        ProfileMenu,
    },

    computed: {
        id() { return this.$route.params.id; },
        routeName() { return this.$route.name; },
    },

    mounted() {
        document.title = `${this.id} Settings | Atom Settings`;
    },
};
</script>
