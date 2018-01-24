<template lang="html">
    <el-dialog title="Please select an editor" :visible="true" width="30%" center :show-close="false">
        <span>You can always switch from the menu</span>
        <span slot="footer" class="dialog-footer">
            <el-button-group>
                <el-button @click="selectEditor('atom')" class="atom">
                    <img src="static/logos/atom.svg" height="30">
                </el-button>
                <el-button @click="selectEditor('code')" class="code">
                    <img src="static/logos/code.svg" height="30">
                </el-button>
            </el-button-group>
        </span>
    </el-dialog>
</template>

<script>
import { store } from '@/store';

export default {
    methods: {
        selectEditor(editor) {
            store.commit('setEditor', editor);
        },
    },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "~styles/_variables";
    .atom {
        background: $color-atom-primary;
    }

    .code {
        background: $color-vscode-primary;
    }
</style>
