<template>
    <main id="app">
        <el-container>
            <nav-header v-if="!$route.meta.hideNav" />
            <router-view/>
            <el-footer height="auto">
                <page-footer />
            </el-footer>
        </el-container>
    </main>
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
    // @import "styles/lumen";
    @import "styles/_variables";
    @import "styles/_typography";
    @import "styles/_elementui";
    @import "styles/_global";

    .el-footer {
        padding: 0;
    }
</style>
