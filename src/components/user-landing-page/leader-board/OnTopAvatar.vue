<template>
<div class="h-full flex flex-col justify-center items-center relative cursor-pointer" @click="$router.push(profileUrl)">
    <div :class="{
            'text-yellow-300 text-4xl': isTop1,
            'text-2xl': !isTop1,
            'text-white': isTop2,
            'text-[#D1793B]': isTop3
          }"
         class="font-bold text-center mb-1"
    >
        Top {{ data.rank }}<sup>{{ this.$h.getOrdinalSuffix(data.rank) }}</sup>
    </div>
    <img v-if="isTop1" alt="" class="h-full" src="../../../assets/images/laurel.png"/>
    <img :class="{
              'absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-3/4': isTop1,
              'h-3/4 ring-amber-300': isTop1,
              'h-2/3 ring-white': isTop2,
              'h-1/2 ring-[#D1793B]': isTop3,
          }" :src="data.user.avatarUrl"
         alt=""
         class="aspect-square rounded-full object-cover ring-4"
    />
    <img v-if="isTop1" alt="" class="h-1/2 absolute top-[10%] right-0 rotate-[30deg]"
         src="../../../assets/images/cup.png">
    <div :class="{
            '-mt-2 text-yellow-300': isTop1,
            'mt-2': !isTop1,
            'text-white': isTop2,
            'text-[#D1793B]': isTop3
         }"
         class="text-2xl font-bold text-center">
        {{ data.user.name }}
    </div>
    <div class="flex justify-center">
        <svg class="w-6 h-6 fill-yellow-400 stroke-yellow-400"
             stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
        <div :class="{
                'text-yellow-300': isTop1,
                'text-white': isTop2,
                'text-[#D1793B]': isTop3
             }"
             class="text-xl font-bold ms-3"
        >
            {{ data.totalOfPoint }}
        </div>

    </div>
</div>
</template>

<script>

export default {
  name: "OnTopAvatar",
  props: ["data", "profileUrl"],
  computed: {
    isTop1() {
      return this.data.rank == 1
    },
    isTop2() {
      return this.data.rank == 2
    },
    isTop3() {
      return this.data.rank == 3
    }
  }
}
</script>

<style scoped>

</style>