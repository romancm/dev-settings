<template lang="html">
    <el-container>
        <el-main>
            <el-aside>
                <h3>Filters</h3>
                <!-- <content-placeholders>
                    <content-placeholders-heading img />
                </content-placeholders> -->
            </el-aside>
            <p v-if="!users.length">No users</p>
            <el-row :gutter="15">
                <el-col :span="4" :xs="8" :sm="6" :md="4" :lg="3" v-for="user in users">
                    <el-card :body-style="cardStyle">
                        <router-link :to="{ name: 'user', params: { id: user.user } }">
                            <avatar :user-data="user" public />
                        </router-link>
                        <div class="card-content">
                            <h3>{{user.user}}</h3>
                            <div class="languages">
                                <i :class="'devicon-'+language+'-plain colored'" v-for="language in user.profile.languages"></i>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import msg from '@/msg';
    import Avatar from '@/components/Avatar/Avatar';
    import { store } from '@/store';

    export default {
        data() {
            return {
                currentDate: new Date(),
                cardStyle: {
                    padding: '0',
                },
            };
        },

        mounted() {
            this.load();
        },

        computed: {
            users() { return store.getters.users; },
            environment() { return store.getters.environment; },
        },

        components: {
            Avatar,
        },

        methods: {
            load() {
                // TODO: enhance this logic so endpoint isn't hit every time
                this.$http.get(`${this.environment.baseUrl}/browse/`)
                    .then(({ data }) => {
                        store.commit('updateBrowseData', data);
                    })
                    .catch(() => {
                        this.$toasted.error(msg.errors.browse);
                        console.log('boom');
                    });
            },

            url(id) {
                return `/browse/${id}/packages`;
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .el-aside {
        width: 100%;

        @media($md) {
            background: #cf0;
            width: 25%;
        }
        @media($lg) {
            width: 20%;
        }
    }
    // .profile-pic {
    //     width: 100%;
    // }
</style>
