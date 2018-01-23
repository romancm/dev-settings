<template>
    <nav :class="editor">
        <el-popover ref="editor" placement="right" width="180" v-model="showEditorPopover" trigger="hover">
            <div class="popover-content">
                <h5>Change Editor</h5>
                <div class="popover-actions">
                    <el-button plain @click="selectEditor('atom')" class="atom">
                        <img src="static/logos/atom.svg" width="30">
                    </el-button>
                    <el-button type="info" plain @click="selectEditor('code')" class="code">
                        <img src="static/logos/code.svg" width="30">
                    </el-button>
                </div>
            </div>
        </el-popover>

        <span v-popover:editor>
            <img :src="`static/logos/atom.svg`" alt="" v-if="editor === 'atom'" class="editor">
            <img :src="`static/logos/code.svg`" alt="" v-if="editor === 'code'" class="editor">
        </span>


        <el-tooltip content="Browse" placement="right" effect="light">
            <router-link :to="{ name: 'home' }">
                <i class="fa fa-home" />
            </router-link>
        </el-tooltip>

        <div class="session">
                <el-tooltip content="Jobs for Developers" placement="right" effect="light">
                    <router-link :to="{ name: 'jobs' }">
                        <el-badge is-dot class="item" v-if="!jobsSeen">
                            <i class="fa fa-briefcase" aria-hidden="true"></i>
                        </el-badge>

                        <i class="fa fa-briefcase" aria-hidden="true" v-else />
                    </router-link>
                </el-tooltip>

            <div v-if="session.token">
                <el-tooltip content="Link Settings" placement="right" effect="light">
                    <router-link :to="{ name: 'settingsLink' }">
                        <i aria-hidden="true" class="fa fa-github" />
                    </router-link>
                </el-tooltip>
                <el-tooltip content="Social Networks" placement="right" effect="light">
                    <router-link :to="{ name: 'settingsSocial' }">
                        <i aria-hidden="true" class="fa fa-share-alt"></i>
                    </router-link>
                </el-tooltip>
                <el-tooltip content="My Profile" placement="right" effect="light">
                    <router-link :to="{ name: 'settingsProfile' }">
                        <i aria-hidden="true" class="fa fa-user"></i>
                    </router-link>
                </el-tooltip>
                <el-tooltip content="Account" placement="right" effect="light">
                    <router-link :to="{ name: 'settingsAccount' }">
                        <i aria-hidden="true" class="fa fa-lock"></i>
                    </router-link>
                </el-tooltip>

                <router-link :to="{ name: 'settingsProfile' }">
                    <img :src="user.avatar" alt="user.user" width="60" height="60">
                </router-link>
            </div>

            <a @click="centerDialogVisible = true" v-else>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
            </a>
            <!-- <el-button type="text" @click="centerDialogVisible = true">Click to open the Dialog</el-button> -->

            <el-dialog
                title="Sign in / Create an account with GitHub"
                :visible.sync="centerDialogVisible"
                width="70%"
                center
            >
            <span>From software architects to hobbyist, share and discover settings, workspaces, packages and more.</span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" plain @click="signIn">
                        <i class="fa fa-github" aria-hidden="true" />
                        Sign in with GitHub
                    </el-button>
                </span>
            </el-dialog>
        </div>
    </nav>
</template>

<script>
import { store } from '@/store';
import moment from 'moment';

export default {
    data() {
        return {
            showEditorPopover: false,
            open: false,
            centerDialogVisible: false,
        };
    },

    computed: {
        preferences() { return store.getters.preferences; },
        user() { return store.getters.session.user; },
        editor() { return store.getters.editor; },
        session() { return store.getters.session; },
        today() { return moment().format('MM/DD/YYYY'); },
        meta() { return this.$route.meta; },
        section() { return this.$route.name; },
        environment() { return store.getters.environment; },
        settingsRoute() { return this.session.user.gistId ? 'settingsProfile' : 'settingsLink'; },
        githuburl() { return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`; },
        jobsSeen() {
            return this.preferences && this.preferences.jobsTimestamp === this.today;
        },
    },

    methods: {
        selectEditor(editor) {
            if (editor !== this.editor) {
                store.commit('setEditor', editor);
                // TODO: only push route if looking at profile
                this.$router.push({ name: 'home' });

                // TODO: handle route change if in settingsLink
            }

            this.showEditorPopover = false;
        },

        signIn() {
            window.location.href = this.githuburl;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    nav {
        height: 100vh;
        width: 60px;
        background: #1D2733;
        transition: background 1000ms ease;

        .editor {
            padding: $gp;
            fill: $color-white;
            color: $color-white;
            width: 40px;
            height: auto;
        }

        &.atom {
            background: $color-atom-primary;

            a {
                color: $color-white;
            }
        }

        &.code {
            background: #373277;

            a {
                color: $color-white;
            }
        }

        a {
            display: flex;
            align-items: center;
            width: 60px;
            height: 60px;
            text-align: center;
            color: $color-white;
            text-decoration: none;

            &:hover {
                background: rgba(255, 255, 255, .1);
            }

            i, .el-badge {
                margin: 0 auto;
            }
        }

        .session {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
        }

        .el-dialog {
            text-align: center;
        }
    }

    .el-button {
        &.atom {
            background: $color-atom-primary;
        }

        &.code {
            background: $color-vscode-primary;
        }
    }
</style>
