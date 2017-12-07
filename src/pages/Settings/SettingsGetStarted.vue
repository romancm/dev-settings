<template lang="html">
    <div class="col-xs-12">
        <!-- <el-button style="margin-top: 12px;" @click="next">Next step</el-button>
        <el-steps align-center :active="active" finish-status="success">
            <el-step title="Install SyncSettings" />
            <el-step title="Processing" />
            <el-step title="Step 3" />
        </el-steps> -->


        <!-- <div v-if="active === 0">
            <h1>Install SyncSettings package</h1>
            <pre>apm install sync-settings or using the Install packages pane from Atom Settings.</pre>
            <div class="panel panel-default">
                <div class="panel-body">
                    <vue-markdown :source="instructions" v-if="instructions" />
                </div>
            </div>
        </div> -->

        <div class="panel panel-default">
            <div class="panel-body">
                <vue-markdown :source="instructions" v-if="instructions" />
            </div>
        </div>


        <!-- <h3>Hello, {{session.github.login}}!</h3> -->
        <!-- <p>AtomSettings helps developers around to world to share and discover settings for the hackable text editor for the 21st Century. In order to get started you need to install Sync Settings for Atom. Please refer to their readme for instructions on how to set it up. Once you are all set you can enter the gist id.</p> -->
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import { store } from '@/store';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            instructions: null,
            active: 0,
        };
    },

    mounted() {
        this.getSyncReadme();
    },

    computed: {
        session() { return store.getters.session; },
    },

    methods: {
        next() {
            this.active += 1;
            if (this.active > 2) {
                this.active = 0;
            }
        },

        getSyncReadme() {
            this.$http.get('https://www.atom.io/api/packages/sync-settings').then(({ data }) => {
                this.instructions = data.readme;
            });
        },
    },
};
</script>
