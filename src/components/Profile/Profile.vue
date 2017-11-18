<template lang="html">
    <div class="profile row" v-if="userData && gistData">
        <el-container>
            <el-header height="auto">
                <el-card :body-style="{ padding: '0px' }">
                    <el-col :span="3" :xs="6">
                        <avatar :user-data="userData" public />
                    </el-col>
                    <el-col :span="21" :xs="18">
                        <h3>{{userData.user}}</h3>
                        <!-- <p>Last updated {{moment(gistData.lastUpdated).fromNow()}}</p> -->
                        <el-button size="mini">Github</el-button>
                        <!-- <a :href="gistData.owner.html_url" class="btn btn-default" target="_blank">
                            Github Profile <i class="fa fa-external-link" aria-hidden="true"></i>
                        </a> -->
                    </el-col>
                </el-card>
            </el-header>

            <el-main>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane name="packages" label="Packages"></el-tab-pane>
                    <el-tab-pane name="init-script" label="Init Script"></el-tab-pane>
                    <el-tab-pane name="keymaps" label="Keymaps"></el-tab-pane>
                    <el-tab-pane name="settings" label="Settings"></el-tab-pane>
                    <el-tab-pane name="snippets" label="Snippets"></el-tab-pane>
                    <el-tab-pane name="styles" label="Styles"></el-tab-pane>
                </el-tabs>

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

    computed: {
        tabName() {
            return this.$route.meta.tabName;
        },
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

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";
    .avatar {
        background: #cf0;
        margin: $gp;
    }

    .el-container {
        margin-top: -15px;
    }

</style>
