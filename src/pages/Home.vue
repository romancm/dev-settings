<template>
    <div class="home">
        <div class="hero">
            <h2>Welcome home, developers</h2>
            <p>From software architects to hobbyist, share and discover atom settings,<br /> discover workspaces, packages and more.</p>
            <el-button type="primary" v-if="!session.token" @click="login">
                <i class="fa fa-github" aria-hidden="true"></i>  Login with Github
            </el-button>
        </div>

        <div class="features">
            <el-row :gutter="0">
                <el-col>
                    <div class="feature title">
                        <h3>Share and Discover</h3>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature settings">
                        <i class="fa fa-cogs fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Settings</h3>
                            <p>Font settings, tab size, scroll speed and more.</p>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature packages">
                        <i class="fa fa-archive fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Packages</h3>
                            <p>Make Atom do amazing things with packages.</p>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature scripts">
                        <i class="fa fa-terminal fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Scripts</h3>
                            <p>Discover and share your favorite flavor of Atom.</p>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature snippets">
                        <i class="fa fa-code fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Snippets</h3>
                            <p>Incredibly powerful way to quickly generate commonly needed code syntax from a shortcut.</p>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature keymaps">
                        <i class="fa fa-keyboard-o fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Keymaps</h3>
                            <p>Associate keystrokes with events in specific contexts.</p>
                        </div>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="feature styles">
                        <i class="fa fa-css3 fa-5x" aria-hidden="true"></i>
                        <div>
                            <h3>Styles</h3>
                            <p>Add your own CSS or LESS to fully customize Atom</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        components: {
            Avatar,
        },

        computed: {
            session() { return store.getters.session; },
            environment() { return store.getters.environment; },
            githuburl() {
                return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`;
            },
        },

        methods: {
            login() {
                window.location.href = this.githuburl;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .home {
        margin-top: -60px;
        height: calc(100vh - 60px);
        background: url('/static/img/bg-home.jpg') no-repeat top center;
        background-size: cover;
        overflow: auto;
        padding: 40px $gp * 2 $gp * 2;

        @media($xs) {
            background-repeat: repeat-y;
        }
    }

    .hero {
        background: rgba(127, 79, 141, .9);
        text-align: center;
        padding: $gp * 3 0;
        margin: $gp * 4 0 0;
        color: $color-white;

        @media($xs) {
            margin-top: $gp * 2;
        }

        h2 {
            margin: 0;
        }
    }

    .features, .hero {
        max-width: 600px;
    }

    .feature {
        background: rgba(255, 255, 255, 0.95);
        padding: 0 $gp;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 200px;

        h3, p {
            padding: 0;
            margin: 0;
        }

        p {
            font-size: 14px;
        }

        &.settings { color: #3FB8AF; }
        &.packages { color: #7F4F8D; }
        &.scripts { color: #FF6E3A; }
        &.snippets { color: #FF9E9D; }
        &.keymaps { color: #FF3D7F; }
        &.styles { color: #692139; }

        &.title {
            padding: 0;
            text-align: center;
            height: auto;
            @media($xs) {
                // height: 40px;
            }
            h3 {
                color: #7F4F8D;
                margin: $gp * 2 0;
                width: 100%;
            }
        }
    }
</style>
