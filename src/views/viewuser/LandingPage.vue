<template>
  <div class="w-full h-full bg-cover bg-center">
      <div class="h-full mt-16 ">
        <div v-if="token" class="fixed top-0 right-0 mt-5 pr-4">
          <SelfProfileCard/>
        </div>
        <div v-else-if="!token" class="flex justify-end -mt-14 pr-4 cursor-pointer transition-transform transform origin-top-right hover:scale-110" @click="this.$router.push('/login')">
          <img class="pr-11 h-32 w-56 hover:scale-125" src="/src/assets/images/login.png" alt="Hình ảnh 1">
        </div>
        <div :class="{'flex -mt-16': token, 'flex -mt-36': !token}">
          <div class=" items-center relative cursor-pointer transition-transform transform hover:scale-125" @click="this.$router.push('/gift-user')"  >
            <img class="ml-52 h-44 w-72" src="/src/assets/images/hinh11.gif" alt="Hình ảnh 1">
          </div>
          <div class=" items-center relative cursor-pointer transition-transform transform hover:scale-125"
               @click="!token ? $router.push('/login') : $router.push('/user-criterion-page')">
            <img class="ml-52 h-44 w-72" src="/src/assets/images/hinh12.gif" alt="Hình ảnh 2">
          </div>
          <div class=" items-center relative cursor-pointer transition-transform transform hover:scale-125"
               @click="!token ? $router.push('/login') : $router.push('/gift-history')">
            <img class="ml-52 h-44 w-72" src="/src/assets/images/hinh13.gif" alt="Hình ảnh 3">
          </div>
        </div>
        <div class="pl-32 pr-32 mt-6 justify-center items-center">
          <LeaderBoard :data="top10" title="Top 10 có tổng điểm cao nhất tháng"/>
        </div>
    </div>
  </div>
</template>
<script>
import SelfProfileCard from "@/components/user-landing-page/SelfProfileCard.vue";
import LeaderBoard from "@/components/user-landing-page/leader-board/LeaderBoard.vue";
import {mapGetters} from "vuex";
import {getToken} from "@/utils/localStorageUtils";

export default {
  data() {
    return {
      checkLogin: false,
      token: getToken()
    }
  },
  name: "LandingPage",
  components: {LeaderBoard, SelfProfileCard},
  created() {
    this.$store.dispatch("point/fetchSelfPointInfo")
    this.$store.dispatch("point/fetchTop10")
  },
  computed: {
    ...mapGetters({
      top10: "point/getTop10"
    })
  },
  mounted() {
    document.body.classList.remove("login")
  }
}
</script>

<style scoped>
.fixed {
    position: fixed;
}
</style>