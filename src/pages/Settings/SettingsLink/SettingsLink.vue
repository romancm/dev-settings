<template lang="html">
    <div class="settings-profile">
        <router-link to="/settings/link/atom">
            <img src="static/logos/atom.svg" width="40">
        </router-link>
        <router-link to="/settings/link/code">
            <img src="static/logos/code.svg" width="40">
        </router-link>
        <router-view />
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';
import GistSelect from './GistSelect';

export default {
    components: {
        VueMarkdown,
        GistSelect,
    },

    data() {
        return {
            instructions: null,
            active: 0,
            showGistSelect: false,
            loading: false,
            loadingGists: false,
            showInst: false,
        };
    },

    mounted() {
        if (this.editor && this.editor === 'atom') {
            this.$router.push({ name: 'atom' });
        }

        if (this.editor && this.editor === 'code') {
            this.$router.push({ name: 'code' });
        }

        this.getSyncReadme();
        this.active = this.session.user.gistId ? 0 : 0;
        this.showInst = Boolean(!this.session.user.gistId);
    },

    computed: {
        session() { return store.getters.session; },
        editor() { return store.getters.editor; },
    },

    methods: {
        next() {
            this.active += 1;

            if (this.active > 3) {
                this.active = 0;
            }
        },

        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },

        editSelection() {
            this.showGistSelect = true;
        },
    },
};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "~styles/variables";

    .settings-profile {
        .videoWrapper {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 */
            padding-top: 25px;
            height: 0;
        }
        .videoWrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        // .success {
        //     text-align: center;
        //     h1 {
        //         color: $color-success;
        //         i {
        //             font-size: 100px;
        //         }
        //     }
        //     p {
        //         font-size: 12px;
        //     }
        //     .edit {
        //         text-align: left;
        //     }
        // }
        // .el-steps {
        //     margin: 0 auto;
        //
        //     @media($lg) {
        //         width: 600px;
        //
        //     }
        //
        //     .el-step__icon {
        //         border-color: $color-primary !important;
        //         font-size: 12px !important;
        //         color: $color-primary;
        //
        //     }
        //     .el-step__head.is-success {
        //         .el-step__icon {
        //
        //             border-color: $color-success !important;
        //             color: $color-white !important;
        //             background: $color-success;
        //
        //         }
        //     }
        // }

        // .instructions {
        //     text-align: center;
        //
        //     .command {
        //         background: $color-white;
        //         color: $color-primary;
        //         border: 1px solid $color-base-border;
        //         border-radius: 5px;
        //         padding: 3px 5px;
        //         display: inline;
        //     }
        //
        //     .readme {
        //         text-align: left;
        //         font-size: 12px;
        //         background: #ccc;
        //         padding: $gp;
        //         background: #fff;
        //         border: 1px solid $color-base-border;
        //         border-radius: $border-radius;
        //         margin-bottom: $gp * 2;
        //     }
        //
        //     ol {
        //         text-align: justify;
        //         font-size: 12px;
        //         width: 300px;
        //     }
        // }
    }
</style>
