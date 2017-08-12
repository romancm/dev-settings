<template>
    <div class="row">
        <div class="col-xs-12">
            <h2 class="text-center text-muted">
                <i class="fa fa-spinner fa-spin-fast" aria-hidden="true"></i>
                Logging out
            </h2>
        </div>
    </div>
</template>
<script>

export default {
    mounted() {
        this.logout();
    },

    methods: {
        logout() {
            // This should be a mutation, remove view, not necessary.
            localStorage.removeItem('vuex');
            setTimeout(() => {
                this.$router.push({ path: 'login' });
            }, 1000);
        },
    },
};
</script>
