<template>
    <nav :class="editor">
        <el-popover ref="logout" placement="right" width="180" v-model="showEditorPopover" trigger="hover">
            <div class="popover-content">
                <h5>Change Editor</h5>
                <div class="popover-actions">
                    <el-button type="info" plain @click="selectEditor('atom')">
                        <img src="static/img/atom.png" width="30">
                    </el-button>
                    <el-button type="info" plain @click="selectEditor('code')">
                        <img src="static/img/code.png" width="30">
                    </el-button>
                </div>
            </div>
        </el-popover>

        <img :src="`static/img/${editor}.svg`" alt="" v-show="editor" class="editor" v-popover:logout>

        <el-tooltip content="Browse" placement="right" effect="light">
            <router-link :to="{ name: 'home' }">
                <i class="fa fa-home" />
            </router-link>
        </el-tooltip>

        <div class="session">
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

            <a :href="githuburl" v-else>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
            </a>
        </div>
    </nav>
</template>

<script>
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        data() {
            return {
                showEditorPopover: false,
                open: false,
            };
        },
        components: {
            Avatar,
        },

        computed: {
            user() { return store.getters.session.user; },
            editor() { return store.getters.editor; },
            session() { return store.getters.session; },
            meta() { return this.$route.meta; },
            section() { return this.$route.name; },
            environment() { return store.getters.environment; },
            settingsRoute() { return this.session.user.gistId ? 'settingsProfile' : 'settingsLink'; },
            githuburl() { return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`; },
        },

        methods: {
            selectEditor(editor) {
                if (editor !== this.editor) {
                    store.commit('setEditor', editor);
                    this.$router.push({ name: 'home' });
                }

                this.showEditorPopover = false;
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
            background: #0ba673;

            a {
                color: $color-white;
            }
        }

        &.code {
            background: #007acc;

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

            i {
                margin: 0 auto;
            }
        }

        .session {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
        }
    }
</style>
