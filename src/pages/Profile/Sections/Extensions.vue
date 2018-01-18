<template lang="html">
    <div class="user-packages">
        <div class="package-list" v-if="!params.extensionName">
            <el-button type="text" plain v-for="{ name } in extensions" :key="name" @click="goToExtension(name)">
                <i class="fa" :class="getExtensionIcon(name)"></i>
                {{name}}
            </el-button>
        </div>

        <div v-else-if="!loading && params.extensionName">
            <div class="package-toolbar" :v-loading="!loading && this.params.extensionName">
                <gh-btns-watch :slug="repoUrl" :show-count="!isMobile"/>
                <gh-btns-star :slug="repoUrl" :show-count="!isMobile"/>
                <gh-btns-fork :slug="repoUrl" :show-count="!isMobile"/>
            </div>

            <vue-markdown :source="extensionDetails" v-if="params.extensionName && extensionDetails" v-cloak />
        </div>
    </div>
</template>

<script>
import { store } from '@/store';
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            extensionData: null,
            loading: false,
            extensionDetails: null,
            showPackageMenu: true,
            repoUrl: null,
        };
    },

    computed: {
        id() { return this.$route.params.id; },
        editor() { return store.getters.editor; },
        params() { return this.$route.params; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        codeData() { return store.getters.codeCache[this.id]; },
        extensions() { return this.codeData ? JSON.parse(this.codeData.files['extensions.json'].content) : null; }, // eslint-disable-line
        formattedExtensions() {
            const listings = {};
            this.extensions.forEach(({ name, metadata }) => {
                listings[name] = metadata.publisherId;
            });
            return listings;
        },
        environment() { return store.getters.environment; },
        // formattedRepository() { return !this.loading && this.extensionData
        //     && this.extensionData.repository ?
        //     this.extensionData.repository.url.split('github.com/')[1] :
        //     'atom/about'; }, // eslint-disable-line
        sections() { return Math.ceil(this.packages.length / 30); },
    },

    watch: {
        params() {
            if (!this.params.extensionName) {
                this.extensionDetails = null;
                console.log('nouaynada');
            }
            this.loadExtension();
        },
    },

    mounted() {
        document.title = `${this.id} Packages | Atom Settings`;

        this.loadExtension();
    },

    methods: {
        getExtensionIcon(name) {
            if (name.includes('language')) { return 'fa-language'; }
            if (name.includes('theme')) { return 'fa-paint-brush'; }
            if (name.includes('-ui')) { return 'fa-paint-brush'; }
            if (name.includes('syntax')) { return 'fa-code'; }

            return 'fa-archive';
        },

        togglePackageMenu() {
            this.showPackageMenu = !this.showPackageMenu;
        },

        goToExtension(name) {
            this.$router.push({ path: `/code/${this.$route.params.id}/extensions/${name}` });
        },

        loadReadme() {
            /* eslint-disable arrow-body-style */
            console.log(this.extensionData);
            const readmeIndex = this.extensionData.versions[0].files.findIndex(({ assetType }) => {
                return assetType === 'Microsoft.VisualStudio.Services.Content.Details';
            });

            const ghLinkIndex = this.extensionData.versions[0].properties.findIndex(({ key }) => {
                return key === 'Microsoft.VisualStudio.Services.Links.GitHub';
            });

            const repoUrl = this.extensionData.versions[0].properties[ghLinkIndex].value;

            this.repoUrl = repoUrl.split('github.com/')[1].split('.git')[0];


            const url = this.extensionData.versions[0].files[readmeIndex].source;

            this.$http.get(url)
                .then(({ data }) => {
                    this.extensionDetails = data;
                })
                .catch(() => {
                    console.log('err');
                });
        },

        loadExtension() {
            const publisherId = this.formattedExtensions[this.params.extensionName];

            if (publisherId) {
                this.loading = true;

                const url = `${this.environment.baseUrl}/scrape/${publisherId}`;
                this.$http.get(url)
                    .then(({ data }) => {
                        this.loading = false;
                        this.extensionData = data;
                        this.loadReadme();
                    })
                    .catch(() => {
                        console.log('err');
                    });
            } else {
                // this.selectPackage('about');
                this.extensionData = null;
            }
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";
    .extension-list {
        margin: 0;
        padding: 0;
        height: calc(100vh -60px);
        -webkit-column-count: 4;
        -moz-column-count: 4;
        column-count: 4;

        @media($xs) {
            column-count: 1;
            // height: calc(100vh -30px);
        }
        @media($sm) {
            column-count: 2;
        }
        .el-button {
            width: 100%;
            text-align: left;
            padding-left: $gp;
            // padding: 0 $gp;
            &+.el-button {
                margin: 0;
            }
        }
    }

    .package-toolbar {

        position: absolute;
        padding: $gp $gp / 2;
        background: $color-white;
        top: 0;
        right: 0;
        border-bottom: 1px solid $color-base-border;
        border-left: 1px solid $color-base-border;

        @media($xs) {
            background: transparent;
            position: static;
            padding: 0;
            top: auto;
            border: none;
            display: flex;

            .gh-button-container {
                margin: 0 $gp 0 0;
            }
        }

    }

    .user-packages {
        position: relative;
        font-size: 12px;
        background: rgba(255, 255, 255, 0.2) !important;
        padding: $gp * 2;
        height: calc(100vh - 100px);

        @media($xs) {
            height: calc(100vh - 80px);
            padding: $gp;
        }
        img {
            max-width: 100%;
        }
        pre {
            padding: $gp;
        }

        pre {
        	color: #c5c8c6;
        	text-shadow: 0 1px rgba(0, 0, 0, 0.3);
            font-family: Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace;
            overflow: auto;
            border-radius: 0.3em;
            background: #1d1f21;
            border-radius: .3em;
        }
    }

</style>
