<template lang="html">
    <el-container>
        <el-main>
            <el-row :gutter="20">
                <el-col :span="24">
                    <el-alert title="Welcome!" description="AtomSettings is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom" :closable="false" type="success" show-icon />
                </el-col>
                <el-col :span="24">
                    <el-alert title="Link Settings Gist" :closable="false" type="info" show-icon description="AtomSettings is an easy way to share your Atom settings with other developers, discover packages, themes, and everything related to customizing Atom">
                    </el-alert>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { store } from '@/store';
    import Avatar from '@/components/Avatar/Avatar';

    export default {
        components: {
            Avatar,
        },

        computed: {
            session() { return store.getters.session; },
        },

        methods: {
            linkGist() {
                this.$router.push({ name: 'settingsGithub' });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .alert {
        display: flex;
        align-items: center;

        .fa {
            margin: 0 15px;
        }
    }
</style>
