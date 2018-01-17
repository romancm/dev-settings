<template>
    <div class="settings-page">
        <main>
            <h4>Settings / {{sectionName}}</h4>
            <router-view />
        </main>
    </div>
</template>

<script>
import { store } from '@/store';
import UserCard from '../Profile/UserCard';

export default {
    components: {
        UserCard,
    },

    data() {
        return {
            activeName: '',
        };
    },

    mounted() {
        this.activeName = this.$route.name;
    },

    methods: {
        isCurrentRoute(route) {
            return route === this.$route.name;
        },

        isMissingGist(name) {
            return name === 'settingsGithub' && !this.user.gistId;
        },

        select(routeName) {
            this.$router.push({ name: routeName });
        },
    },

    computed: {
        sectionName() {
            return this.$route.meta.subRouteTitle;
        },
        user() { return store.getters.session.user; },
        isMobile() {
            return this.$mq.resize && this.$mq.below(768);
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";


    .settings-page {
        display: flex;

        aside {
            display: flex;
            flex-direction: column;
            background: $color-white;
            height: calc(100vh - 60px);

            .el-menu {
                border-right: none;
                .el-menu-item, .el-submenu {
                    text-align: center;

                    i {
                        font-size: $menu-icon-size;
                    }
                }
            }
        }

        main {
            background: rgba(255, 255, 255, 0.7);
            width: 100%;
            padding: 0 $gp * 2;
            // height: calc(100vh - 60px);
            overflow: auto;
            // border-left: 1px solid $color-base-border;
        }
    }
</style>
