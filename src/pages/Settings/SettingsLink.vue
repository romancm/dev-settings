<template lang="html">
    <el-row :gutter="20" class="settings-profile">
        <el-col :xs="24" :sm="16">
            <el-row :gutter="20">
                <el-col :xs="24">
                    <el-card class="gist" :class="[editor, { compatible: filteredGists.includes(gist) }]" v-for="gist in gists" :key="gist.id">
                        <header slot="header">
                            <span v-if="filteredGists.includes(gist)">
                                <img :src="`static/logos/atom.svg`" alt="" v-if="editor === 'atom'">
                                <img :src="`static/logos/code.svg`" alt="" v-if="editor === 'code'">
                            </span>

                            {{gist.description}}
                        </header>

                        <div class="gist-details">
                            <!-- {{gist.description}} -->
                            <div class="info">
                                <!-- <h5>{{gist.description}}</h5> -->
                                <p><strong>ID:</strong> {{gist.id}}</p>
                                <p><strong>Created</strong> {{ moment(gist.created_at).format('MMM/DD/Y') }}</p>
                                <p><strong>Last Updated</strong> {{ moment(gist.updated_at).format('MMM/DD/Y') }}</p>

                                <div v-if="filteredGists.includes(gist)" class="settings-sections">
                                    <div v-if="gist.files['packages.json']" class="packages">
                                        <icon name="archive" />
                                        Packages
                                    </div>

                                    <div v-if="gist.files['init.coffee']" class="scripts">
                                        <icon name="terminal" />
                                        Init Script
                                    </div>

                                    <div v-if="gist.files['keymap.cson']" class="keymaps">
                                        <icon name="keyboard-o" />
                                        Keymaps
                                    </div>

                                    <div v-if="gist.files['settings.json']" class="settings">
                                        <icon name="cogs" />
                                        Settings
                                    </div>

                                    <div v-if="gist.files['snippets.cson']" class="snippets">
                                        <icon name="code" />
                                        Snippets
                                    </div>

                                    <div v-if="gist.files['styles.less']" class="styles">
                                        <icon name="css3" />
                                        Styles
                                    </div>


                                    <div v-if="gist.files['extensions.json']" class="packages">
                                        <icon name="puzzle-piece" />
                                        Extensions
                                    </div>

                                    <div v-if="gist.files['keybindings.json']" class="keymaps">
                                        <icon name="keyboard-o" />
                                        Keybindings
                                    </div>
                                </div>
                            </div>

                            <el-button type="success" plain size="small" v-if="gist.id === session.user[editor]">
                                <icon name="check" />
                                Linked
                            </el-button>

                            <el-button type="success" plain size="small" @click="selectGist(gist.id)" v-else-if="filteredGists.includes(gist)">
                                <icon name="link" />
                                Link
                            </el-button>

                            <el-button type="warning" plain size="small" v-else>
                                <icon name="bad" />
                                Not compatible
                            </el-button>
                        </div>
                    </el-card>
                </el-col>

                <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="24" v-if="session.user[editor]">
                    <el-popover ref="unlink" placement="right" width="300" v-model="showUnlinkPopover" trigger="manual">
                        <div class="popover-content">
                            <h5>Are you sure?</h5>
                            <p class="small">Unlinking your gist will automatically <br /> remove you from browse results.</p>
                            <div class="popover-actions">
                                <el-button size="mini" type="info" @click="showUnlinkPopover = false" plain>No</el-button>
                                <el-button type="primary" size="mini" @click="selectGist(null)">Yes</el-button>
                            </div>
                        </div>
                    </el-popover>

                    <el-button v-popover:unlink type="danger" plain size="small">
                        <icon name="remove" />
                        Unlink Settings
                    </el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col :xs="24" :sm="8">
            <h3>Get started</h3>
            <p class="small">Please refer to the following video about how to setup sync-settings package and get started sharing your settings.</p>

            <el-alert
                title="IMPORTANT! Not seeing your Gist?"
                show-icon
                :closable="false"
                description="We only display public gists, if your sync-settings gist is set to secret you may have to create a new public gist.">
            </el-alert>

            <div class="instructionVideo">
                <iframe
                    width="560"
                    height="315"
                    :src="static[editor].videoUrl"
                    frameborder="0"
                    allowfullscreen
                />
            </div>

            <p class="small centered">
                Special thanks to <a :href="static[editor].channelUrl" target="_blank">{{static[editor].authorName}}</a> for creating such a great guide.
            </p>

            <el-alert
                title="Public Gists Warning"
                show-icon
                type="warning"
                :closable="false"
                description="If you use certain packages, storing auth-tokens, a malicious party could abuse them.">
            </el-alert>
        </el-col>
    </el-row>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';
import msg from '@/msg';
import moment from 'moment';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            instructions: null,
            active: 0,
            gists: [],
            showUnlinkPopover: false,
            showGistSelect: false,
            loading: false,
            loadingGists: false,
            showInst: false,
            static: {
                atom: {
                    videoUrl: 'http://www.youtube.com/embed/fchZJvaktdc?&rel=0&showinfo=0&modestbranding=1&hd=1&autohide=1',
                    authorName: 'Danny Dickson',
                    channelUrl: 'https://www.youtube.com/channel/UCGo6gTZTxSnueTx1aC1FWDQ',
                },
                code: {
                    videoUrl: 'http://www.youtube.com/embed/xohjRJPtxO0?&rel=0&showinfo=0&modestbranding=1&hd=1&autohide=1',
                    authorName: 'Codependent Codr',
                    channelUrl: 'https://www.youtube.com/channel/UCRjnjPqSWVn2e0EQxQlZEzw',
                },
            },
        };
    },

    mounted() {
        this.active = this.session.user.gistId ? 0 : 0;
        this.showInst = Boolean(!this.session.user.gistId);

        this.loadGists();
    },

    computed: {
        session() { return store.getters.session; },
        editor() { return store.getters.editor; },
        environment() { return store.getters.environment; },
        /* eslint-disable arrow-body-style */
        filteredGists() {
            return this.gists.filter((gist) => {
                let isValidGist;

                if (this.editor === 'code') {
                    isValidGist = gist.files && gist.files.cloudSettings;
                }

                if (this.editor === 'atom') {
                    isValidGist = gist.files && gist.files['init.coffee'];
                }

                return isValidGist;
            });
        },
    },

    methods: {
        moment() {
            return moment();
        },

        loadGists() {
            this.loadingGists = true;

            this.$http.get(`https://api.github.com/users/${this.session.user.user}/gists`)
            .then(({ data }) => {
                this.gists = data;
                this.loadingGists = false;
            })
            .catch(() => {
                this.$notify.error({
                    title: 'Error',
                    message: msg.errors.user,
                });
            });
        },

        selectGist(id) {
            const payload = {
                userName: this.session.user.user,
                gistId: id,
                token: this.session.token,
            };

            this.$http.put(`${this.environment.baseUrl}/profile/${this.editor}`, payload)
            .then(({ data }) => {
                store.commit('reloadUserData');

                this.$message({
                    showClose: false,
                    center: true,
                    message: data.message,
                    type: 'success',
                });
            })
            .catch(() => {
                this.$message({
                    center: true,
                    type: 'error',
                    message: msg.errors.settings.gist,
                });
            })
            .then(() => {
                this.loading = false;
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
        .instructionVideo {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 */
            padding-top: 25px;
            margin-top: $gp * 2;
            height: 0;

            iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }

        .gist {
            margin-top: $gp * 2;

            .el-card__header, .el-card__body { padding: 0; }

            header {
                padding: $gp;
                font-size: 15px;

                img {
                    height: 16px;
                    margin-right: $gp / 2;
                }
            }

            .gist-details {
                font-size: 12px;
                display: flex;
                align-items: center;
                padding: $gp $gp * 2;

                .info {
                    flex: 1;
                }
            }

            .settings-sections {
                display: flex;
                align-items: center;

                > div {
                    margin: 0 $gp * 2 0 0;

                    &.settings { color: $color-settings; }
                    &.packages { color: $color-packages; }
                    &.scripts { color: $color-scripts; }
                    &.snippets { color: $color-snippets; }
                    &.keymaps { color: $color-keymaps; }
                    &.styles { color: $color-styles; }
                }
            }

            &.compatible {
                &.code {
                    header {
                        color: $color-white;
                        background: $color-vscode-primary;
                    }
                }
                &.atom {
                    header {
                        color: $color-white;
                        background: $color-atom-primary;
                    }
                }
            }

            &:last-child {
                margin-bottom: $gp * 2;
            }
        }
    }
</style>
