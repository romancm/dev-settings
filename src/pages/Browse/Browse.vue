<template lang="html">
    <el-container class="browse">
        <el-main>
            <editor-selector v-if="!editor" />

            <div v-else>
                <header>
                    <div class="header-options">
                        <el-pagination
                            v-if="users.totalPages > 1"
                            layout="prev, pager, next"
                            :page-size="users.pageSize"
                            :current-page.sync="currentPage"
                            :total="users.totalUserCount"
                        />

                        <div class="filters">
                            <el-select
                                v-model="selectedJobTitles"
                                filterable
                                placeholder="Filter by Job title"
                            >
                                <el-option
                                    v-for="item in jobTitles"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>

                            <el-select
                                v-model="selectedLanguages"
                                filterable
                                placeholder="Filter by language"
                            >
                                <el-option
                                    v-for="item in languages"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>
                </header>

                <div class="users" v-if="!loading">
                    <div class="user-list" v-if="users && users.results && users.results.length">
                        <div class="user-card" v-for="user in users.results" :key="user.user">
                            <router-link :to="{ name: 'profileAtom', params: { id: user.user } }" v-if="editor === 'atom'">
                                <img :src="user.avatar" alt="user.user">
                            </router-link>
                            <router-link :to="{ name: 'profileCode', params: { id: user.user } }" v-if="editor === 'code'">
                                <img :src="user.avatar" alt="user.user">
                            </router-link>
                        </div>
                    </div>

                    <div class="no-results" v-else>
                        <i class="fa fa-frown-o fa-5x" aria-hidden="true" />
                        <h3>No results were found for given criteria</h3>
                        <p>Please try selecting different filters</p>
                        <p>You can also <el-button size="mini" @click="clearFilters">Clear filters</el-button></p>
                    </div>
                </div>

                <div class="user-list" v-else>
                    <content-placeholders v-for="n in 12" :key="n">
                        <content-placeholders-img :lines="1" :img="true" />
                    </content-placeholders>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import msg from '@/msg';
    import { JOB_TITLES, LANGUAGES_FRAMEWORKS } from '@/shared';
    import Avatar from '@/components/Avatar/Avatar';
    import EditorSelector from '@/components/EditorSelector/EditorSelector';
    import { store } from '@/store';

    export default {
        components: {
            Avatar,
            EditorSelector,
        },

        data() {
            return {
                jobs: {},
                currentPage: 1,
                selectedJobTitles: [],
                selectedLanguages: [],
                loading: true,
                pageSize: 12,
            };
        },

        mounted() {
            this.load();
        },

        computed: {
            editor() { return store.getters.editor; },
            users() { return store.getters.users; },
            session() { return store.getters.session; },
            environment() { return store.getters.environment; },
            isMobile() { return this.$mq.resize && this.$mq.below(768); },
            jobTitles() { return JOB_TITLES; },
            languages() { return LANGUAGES_FRAMEWORKS; },
        },

        watch: {
            editor() {
                this.load();
            },

            currentPage() {
                this.load();
            },
            selectedJobTitles() {
                this.currentPage = 1;
                this.load();
            },
            selectedLanguages() {
                this.currentPage = 1;
                this.load();
            },
        },

        methods: {
            clearFilters() {
                this.selectedJobTitles = [];
                this.selectedLanguages = [];
            },

            load() {
                if (this.environment.baseUrl && this.editor) {
                    this.loading = true;
                    this.$http.get(`${this.environment.baseUrl}/browse/?page=${this.currentPage}&title=${this.selectedJobTitles}&languages=${this.selectedLanguages}&pageSize=${this.pageSize}&editor=${this.editor}`)
                        .then(({ data }) => {
                            store.commit('updateBrowseData', data);
                            this.loading = false;
                        })
                        .catch(() => {
                            this.$notify.error({
                                title: 'Error',
                                message: msg.errors.browse,
                            });
                        });
                }
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";

    .el-button img {
        // width: 300px;
    }

    header {
        display: flex;

        @media($xs) {
            flex-direction: column;
        }

        .header-options {
            display: flex;
            align-items: center;
            margin-left: auto;

            @media($md) {
                flex: 1;
                flex-direction: column-reverse;
                align-items: flex-end;
                .filters {
                    margin-bottom: $gp;
                }
            }

            @media($sm) {
                flex: 1;
                flex-direction: column-reverse;
                align-items: flex-end;
                .filters {
                    margin-bottom: $gp;
                }
            }

            @media($xs) {
                flex: 1;
                flex-direction: column-reverse;
                align-items: flex-start;
                margin-left: 0;
                margin-bottom: $gp * 2;
                .filters {
                    margin-bottom: $gp;
                }
            }

            .el-pagination {
                padding: 0;
            }

            .el-select {
                margin-left: $gp * 2;

                @media($xs) {
                    margin: 0 0 $gp;
                    // width: 100%;
                }
            }
        }
    }

    .user-list {
        display: grid;
        grid-gap: $gp * 2;

        @media($xs){ grid-template-columns: 1fr 1fr 1fr; }
        @media($sm){ grid-template-columns: 1fr 1fr 1fr 1fr; }
        @media($md){ grid-template-columns: 1fr 1fr 1fr 1fr 1fr; }
        @media($lg){ grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr; }

        .user-card {
            background: $color-white;
            display: flex;
            width: 100%;
            a {
                width: 100%;
            }
            img {
                background: $color-white;
                display: flex;
                width: 100%;
            }
        }
    }

    .no-results {
        text-align: center;
    }

    .vue-content-placeholders-img {
        width: 100%;
        height: 15vw;


        @media($sm) {
            width: 100%;
            height: 20vw;
        }

        @media($xs) {
            width: 100%;
            height: 30vw;
        }
    }
</style>
