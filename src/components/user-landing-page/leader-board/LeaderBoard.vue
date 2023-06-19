<template>
  <div v-if="isDataEmpty" class="h-full w-full flex justify-center items-center bg-[#354259CC] rounded-xl p-8">
    <h3 class="text-white text-3xl font-bold">Không có dữ liệu!</h3>
  </div>
  <div v-else class="h-full w-full bg-[#354259CC] rounded-xl p-8">
      <div class="flex items-end justify-center mb-4">
          <img src="../../../assets/icons/party-popper.png" alt="" class="w-20 aspect-square">
          <div class="text-5xl text-center font-[800] text-white">LEADER BOARD</div>
          <img src="../../../assets/icons/party-popper.png" alt="" class="w-20 aspect-square">
      </div>
      <div class="font-bold text-3xl text-center text-white mb-20">{{title}}</div>
      <div class="flex h-48 w-3/4 m-auto">
          <div class="w-1/3 flex items-center justify-center">
              <OnTopAvatar :data="top2" profile-url="" />
          </div>
          <div class="w-1/3 flex justify-center">
              <OnTopAvatar :data="top1" profile-url="" />
          </div>
          <div class="w-1/3 flex items-center justify-center">
              <OnTopAvatar :data="top3" profile-url="" />
          </div>
      </div>
      <div class="flex flex-col mt-20 gap-4">
          <RankRow v-for="data in othersTop" :data="data" profile-url="" />
      </div>
  </div>
</template>

<script>
import OnTopAvatar from "@/components/user-landing-page/leader-board/OnTopAvatar.vue";
import RankRow from "@/components/user-landing-page/leader-board/RankRow.vue";

export default {
  name: "LeaderBoard",
  components: {RankRow, OnTopAvatar},
  props: ["title", "data"],
  mounted() {
    document.body.classList.remove('login')
    document.body.classList.remove('main')
    document.body.classList.remove('page-home')
    document.body.classList.add('background')
  },
  computed: {
    isDataEmpty() {
      return this.data.length === 0
    },
    top1() {
      return this.isDataEmpty ? null : this.data[0];
    },
    top2() {
      return this.isDataEmpty ? null : this.data[1];
    },
    top3() {
      return this.isDataEmpty ? null : this.data[2];
    },
    othersTop() {
      return this.isDataEmpty ? null : this.data.slice(3);
    }
  }
}
</script>

<style scoped>

</style>