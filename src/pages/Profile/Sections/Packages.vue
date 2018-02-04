<template lang="html">
    <div class="user-packages">
        <div class="package-list" v-if="!packageName">
            <el-button type="text" plain v-for="{ name } in packages" :key="name" @click="goToPackage(name)">
                <icon :name="getPackageIcon(name)" />
                {{name}}
            </el-button>
        </div>

        <div v-else>
            <div class="package-toolbar" :v-loading="!loading && packageData">
                <gh-btns-watch :slug="formattedRepository" :show-count="!isMobile"/>
                <gh-btns-star :slug="formattedRepository" :show-count="!isMobile"/>
                <gh-btns-fork :slug="formattedRepository" :show-count="!isMobile"/>
            </div>

            <vue-markdown :source="packageData.readme" v-if="packageData" />
        </div>
    </div>
</template>

<script>
import { store } from '@/store';
import VueMarkdown from 'vue-markdown';

export default {
    components: {
        VueMarkdown,
    },

    data() {
        return {
            packageData: null,
            loading: false,
            showPackageMenu: true,
        };
    },


    computed: {
        id() { return this.$route.params.id; },
        editor() { return store.getters.editor; },
        packageName() { return this.$route.params.packageName; },
        isMobile() { return this.$mq.resize && this.$mq.below(768); },
        atomData() { return store.getters.atomCache[this.id]; },
        gistData() { return store.getters.gistCache[this.id]; },
        packages() { return this.atomData ? JSON.parse(this.atomData.files['packages.json'].content) : null; }, // eslint-disable-line
        formattedRepository() { return !this.loading && this.packageData && this.packageData.repository ? this.packageData.repository.url.split('github.com/')[1] : 'atom/about'; }, // eslint-disable-line
        sections() { return Math.ceil(this.packages.length / 30); },
    },

    watch: {
        packageName() {
            this.loadPackage();
        },
    },

    mounted() {
        document.title = `${this.id} Packages | Atom Settings`;

        this.loadPackage();
    },

    methods: {
        getPackageIcon(name) {
            if (name.includes('language')) { return 'language'; }
            if (name.includes('theme')) { return 'paint-brush'; }
            if (name.includes('-ui')) { return 'paint-brush'; }
            if (name.includes('syntax')) { return 'code'; }

            return 'archive';
        },

        selectPackage(name) {
            this.showPackageMenu = false;

            const params = {
                ...this.$route.params,
                packageName: name,
            };

            this.$router.push({ name: 'package', params });
        },

        togglePackageMenu() {
            this.showPackageMenu = !this.showPackageMenu;
        },

        goToPackage(name) {
            this.$router.push({ path: `/atom/${this.$route.params.id}/packages/${name}` });
        },

        loadPackage() {
            if (this.packageName) {
                this.loading = true;
                this.$http.get(`https://www.atom.io/api/packages/${this.packageName}`)
                .then(({ data }) => {
                    this.loading = false;
                    this.packageData = data;
                })
                .catch(() => {
                    // TODO: handle error
                });
            } else {
                // this.selectPackage('about');
                this.packageData = null;
            }
        },
    },
};
</script>
