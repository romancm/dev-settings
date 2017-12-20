<template lang="html">
    <div>
        <h4>Select gist to share your settings </h4>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="6" :md="12" :lg="8" :xl="6" v-for="gist in gists" :key="gist.id">
                <el-card class="box-card" >
                    <h4>{{gist.description}}</h4>

                    <el-tag type="primary">
                        <strong>Gist Id:</strong> {{gist.id}}
                    </el-tag>

                    <el-tag type="info">
                        Created {{ moment(gist.created_at).format('MMM/DD/Y') }}
                    </el-tag>

                    <el-tag type="info">
                        Last Updated {{ moment(gist.updated_at).format('MMM/DD/Y') }}
                    </el-tag>

                    <hr>

                    <el-button type="success" plain size="small" v-if="gist.id === session.user.gistId">
                        <i class="fa fa-check" aria-hidden="true" />
                        Selected
                    </el-button>

                    <el-button type="success" plain size="small" @click="selectGist(gist.id)" v-else>
                        Select gist
                    </el-button>
                </el-card>
            </el-col>

            <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="6" v-if="session.user.gistId">
                <el-button type="danger" plain size="small" @click="selectGist(null)">
                    <i class="fa fa-remove" aria-hidden="true" />
                    Deselect gist
                </el-button>

                <br>
                <br>

                <el-alert
                type="info"
                title="test"
                description="Deselecting your gist will automatically remove you from browse results.">
            </el-alert>
            </el-col>
        </el-row>

        <el-alert
            title="Public Gists Warning"
            show-icon
            type="warning"
            :closable="false"
            description="If you use certain packages, storing auth-tokens, a malicious party could abuse them.">
        </el-alert>

        <!-- <i class="fa fa-check" aria-hidden="true"></i>
        All done! -->

        <p>{{filteredGists.length}} compatible settings gist found, {{gists.length}} gists found total.</p>


        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Not seeing your Gist?</h3>
            </div>
            <div class="panel-body">
                <p>We only display public gists, if your sync-settings gist is set to secret you may have to create a new public gist.</p>

                <a href="https://help.github.com/articles/about-gists/" class="btn btn-info" target="_blank">
                    Learn more about Gists
                    <i class="fa fa-external-link" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
