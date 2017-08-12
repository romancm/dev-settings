<template>
    <div class="container">
        <div class="row">
            <h2 class="page-header">Settings</h2>
            <a v-for="route in settingsRoutes"
                :class="{ active: isCurrentRoute(route.path) }"
                :href="`#${route.path}`">
                {{route.title}}
            </a>

            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            settingsRoutes: [
                { path: '/settings/gist', title: 'Gist' },
                { path: '/settings/profile', title: 'Profile' },
                { path: '/settings/social-networks', title: 'Social' },
                { path: '/settings/security', title: 'Security' },
                { path: '/settings/account', title: 'Account' },
            ],
        };
    },

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.path;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .active {
        font-weight: bold;
    }
</style>
