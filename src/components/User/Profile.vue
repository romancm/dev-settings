<template lang="html">
    <div class="profile row" v-if="userData && gistData">
        <div class="col-xs-12">
            <ol class="breadcrumb">
                <li>
                    <a href="/#/browse">Browse</a>
                </li>
                <li :class="{'active': !route}">
                    <a :href="`/#/browse/${userData._id}`">{{gistData.owner.login}}</a>
                </li>
                <li class="active text-capitalize" v-if="route">
                    {{route}}
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
                <div class="col-xs-6 col-sm-4 col-lg-4" v-for="{routeName, title, icon} in sections">
                    <div class="panel panel-default">
                        <router-link :to="getUrl(routeName)" :class="{ 'active': isCurrentRoute(routeName)}">
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
import Avatar from '../Avatar/Avatar';

// import { store } from '../../store';

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
                    icon: 'fa-archive',
                },
                {
                    title: 'Init Script',
                    routeName: 'init-script',
                    icon: 'fa-terminal',
                },
                {
                    title: 'Keymaps',
                    routeName: 'keymaps',
                    icon: 'fa-keyboard-o',
                },
                {
                    title: 'Settings',
                    routeName: 'settings',
                    icon: 'fa-cog',
                },
                {
                    title: 'Snippets',
                    routeName: 'snippets',
                    icon: 'fa-file-code-o',
                },
                {
                    title: 'Styles',
                    routeName: 'styles',
                    icon: 'fa-css3',
                },
            ],
        };
    },

    computed: {
        route() {
            return this.$route.name;
        },
    },

    props: {
        gistData: Object,
        userData: Object,
    },

    methods: {

        moment() {
            return moment();
        },

        getUrl(section) {
            return `/browse/${this.userData._id}/${section}`;
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
