<template>
    <div>
        <h1>vuex</h1>
    </div>
</template>

<script>
export default {
    mounted(){
        console.log(this.$store.state.count);
    }
    
}
</script>