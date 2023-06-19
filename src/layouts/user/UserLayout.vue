<template>
        <router-view/>
</template>

<script>
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";

export default {
  name: "UserLayout",
  components: {DarkModeSwitcher}
}
</script>

<style scoped>

</style>