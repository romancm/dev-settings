<template lang="html">
    <div class="packages">
        <h2>Packages</h2>
        <div class="col-xs-4 packages">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title text-primary">
                        <i class="fa fa-archive" aria-hidden="true"></i>
                        Packages
                    </h3>
                </div>
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
                        <div class="panel-heading">
                            <h3 class="panel-title">{{activePackage.name}}</h3>

                            <p>Downloads {{ activePackage.downloads }}</p>
                        </div>
                        <div class="panel-body">
                            <vue-markdown :source="activePackage.readme" />
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
    .packages {
        .package-btn {
            margin-bottom: 5px;
            width: 100%;
            text-align: left;
        }
    }

    .package-preview {
        background: #fff;
        overflow: auto;
    }
</style>
