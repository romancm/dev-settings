<template>
    <div class="hello">
        <h2>Welcome home, developers</h2>
        <p>AtomSettings is inspired by the way you work. From software architects to hobbyist, you can share and view atom settings, discover workspaces, and build software alongside millions of other developers.</p>

        <el-button type="success" plain>Login</el-button>
        or
        <el-button type="success" plain>Register</el-button>
        <!-- <h2>Succeed together.</h2> -->
        <!-- <p>Meet Evernote, your second brain. Capture, organize, and share notes from anywhere. Your best ideas are always with you and always in sync.</p> -->
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "~styles/_variables";
    .body {
        background: rgba(43, 49, 55, 0.8);
    }

    .hello {
        min-height: 80vh;
        // width: 50%;
        margin: 0 auto;

        padding: $gp;
        /*background: url('/static/img/home.jpg') no-repeat top center;*/
        /*background: url('/static/img/brick-2449728_1920.jpg') no-repeat top center;*/
        /*background: url('/static/img/cup-of-coffee-1280537.jpg') no-repeat top center;*/

    }
</style>
