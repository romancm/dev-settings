<template>
    <div class="home">
        <div class="hero">
            <div class="welcome-note">
                <h2>Welcome home, developers</h2>
                <p>From software architects to hobbyist, share and discover settings, workspaces, packages and more.</p>
                <el-button type="primary" v-if="!session.token" @click="login">
                    <i class="fa fa-github" aria-hidden="true" />
                    Login with Github
                </el-button>
                <el-button type="primary" v-else @click="browse">
                    <i class="fa fa-search" aria-hidden="true" />
                    Browse
                </el-button>
            </div>

            <div class="features">
                <el-row :gutter="0">
                    <el-col :lg="8" :md="12" :sm="12" :xs="12" v-for="({ icon, desc }, name) in features" :key="name">
                        <div :class="name" class="feature">
                            <i class="fa" :class="icon" aria-hidden="true"></i>
                            <div>
                                <h3 v-html="name" />
                                <p v-html="desc" />
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
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

        data() {
            return {
                features: {
                    settings: {
                        icon: 'fa-cogs',
                        desc: 'Font settings, tab size, scroll speed and more.',
                    },
                    packages: {
                        icon: 'fa-archive',
                        desc: 'Make Atom do amazing things with packages.',
                    },
                    scripts: {
                        icon: 'fa-terminal',
                        desc: 'Discover and share your favorite flavor of Atom.',
                    },
                    keymaps: {
                        icon: 'fa-keyboard-o',
                        desc: 'Associate keystrokes with events in specific contexts.',
                    },
                    snippets: {
                        icon: 'fa-code',
                        desc: 'Incredibly powerful way to quickly generate commonly needed code syntax from a shortcut.',
                    },
                    styles: {
                        icon: 'fa-css3',
                        desc: 'Add your own CSS or LESS to fully customize Atom',
                    },
                },
            };
        },

        computed: {
            session() { return store.getters.session; },
            environment() { return store.getters.environment; },
            isMobile() { return this.$mq.resize && this.$mq.below(768); },
            buttonSize() { return this.isMobile ? 'small' : ''; },
            githuburl() { return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${this.environment.githubClientId}`; },
        },

        methods: {
            login() {
                window.location.href = this.githuburl;
            },
            browse() {
                this.$router.push('browse');
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .home {
        margin-top: -60px;
        height: 100vh;
        background: url('/static/img/bg-home.jpg') no-repeat top center;
        background-size: cover;
        display: flex;
        align-items: center;
    }

    @media($mobile-landscape) {
        .home {
            height: auto;
            padding-top: 40px;
        }
    }

    .hero {
        max-width: 600px;
        margin-left: $gp * 2;

        @media($xs) {
            margin: $gp * 2;
            // padding-top: 60px;
        }

        @media($sm) {
            margin: $gp * 2;
            max-width: 100%;
        }

        h3, h2 {
            margin: 0;
        }
    }

    .welcome-note {
        background: rgba(127, 79, 141, .9);
        text-align: center;
        padding: $gp * 3 0;
        color: $color-white;

        @media($short) {
            padding: $gp * 2 0;
        }

        @media($xs) {
            padding: $gp;

            h2 { font-size: 18px; }
            p { font-size: 13px; }
        }

        @media($md) {
            padding: $gp * 2;
        }
    }

    .features {
        background: rgba(255, 255, 255, 0.95);
        padding: $gp;

        .feature {
            padding: $gp $gp * 2;
            text-align: center;

            @media($xs) {
                padding: $gp $gp 0;
            }

            @media($md) {
                display: flex;
                text-align: left;
            }

            i {
                margin-bottom: $gp;
                font-size: 60px;
                @media($short) {
                    font-size: 44px;
                }

                @media($xs) {
                    margin-right: $gp;
                }

                @media($md) {
                    margin-right: $gp * 2;
                }
            }

            h3 {
                text-transform: capitalize;

                @media($xs) {
                    font-size: 15px;
                }
            }

            p {
                padding: 0;
                margin: 0;
                font-size: 14px;

                @media($xs) {
                    display: none;
                }
            }

            &.settings { color: $color-settings; }
            &.packages { color: $color-packages; }
            &.scripts { color: $color-scripts; }
            &.snippets { color: $color-snippets; }
            &.keymaps { color: $color-keymaps; }
            &.styles { color: $color-styles; }
        }
    }

</style>
