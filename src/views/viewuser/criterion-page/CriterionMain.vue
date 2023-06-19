<template>
  <div :class="{'absolute -ml-4 flex justify-start px-8 py-4': token, 'absolute -ml-4 flex justify-start px-8 py-4 mt-3': !token}">
    <svg class="w-8 h-8 p-1 stroke-[4] cursor-pointer rounded-full ring-2 hover:scale-125 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
         @click="this.$router.push('/')">
      <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div>
    <div v-if="token" class="flex justify-end pt-44 pr-4">
      <div class="right-align">
        <div class="absolute top-6 right-6 z-10">
          <SelfProfileCard @filter-gifts="updateMinValue"/>
        </div>
      </div>
    </div>
    <div class="flex" v-if="activeGroup">
      <div class=" w-1/4 pl-6 pr-6 border-r-2 border-dashed border-primary">
        <img :class="{'-mt-44 w-96 h-44': token, ' w-96 h-44': !token}"
             src="/src/assets/images/tichdiem.gif"/>
        <GroupPanel :active-group="activeGroup"
                    :group-list="groupList"
                    :on-click-group-tab="clickGroupTab"
        />
      </div>
      <div :class="{'w-3/4 p-14 pb-0 -mt-28': token, 'w-3/4 p-14': !token}">
        <div class="absolute flex justify-end -mt-2 right-0 pr-56">
          <input
              id="search"
              v-model="searchTerm"
              class="border-2 border-green-700 w-96 pl-10 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Nhập từ khoá tìm kiếm"
              type="text"
          />
          <div class="absolute top-0 left-0 inline-flex items-center p-2 -mt-9 -ml-14">
            <img alt="" class="w-20 aspect-square" src="../../../assets/images/13.png">
          </div>
        </div>
        <CriteriaPanel :active-group="activeGroup" :data="filteredItems"/>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {getToken} from "@/utils/localStorageUtils";
import SelfProfileCard from "@/components/user-landing-page/SelfProfileCard.vue";
import GroupPanel from "@/components/user-landing-page/criterion-page/GroupPanel.vue";
import CriteriaPanel from "@/components/user-landing-page/criterion-page/CriteriaPanel.vue";

export default {
  name: "CriterionMain",
  components: {SelfProfileCard, GroupPanel, CriteriaPanel},
  data() {
    return {
      checkLogin: false,
      token: getToken(),
      activeGroup: null,
      isOpen: false,
      searchTerm: ""
    }
  },
  async created() {
    this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
    this.$store.dispatch("users/fetchUsers")
    this.$store.dispatch("point/fetchSelfPointInfo")
  },
  computed: {
    ...mapGetters({
      groupList: "criteriaGroup/getList"
    }),
    filteredItems() {
      const searchTerm = this.searchTerm.toLowerCase()
      return this.activeGroup.criteria.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm)
        const scoreMatch = item.point.toString().includes(searchTerm)
        return nameMatch || scoreMatch
      })
    }
  },
  watch: {
    groupList() {
      this.activeGroup = this.groupList[0]
    }
  },
  beforeDestroy() {
    document.body.classList.remove('page-home')
  },
  mounted() {
    document.body.classList.remove('login')
    document.body.classList.remove('main')
    document.body.classList.add('page-home')
  },
  methods: {
    updateMinValue(totalOfPoint) {
      this.maxValue = totalOfPoint
    },
    clickGroupTab(group) {
      this.activeGroup = group
    }
  }
}
</script>
<style scoped>
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
