<template lang="html">
    <el-dialog title="Please select an editor" :visible="true" width="30%" center>
        <span>You can always switch from the menu</span>
        <span slot="footer" class="dialog-footer">
            <el-button-group>
                <el-button type="info" plain @click="selectEditor('atom')">
                    <img src="static/img/atom.png" width="30">
                </el-button>
                <el-button type="info" plain @click="selectEditor('code')">
                    <img src="static/img/code.png" width="30">
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
</style>
