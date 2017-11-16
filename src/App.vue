<template>
    <main id="app">
        <el-container>
            <nav-header/>
            <router-view/>
            <el-footer />
        </el-container>
    </main>
</template>

<script>
import { store } from '@/store';
import NavHeader from './components/NavHeader/NavHeader';

export default {
    name: 'app',

    components: {
        NavHeader,
    },

    mounted() {
        store.commit('setEnvironment', process.env.NODE_ENV);
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    // @import "styles/lumen";
    @import "styles/_variables";
    @import "styles/_global";

    .el-footer {
        background: #fff;
    }
</style>
