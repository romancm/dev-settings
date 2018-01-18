<template lang="html">
    <div class="profile-home">
        <h2>{{user.user}}</h2>
        <main>
            <section v-if="user.profile.jobTitle.length > 0">
                <h3>Fields of expertise</h3>
                <span v-for="{value, label} in jobTitles">
                    <el-tag type="info" v-if="user.profile.jobTitle.includes(value)">
                        <i :class="'devicon-'+value+'-plain colored'"></i>
                        {{label}}
                    </el-tag>
                </span>
            </section>

            <section v-if="user.profile.languages.length > 0">
                <h3>Skill set</h3>
                <span v-for="{value, label} in languages">
                    <el-tag type="info" v-if="user.profile.languages.includes(value)">
                        <i :class="'devicon-'+value+'-plain colored'"></i>
                        {{label}}
                    </el-tag>
                </span>
            </section>

            <section class="features">
                <el-row :gutter="0">
                    <el-col :lg="4" :md="8" :sm="8" :xs="8" v-for="({ icon, routeName }, name) in features" :key="name">
                        <div :class="name" class="feature" @click="goToSection(routeName)">
                            <i class="fa" :class="icon" aria-hidden="true"></i>
                            <h3 v-html="name" />
                        </div>
                    </el-col>
                </el-row>
            </section>
        </main>
    </div>
</template>

<script>
    import { store } from '@/store';
    import { JOB_TITLES, LANGUAGES_FRAMEWORKS } from '@/shared';

    export default {
        computed: {
            user() { return store.getters.userCache[this.id]; },
            id() { return this.$route.params.id; },
            gistData() { return store.getters.gistCache[this.id]; },
            jobTitles() { return JOB_TITLES; },
            languages() { return LANGUAGES_FRAMEWORKS; },
        },

        data() {
            return {
                features: {
                    packages: {
                        icon: 'fa-archive',
                        routeName: 'packages',
                    },
                    scripts: {
                        icon: 'fa-terminal',
                        routeName: 'init-script',
                    },
                    settings: {
                        icon: 'fa-cogs',
                        routeName: 'settings',
                    },
                    keymaps: {
                        icon: 'fa-keyboard-o',
                        routeName: 'keymaps',
                    },
                    snippets: {
                        icon: 'fa-code',
                        routeName: 'snippets',
                    },
                    styles: {
                        icon: 'fa-css3',
                        routeName: 'styles',
                    },
                },
            };
        },

        methods: {
            goToSection(name) {
                // console.log(name);
                this.$router.push({ path: `/profile/${this.$route.params.id}/${name}` });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/variables";

    .profile-home {
        position: relative;
        font-size: 12px;
        height: calc(100vh - 100px);
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.2) !important;
        // background: #cfc;
        padding: $gp * 2;
        width: 100%;

        h2, h3 {
            margin: 0 0 $gp;
        }

        main {
            background: $color-white;

            > section {
                padding: $gp;
                &:not(:first-child) {
                    border-top: 1px dashed $color-base-border;
                }

                .el-tag {
                    margin: 0 $gp $gp 0;
                }
            }
        }


            .features {
                background: rgba(255, 255, 255, 0.95);
                padding: $gp;

                .feature {
                    cursor: pointer;
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
    }

</style>
