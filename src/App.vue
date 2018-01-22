<template>
    <div id="app">
        <nav-header v-if="!$route.meta.hideNav" />
        <main class="main-content">
            <router-view/>
        </main>

    </div>
</template>

<script>
import { store } from '@/store';
import NavHeader from './components/NavHeader/NavHeader';
import PageFooter from './components/PageFooter/PageFooter';

export default {
    name: 'app',

    components: {
        NavHeader,
        PageFooter,
    },

    computed: {
        environment() { return store.getters.environment; },
    },

    mounted() {
        store.commit('setEnvironment', process.env.NODE_ENV);
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "styles/_variables";
    @import "styles/_typography";
    @import "styles/_elementui";
    @import "styles/_global";
    @import "styles/_profile";

    #app {
        display: flex;
        .main-content {
            flex: 1;
            height: 100vh;
            background: $color-white;
            overflow-y: auto;
        }
    }

</style>
