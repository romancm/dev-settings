<template lang="html">
    <div class="profile-menu">
        <el-menu :default-active="activeName" mode="horizontal" class="el-menu-vertical-demo" @select="handleMenuClick">
            <el-menu-item index class="avatar">
                <img :src="user.avatar" :alt="user.user">
                <!-- <span slot="title" v-if="!isMobile">{{user.user}}</span> -->
            </el-menu-item>

            <div v-if="editor === 'atom'">
                <el-menu-item index="packages">
                    <icon name="arrow-left" v-if="isPackageSelected" />
                    <icon name="archive" v-else />
                    <span slot="title" v-if="!isMobile">Packages</span>
                </el-menu-item>

                <el-menu-item index="init-script">
                    <icon name="terminal"/>
                    <span slot="title" v-if="!isMobile">Init Script</span>
                </el-menu-item>

                <el-menu-item index="keymaps">
                    <icon name="keyboard-o"/>
                    <span slot="title" v-if="!isMobile">Keymaps</span>
                </el-menu-item>

                <el-menu-item index="settings">
                    <icon name="cogs"/>
                    <span slot="title" v-if="!isMobile">Settings</span>
                </el-menu-item>

                <el-menu-item index="snippets">
                    <icon name="code"/>
                    <span slot="title" v-if="!isMobile">Snippets</span>
                </el-menu-item>

                <el-menu-item index="styles">
                    <icon name="css3"/>
                    <span slot="title" v-if="!isMobile">Styles</span>
                </el-menu-item>
            </div>

            <div v-if="editor === 'code'">
                <el-menu-item index="extensions">
                    <icon name="puzzle-piece"/>
                    <span slot="title" v-if="!isMobile">Extensions</span>
                </el-menu-item>

                <el-menu-item index="keybindings">
                    <icon name="keyboard-o"/>
                    <span slot="title" v-if="!isMobile">Keybindings</span>
                </el-menu-item>

                <el-menu-item index="settings">
                    <icon name="cogs"/>
                    <span slot="title" v-if="!isMobile">Settings</span>
                </el-menu-item>
            </div>

        </el-menu>
    </div>
</template>

<script>
import { store } from '@/store';

export default {
    data() {
        return {
            activeName: '',
            sections: ['packages', 'init-script', 'keymaps', 'settings', 'snippets', 'styles', 'extensions', 'keybindings'],
        };
    },

    computed: {
        editor() { return store.getters.editor; },
        environment() { return store.getters.environment; },
        atomData() { return store.getters.atomCache[this.id]; },
        codeData() { return store.getters.codeCache[this.id]; },
        id() { return this.$route.params.id; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        packages() { return this.atomData ? JSON.parse(this.atomData.files['packages.json'].content) : null; },
        extensions() { return this.codeData ? JSON.parse(this.codeData.files['extensions.json'].content) : null; },
        routeName() { return this.$route.name; },
        user() { return store.getters.userCache[this.id]; },
        isPackageSelected() { return this.$route.params.packageName; },
    },

    watch: {
        routeName() {
            this.activeName = this.routeName;
        },
    },

    methods: {
        // isCurrentRoute(route) {
        //     return route === this.$route.name;
        // },

        handleMenuClick(name) {
            if (this.sections.includes(name) || name === '') {
                this.$router.push({ path: `/${this.editor}/${this.$route.params.id}/${name}` });
            } else {
                console.log(`/${this.editor}/${this.$route.params.id}/packages/${name}`);
                this.$router.push({ path: `/${this.editor}/${this.$route.params.id}/packages/${name}` });
            }
        },
    },

};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";

    .avatar {
        padding: 0;
        // height: 64px;

        .el-tooltip  {
            padding: 0 !important;
        }

        img {
            cursor: pointer;
            max-width: 100%;
            height: 60px;
            width: 60px;
            display: flex;
        }
    }

    .profile-menu {
        .el-menu.el-menu--horizontal {
            border: none !important;
            .el-menu-item, .el-submenu {
                text-align: center;

                i {
                    font-size: $menu-icon-size;
                }
            }
            .el-submenu {
                .el-menu {
                    // display: block !important;
                    background: transparent;
                    margin-left: 0 !important;
                    border: 0 !important;
                    box-shadow: none !important;

                    .el-menu-item-group {
                        .el-menu-item-group__title {
                            background: #ccc;
                            height: 30px;
                            margin-top: 13px;
                            display: flex;
                            color: $color-white;
                            align-items: center;
                            font-size: 14px;
                            color: $color-primary-text;
                            padding: 0 $gp * 2 !important;
                        }

                        > ul {
                            height: calc(100vh - 300px);
                            overflow-y: auto;
                            // margin-top: $gp;
                            background: $color-white;
                            margin-left: $gp;

                            li {
                                height: auto;
                                text-align: left;
                                line-height: normal;
                                padding: $gp / 2 $gp !important;

                                font-size: 13px;
                                min-width: 200px;
                                color: $color-atom-primary;
                            }
                        }
                    }


                }
                &.is-active, &.is-opened {
                    .el-submenu__title i {
                        color: $color-primary;
                    }
                }
            }
        }
}
</style>
