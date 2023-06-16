<template>
<div class="text-danger text-[14px] text-center" :class="{hidden: this.hidden, [extendClass]: extendClass}">{{this.message}}</div>
</template>

<script>
export default {
    name: "Error",
    props: ["message", "hidden", "extendClass"]
}
</script>

<style scoped>

</style>