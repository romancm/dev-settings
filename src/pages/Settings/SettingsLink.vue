<template lang="html">
    <div class="settings-profile">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="16">
                <el-alert
                    title="Settings linked"
                    show-icon
                    :closable="false"
                    type="success"
                    description="Your settings are linked and can be seen by other developers. Thank you for using Atom Settings"
                />
                <gist-select />
            </el-col>
            <el-col :xs="24" :sm="8">
                <h3>Get started</h3>
                <p class="small">Please refer to the following video about how to setup sync-settings package and get started sharing your settings.</p>
                <p class="small">Special thanks to <a href="https://www.youtube.com/channel/UCGo6gTZTxSnueTx1aC1FWDQ" target="_blank">Danny Dickson</a> for creating such a great guide.</p>

                <p class="small"></p>

                <div class="videoWrapper">
                    <iframe width="560" height="315" src="http://www.youtube.com/embed/fchZJvaktdc?&rel=0&showinfo=0&modestbranding=1&hd=1&autohide=1" frameborder="0" allowfullscreen />
                </div>

                <el-alert
                    title="Public Gists Warning"
                    show-icon
                    type="warning"
                    :closable="false"
                    description="If you use certain packages, storing auth-tokens, a malicious party could abuse them.">
                </el-alert>

                <el-alert
                    title="Not seeing your Gist?"
                    show-icon
                    :closable="false"
                    description="We only display public gists, if your sync-settings gist is set to secret you may have to create a new public gist.">
                    <a href="https://help.github.com/articles/about-gists/" class="btn btn-info" target="_blank">
                        Learn more about Gists
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                    </a>
                </el-alert>
            </el-col>
        </el-row>

        <!-- <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p> -->

    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';
import GistSelect from './GistSelect';

export default {
    components: {
        VueMarkdown,
        GistSelect,
    },

    data() {
        return {
            instructions: null,
            active: 0,
            showGistSelect: false,
            loading: false,
            loadingGists: false,
            showInst: false,
        };
    },

    mounted() {
        this.getSyncReadme();
        this.active = this.session.user.gistId ? 0 : 0;
        this.showInst = Boolean(!this.session.user.gistId);
    },

    computed: {
        session() { return store.getters.session; },
    },

    methods: {
        next() {
            this.active += 1;

            if (this.active > 3) {
                this.active = 0;
            }
        },

        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },

        editSelection() {
            this.showGistSelect = true;
        },
    },
};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";

    .settings-profile {
        .videoWrapper {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 */
            padding-top: 25px;
            height: 0;
        }
        .videoWrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        // .success {
        //     text-align: center;
        //     h1 {
        //         color: $color-success;
        //         i {
        //             font-size: 100px;
        //         }
        //     }
        //     p {
        //         font-size: 12px;
        //     }
        //     .edit {
        //         text-align: left;
        //     }
        // }
        // .el-steps {
        //     margin: 0 auto;
        //
        //     @media($lg) {
        //         width: 600px;
        //
        //     }
        //
        //     .el-step__icon {
        //         border-color: $color-primary !important;
        //         font-size: 12px !important;
        //         color: $color-primary;
        //
        //     }
        //     .el-step__head.is-success {
        //         .el-step__icon {
        //
        //             border-color: $color-success !important;
        //             color: $color-white !important;
        //             background: $color-success;
        //
        //         }
        //     }
        // }

        // .instructions {
        //     text-align: center;
        //
        //     .command {
        //         background: $color-white;
        //         color: $color-primary;
        //         border: 1px solid $color-base-border;
        //         border-radius: 5px;
        //         padding: 3px 5px;
        //         display: inline;
        //     }
        //
        //     .readme {
        //         text-align: left;
        //         font-size: 12px;
        //         background: #ccc;
        //         padding: $gp;
        //         background: #fff;
        //         border: 1px solid $color-base-border;
        //         border-radius: $border-radius;
        //         margin-bottom: $gp * 2;
        //     }
        //
        //     ol {
        //         text-align: justify;
        //         font-size: 12px;
        //         width: 300px;
        //     }
        // }
    }
</style>
