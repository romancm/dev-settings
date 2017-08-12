<template>
    <main id="app">
        <nav-header/>
        <verified-banner/>
        <router-view/>
    </main>
</template>

<script>
import VerifiedBanner from './components/VerifiedBanner/VerifiedBanner';
import NavHeader from './components/NavHeader/NavHeader';

export default {
    name: 'app',

    components: {
        VerifiedBanner,
        NavHeader,
    },
};

</script>

<style lang="scss" rel="stylesheet/scss">
    @import "styles/lumen";
    @import "styles/_variables";
    @import "styles/_global";
</style>
