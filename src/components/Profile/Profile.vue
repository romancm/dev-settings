// deprecated
<template lang="html">
    <div class="profile row" v-if="userData && gistData">
        <div class="profile-card">
            <div class="info">
                <img :src="userData.avatar" :alt="userData.user" class="avatar">
                <h2>{{userData.user}}</h2>
                <!-- <i class="fa fa-map-marker" aria-hidden="true"></i> -->

                <!-- {{userData.profile.location}} -->
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="packages" label="Packages"></el-tab-pane>
                <el-tab-pane name="init-script" label="Init Script"></el-tab-pane>
                <el-tab-pane name="keymaps" label="Keymaps"></el-tab-pane>
                <el-tab-pane name="settings" label="Settings"></el-tab-pane>
                <el-tab-pane name="snippets" label="Snippets"></el-tab-pane>
                <el-tab-pane name="styles" label="Styles"></el-tab-pane>
            </el-tabs>
        </div>
        <el-container>
            <el-main>
                <router-view :gist-data="gistData" :user-data="userData"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import moment from 'moment';
import Avatar from '@/components/Avatar/Avatar';

export default {
    components: {
        Avatar,
    },

    data() {
        return {
            activeName: '',
            sections: [
                {
                    title: 'Packages',
                    routeName: 'packages',
                    tab: 'Packages',
                    icon: 'fa-archive',
                },
                {
                    title: 'Init Script',
                    routeName: 'init-script',
                    tab: 'Init Script',
                    icon: 'fa-terminal',
                },
                {
                    title: 'Keymaps',
                    routeName: 'keymaps',
                    tab: 'Keymaps',
                    icon: 'fa-keyboard-o',
                },
                {
                    title: 'Settings',
                    routeName: 'settings',
                    tab: 'Settings',
                    icon: 'fa-cog',
                },
                {
                    title: 'Snippets',
                    routeName: 'snippets',
                    tab: 'Snippets',
                    icon: 'fa-file-code-o',
                },
                {
                    title: 'Styles',
                    routeName: 'styles',
                    tab: 'Styles',
                    icon: 'fa-css3',
                },
            ],
        };
    },

    mounted() {
        this.activeName = this.$route.path.split(`${this.$route.params.id}/`)[1];
    },

    props: {
        gistData: Object,
        userData: Object,
        showBreadcrumb: Boolean,
    },

    methods: {
        handleClick({ name }) {
            this.$router.push({ path: `/browse/${this.$route.params.id}/${name}` });
        },

        moment() {
            return moment();
        },

        getUrl(section) {
            return `/browse/${this.userData.user}/${section}`;
        },

        isCurrentRoute(route) {
            return route === this.$route.name;
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";
    .profile {
        .profile-card {
            display: flex;
            @media($xs) {
                flex-direction: column;
            }
            padding: 0;
            margin: $gp * 2;

            .info {
                padding-right: $gp * 2;
                display: flex;

                @media($xs) {
                    padding-right: 0;
                    background: $color-white;
                    border-bottom: 1px solid #ccc;
                    align-items: center;
                }

                h2 {
                    line-height: 1.5em;
                    margin: 0;
                }
                .avatar {
                    margin-right: $gp;
                    width: 50px;
                    height: 50px;
                }
            }
        }

        .el-tabs__header {
            margin-bottom: 0;
        }
        .el-main {
            margin-top: 0;
            padding-top: 0;
        }
    }
</style>
