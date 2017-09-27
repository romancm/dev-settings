<template lang="html">
    <div class="packages">
        <div class="col-xs-12">
            <h2>Packages</h2>
        </div>
        <div class="col-xs-4 package-list">

            <div class="panel panel-default">
                <div class="panel-body">
                    <a v-for="{name, version} in packages" @click="getPackage(name)"
                        :class="['package-btn btn btn-sm btn-default', { 'btn-primary' : isActive(name)}]"
                    >
                        {{name}}
                        <span class="label label-info">{{version}}</span>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-xs-8" v-if="activePackage">
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default package-preview">
                        <div class="panel-body">
                            <vue-markdown :source="activePackage.readme" />
                        </div>
                    </div>
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
            this.$http.get(`https://www.atom.io/api/packages/${packageName}`).then(({ data }) => {
                this.activePackage = data;
                this.nextTick(() => {
                    this.$forceUpdate();
                });
            });
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .package-list {
        max-height: calc(100vh - 40px);
        overflow: auto;
        .package-btn {
            margin-bottom: 5px;
            width: 100%;
            text-align: left;
        }
    }

    .package-preview {
        max-height: calc(100vh - 40px);
        overflow: auto;
        background: #fff;
        overflow: auto;
    }
</style>
