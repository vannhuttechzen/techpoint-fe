<template>
    <div :class="{'absolute -ml-4 flex justify-start px-8 py-4': token, 'absolute -ml-4 flex justify-start px-8 py-4 mt-3': !token}">
        <svg class="w-8 h-8 p-1 stroke-[4] cursor-pointer rounded-full ring-2 hover:scale-125 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
             @click="this.$router.push('/')">
            <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    <div class="font-special">
        <div v-if="token" class="flex justify-end pt-44 pr-4">
            <div class="right-align">
                <div class="absolute top-4 right-6 z-10">
                    <SelfProfileCard @filter-gifts="updateMinValue"/>
                </div>
            </div>
        </div>
        <div :class="{'flex h-full -mt-20': token, 'flex h-full': !token}">
            <div class="w-1/4 pl-14 pr-14 border-r-2 border-dashed border-primary">
                <ListLevel/>
            </div>
            <div class="w-3/4 p-14">
                <GiftPage/>
            </div>
        </div>
    </div>
</template>
<script>
import GiftPage from "@/views/viewuser/gift-page/GiftPage.vue";
import SelfProfileCard from "@/components/user-landing-page/SelfProfileCard.vue";
import {getToken} from "@/utils/localStorageUtils";
import ListLevel from "@/views/viewuser/gift-page/ListLevel.vue";
import FilterByScore from "@/views/viewuser/gift-page/FilterByScore.vue";
import {mapGetters} from "vuex";

export default {
  name: "Main",
  components: {FilterByScore, ListLevel, SelfProfileCard, GiftPage},
  data() {
    return {
      searchTerm: "",
      searchPoint: 0,
      checkLogin: false,
      token: getToken()
    }
  },
  beforeDestroy() {
    document.body.classList.remove('page-home')
  },
  methods: {
    updateMinValue(totalOfPoint) {
      this.maxValue = totalOfPoint;
    }
  },
  computed: {
    ...mapGetters({
      giftList: "gifts/getList"
    })
  },
  mounted() {
    document.body.classList.remove('login')
    document.body.classList.remove('main')
    document.body.classList.add('page-home')
  }
}
</script>

<style>
.background {
    height: 100%;
    width: 100%;
    background-color: #b2e7d3;
    background-position: center;
    background-size: cover;
}

.page-home {
    height: 100vh;
    width: 100%;
    background-color: #b2e7d3;
    background-position: center;
    background-size: cover;
}

.page-home {
    padding: 0 !important;
    margin: 0;
    box-sizing: border-box;
    background-color: #b2e7d3;
}
</style>