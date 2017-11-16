<template lang="html">
    <el-container>
        <el-aside width="200px">
            <el-card class="box-card">
                <span v-for="{name, version} in packages" @click="getPackage(name)"
                    :class="['text-success', { 'btn-primary' : isActive(name)}]"
                >
                    {{name}}
                    <span class="label label-info">{{version}}</span>
                </span>
            </el-card>

            <div class="col-xs-4 col-lg-3 package-list">
                <p class="text-normal text-warning">Test</p>

                <div class="panel panel-default">
                    <div class="panel-body">

                    </div>
                </div>
            </div>
        </el-aside>
        <el-main>
            <div class="packages">

                <div class="col-xs-8" v-if="activePackage">
                    <div class="panel panel-default package-preview">
                        <div class="panel-body" v-loading="loading"
                        >
                            <vue-markdown :source="activePackage.readme" />
                        </div>
                    </div>
                </div>

                <div class="col-xs-8" v-else>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="panel panel-default package-preview">
                                <div class="panel-body">
                                    <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                    Select a package
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            activePackage: null,
            loading: false,
        };
    },

    props: {
        gistData: Object,
        userData: Object,
    },

    computed: {
        packages() {
            return JSON.parse(this.gistData.files['packages.json'].content);
        },
    },

    methods: {
        isActive(packageName) {
            return this.activePackage && this.activePackage.name === packageName;
        },

        getPackage(packageName) {
            this.loading = true;
            this.$http.get(`https://www.atom.io/api/packages/${packageName}`)
                .then(({ data }) => {
                    this.loading = false;
                    this.activePackage = data;
                })
                .catch(() => {
                    console.log('err');
                });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
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
    img {
        max-width: 100%;
    }
</style>
