<template lang="html">
    <el-container>
        <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isMobile" @select="selectPackage">
                <el-menu-item :index="name" v-for="{name, version} in packages">
                    <span slot="title">{{name}}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <vue-markdown :source="packageData.readme" v-if="packageData" />
            <span v-if="!packageName">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                Select a package
            </span>
        </el-main>
    </el-container>
</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            packageData: null,
            loading: false,
        };
    },

    props: {
        gistData: Object,
    },

    computed: {
        packages() {
            return JSON.parse(this.gistData.files['packages.json'].content);
        },
        packageName() {
            return this.$route.params.packageName;
        },
        isMobile() {
            return this.$mq.resize && this.$mq.below(768);
        },
    },

    watch: {
        packageName() {
            this.loadPackage();
        },
    },

    mounted() {
        this.loadPackage();
    },

    methods: {
        selectPackage(name) {
            const params = {
                ...this.$route.params,
                packageName: name,
            };

            this.$router.push({ name: 'package', params });
        },

        loadPackage() {
            if (this.packageName) {
                this.loading = true;
                this.$http.get(`https://www.atom.io/api/packages/${this.packageName}`)
                .then(({ data }) => {
                    this.loading = false;
                    this.packageData = data;
                })
                .catch(() => {
                    console.log('err');
                });
            } else {
                this.packageData = null;
            }
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .el-menu-item {
        // padding: 0 !important;
        height: 36px !important;
        line-height: 36px !important;
    }
    // .package-list {
    //     max-height: calc(100vh - 40px);
    //     overflow: auto;
    //     .package-btn {
    //         margin-bottom: 5px;
    //         width: 100%;
    //         text-align: left;
    //     }
    // }
    //
    // .package-preview {
    //     max-height: calc(100vh - 40px);
    //     overflow: auto;
    //     background: #fff;
    //     overflow: auto;
    // }

    .el-aside {
        background: #cfc;
        // height: calc(100vh - 300px);
    }
    img {
        max-width: 100%;
    }
</style>
