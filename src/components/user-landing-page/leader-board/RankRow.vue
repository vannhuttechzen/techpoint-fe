<template>
<div class="flex items-center justify-between h-16 bg-white rounded-full intro-x cursor-pointer px-2 hover:scale-125" @click="$router.push(profileUrl)">
    <div class="flex justify-center items-center gap-2 w-[20%]">
        <div class="text-2xl font-bold">{{data.rank}}<sup>{{this.$h.getOrdinalSuffix((data.rank))}}</sup></div>
        <img alt=""
             class="h-12 w-12 rounded-full object-cover ring-2 ring-[#354259]"
             :src="data.user.avatarUrl"
        />
    </div>
    <div class="text-xl font-bold text-left grow truncate">{{ data.user.name }}</div>
    <div class="flex justify-center gap-1 w-[20%]">
        <svg class="w-6 h-6 fill-yellow-400 stroke-yellow-400"
             stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
        <div class="text-xl font-bold ms-3">{{ data.totalOfPoint }}</div>
    </div>
</div>
</template>

<script>
export default {
  name: "RankRow",
  props: ["data", "profileUrl"],
}
</script>

<style scoped>

</style>