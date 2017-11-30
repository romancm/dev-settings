<template>
    <main id="app">
        <el-container>
            <nav-header v-if="!$route.meta.hideNav" />
            <router-view/>
            <el-footer height="auto">
                <as-footer />
            </el-footer>
        </el-container>
    </main>
</template>

<script>
import { store } from '@/store';
import NavHeader from './components/NavHeader/NavHeader';
import AsFooter from './components/Footer/Footer';

export default {
    name: 'app',

    components: {
        NavHeader,
        AsFooter,
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
    @import "styles/_global";
    .el-footer {
        background: $color-info;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
