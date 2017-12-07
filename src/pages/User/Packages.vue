<template lang="html">
    <div>
        <h2>Packages</h2>
        <el-container class="user-packages">
            <!-- <el-menu default-active="2" class="el-menu-vertical-demo" @select="selectPackage">
                <el-menu-item :index="name" v-for="{name, version} in packages" :key="version">
                    <span slot="title">{{name}}</span>
                </el-menu-item>
            </el-menu> -->
            <el-aside v-if="!isMobile">
                <el-menu default-active="2" class="el-menu-vertical-demo" @select="selectPackage">
                    <el-menu-item :index="name" v-for="{name, version} in packages" :key="version">
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
    </div>
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

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";

    .user-packages {
        .el-menu-item {
            // padding: 0 !important;
            height: 36px !important;
            line-height: 36px !important;
        }

        img {
            max-width: 100%;
        }

        .el-aside, .el-menu {
            width: 200px !important;
            @media($xs) {
                width: 100% !important;
            }
        }

        .el-aside, .el-main {
            height: calc(100vh - 260px);
            @media($xs) {
                padding: 0;
                height: auto;
            }
        }
    }

</style>
