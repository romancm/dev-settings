<template lang="html">
    <div class="profile row" v-if="userData && gistData">
        <div class="col-xs-12">
            <ol class="breadcrumb">
                <li>
                    <router-link :to="{ name: 'browse' }">
                        Browse
                    </router-link>
                </li>
                <li :class="{'active': !tabName}">
                    <router-link :to="{ name: 'user', params: { id: userData.user } }">
                        {{userData.user}}
                    </router-link>
                </li>
                <li class="active text-capitalize" v-if="tabName">
                    {{tabName}}
                </li>
            </ol>
        </div>

        <div class="col-xs-12 col-sm-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    <avatar :user-data="userData" size="md" public />
                    <h3>{{gistData.owner.login}}</h3>
                    <p>Last updated {{moment(gistData.lastUpdated).fromNow()}}</p>
                    <a :href="gistData.owner.html_url" class="btn btn-default" target="_blank">
                        Github Profile <i class="fa fa-external-link" aria-hidden="true"></i>
                    </a>
                </div>
            </div>

        </div>

        <div class="col-xs-12 col-sm-9 text-center">
            <div class="row">
                <div class="col-xs-6 col-sm-4 col-lg-4" v-for="{routeName, tab, title, icon} in sections" :key="routeName">
                    <div class="panel panel-default">
                        <router-link :to="getUrl(routeName)" :class="{ 'active': tabName === tab}">
                            <i class="fa fa-5x" :class="icon" aria-hidden="true"></i>
                            <br>
                            {{title}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="row">
                <router-view :gist-data="gistData" :user-data="userData"></router-view>
            </div>
        </div>
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
    .active {
        color: #c66;
    }
</style>
