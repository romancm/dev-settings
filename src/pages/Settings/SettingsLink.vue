<template lang="html">
    <div class="settings-profile">
        <h3>Link Settings</h3>
        <!-- <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p> -->
        <div class="success" v-if="session.user.gistId">
            <div v-if="!showGistSelect">
                <h1>
                    <i class="fa fa-trophy" aria-hidden="true"></i>
                    <br>
                    You did it!
                </h1>

                <p>Your settings are linked and can be seen by other developers. Thank you for using Atom Settings!</p>

                <p>You can link a different gist or unlink your settings</p>
                <el-button @click="editSelection">Edit selection</el-button>
            </div>

            <div class="edit" v-else>
                <el-button @click="showGistSelect = false">Back</el-button>
                <gist-select />
            </div>

        </div>

        <div v-else>
            <el-steps :active="active" finish-status="success" v-if="!session.user.gistId">
                <el-step />
                <el-step />
                <el-step />
            </el-steps>

            <div class="instructions" v-if="showInst">
                <div v-if="active === 0">
                    <h4>Install Sync Settings package</h4>
                    <p>
                        <pre class="command">apm install sync-settings</pre> or using the Install packages pane from Atom Settings.</p>
                    <el-button @click="next">Next</el-button>
                </div>
                <div v-if="active === 1">
                    <h4>Configure Sync Settings package</h4>
                    <el-button @click="next">Next</el-button>
                    <!-- https://www.youtube.com/watch?v=fchZJvaktdc -->
                    <p>Please refer to the readme file below:</p>

                    <vue-markdown :source="instructions" v-if="instructions" class="readme" />
                </div>
                <div v-if="active === 2">
                    <gist-select />
                </div>

            </div>
        </div>
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
        .success {
            text-align: center;
            h1 {
                color: $color-success;
                i {
                    font-size: 100px;
                }
            }
            p {
                font-size: 12px;
            }
            .edit {
                text-align: left;
            }
        }
        .el-steps {
            margin: 0 auto;

            @media($lg) {
                width: 600px;

            }

            .el-step__icon {
                border-color: $color-primary !important;
                font-size: 12px !important;
                color: $color-primary;

            }
            .el-step__head.is-success {
                .el-step__icon {

                    border-color: $color-success !important;
                    color: $color-white !important;
                    background: $color-success;

                }
            }
        }

        .instructions {
            text-align: center;

            .command {
                background: $color-white;
                color: $color-primary;
                border: 1px solid $color-base-border;
                border-radius: 5px;
                padding: 3px 5px;
                display: inline;
            }

            .readme {
                text-align: left;
                font-size: 12px;
                background: #ccc;
                padding: $gp;
                background: #fff;
                border: 1px solid $color-base-border;
                border-radius: $border-radius;
                margin-bottom: $gp * 2;
            }

            ol {
                text-align: justify;
                font-size: 12px;
                width: 300px;
            }
        }
    }
</style>
