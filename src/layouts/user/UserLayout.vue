<template>
    <div class="h-full w-full relative rounded-lg bg-[url('../../assets/images/user-page-bg.jpg')] bg-cover">
        <div class="absolute inset-0 bg-black opacity-10"></div>
        <router-view/>
    </div>
<DarkModeSwitcher/>
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