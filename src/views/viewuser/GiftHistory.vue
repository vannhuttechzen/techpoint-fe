<template>
  <div class="absolute -ml-4 flex justify-start px-8 py-4">
    <svg class="w-8 h-8 p-1 stroke-[4] cursor-pointer rounded-full ring-2 hover:scale-125 transition-all" fill="none"
         stroke="currentColor" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg"
         @click="this.$router.push('/')">
      <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="font-special">
    <div class="flex items-center justify-center absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="ml-4 flex items-end justify-center">
        <img alt="" class="w-20 aspect-square"
             src="https://www.eovietnam.com/wp-content/uploads/2020/11/h%E1%BB%99p-qu%C3%A0.png">
        <div class="text-5xl text-center">
          <span class="outlined-text text-pending">LỊCH SỬ ĐỔI QUÀ</span>
        </div>
        <img alt="" class="w-20 aspect-square"
             src="https://www.eovietnam.com/wp-content/uploads/2020/11/h%E1%BB%99p-qu%C3%A0.png">
      </div>
    </div>
    <div v-if="token" class="fixed top-0 right-0 mt-5 pr-4">
      <div class="right-align">
        <SelfProfileCard/>
      </div>
    </div>
    <div class="flex h-full">
      <div class="w-full p-10 pt-36">
        <div class="mt-10">
          <div class="absolute flex justify-end mt-2 right-0 pr-44">
            <input id="search" v-model="searchGiftName"
                   class="border-2 border-green-700 w-96 pl-10 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                   placeholder="Nhập tên món quà cần tìm" type="text"
                   @input="handleNameInput"
            />
            <div class="absolute top-0 left-0 inline-flex items-center p-2 -mt-9 -ml-14">
              <img alt="" class="w-20 aspect-square" src="/src/assets/images/13.png">
            </div>
          </div>
          <div class="h-16">
          </div>
          <div v-if="!hasGiftExchange" class="text-lg font-bold text-green-800">
            Bạn chưa đổi quà lần nào! Click vào đổi quà để được đổi quà nhé!
          </div>
          <div class="flex">
            <div v-if="myGiftExchange.length === 0 && hasGiftExchange" class="w-full h-full flex justify-center items-center">
              <div class="text-lg font-bold text-green-800">
                Không có data!
              </div>
            </div>
            <div class="w-full p-8 grid xl:grid-cols-3 lg:grid-cols-2 gap-16 overflow-y-scroll h-[70vh] scroll-view">
              <div v-for="(item, key) in myGiftExchange" :key="key" class="intro-y box card-gift"
                   :class="{'xl:h-[45vh]': myGiftExchange.length <= 3}">
                <div class="p-5">
                  <div class="h-40 2xl:h-56 image-fit">
                    <img alt="Midone Tailwind HTML Admin Template" class="rounded-md" :src="item?.gift?.img"/>
                  </div>
                  <p class="block font-medium text-2xl mt-5 text-center text-orange-800">{{ item?.gift?.name }}</p>
                </div>
                <div class="flex items-center px-5 py-3 border-t border-slate-200/60 dark:border-darkmode-400">
                  <p class="font-medium text-center">Những người đổi gần đây:</p>
                  <div class="intro-x flex ml-2">
                    <div class="intro-x w-8 h-8 image-fit" v-if="item.userRecentExchange"
                         v-for="(ele, key) in item.usersRecentExchange" :key="key">
                      <Tippy tag="img" alt="Midone Tailwind HTML Admin Template"
                             class="rounded-full border border-white zoom-in" :src="ele.avatarUrl"
                             :content="ele.name"/>
                    </div>
                  </div>
                  <Tippy v-if="item.status === 0" tag="a" @click="openModalConfirm(item, 3)"
                         class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white ml-auto cursor-pointer"
                         content="Hủy đổi quà">
                    <TrashIcon class="w-4 h-4"/>
                  </Tippy>
                  <Tippy v-if="item.status === 1" tag="a" @click="openModalConfirm(item, 2)"
                         class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white ml-auto cursor-pointer"
                         content="Xác nhận đã nhận quà">
                    <GiftIcon class="w-4 h-4"/>
                  </Tippy>
                  <Tippy v-if="item.status === 2" tag="a"
                         class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-success text-white ml-auto"
                         content="Đã nhận">
                    <CheckIcon class="w-5 h-5"/>
                  </Tippy>
                  <Tippy v-if="item.status === 3" tag="a"
                         class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-danger text-white ml-auto"
                         content="Đã hủy">
                    <XIcon class="w-5 h-5"/>
                  </Tippy>
                </div>
                <div class="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
                  <div class="w-full flex text-slate-500 text-xs sm:text-sm">
                    <div class="mr-2">
                      Số lượng: <span class="font-medium">{{ item.amount }}</span>
                    </div>
                    <div class="mr-2">
                      Số điểm: <span class="font-medium">{{ item.pointUsed }}</span>
                    </div>
                    <div class="ml-auto">
                      Ngày đổi quà: <span class="font-medium">{{ dateFormatted(item.createAt.slice(0, 10)) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalConfirmMe :is-open="isModalConfirmOpen" :on-close="closeModalConfirm" :data-detail="dataDetail"
                  :status="status"/>
</template>

<script>
import GiftPage from "@/views/viewuser/gift-page/GiftPage.vue";
import SelfProfileCard from "@/components/user-landing-page/SelfProfileCard.vue";
import {getToken} from "@/utils/localStorageUtils";
import FilterByScore from "@/views/viewuser/gift-page/FilterByScore.vue";
import {mapGetters} from "vuex";
import GiftsExchange from "@/api/GiftsExchange";
import ModalConfirmMe from "@/components/user-landing-page/gift-history/AcceptModal.vue";
import moment from "moment";

export default {
  name: "Main",
  components: {ModalConfirmMe, FilterByScore, SelfProfileCard, GiftPage},
  data() {
    return {
      searchTerm: "",
      searchPoint: 0,
      checkLogin: false,
      token: getToken(),
      myGiftExchange: {},
      isModalConfirmOpen: false,
      dataDetail: {},
      status: null,
      searchGiftName: "",
      hasGiftExchange: false
    }
  },
  beforeDestroy() {
    document.body.classList.remove('page-home')
  },
  created() {
    this.init()
  },
  methods: {
    updateMinValue(totalOfPoint) {
      this.maxValue = totalOfPoint;
    },
    async init() {
      const res = await GiftsExchange.giftExchangeHistoryMe(this.uid)
      this.myGiftExchange = res.data.data
      this.$store.dispatch("point/fetchSelfPointInfo")
      if (this.myGiftExchange.length === 0) {
        this.hasGiftExchange = false;
      } else {
        this.hasGiftExchange = true;
      }
    },
    openModalConfirm(item, status) {
      this.isModalConfirmOpen = true
      this.dataDetail = item
      this.status = status
    },
    closeModalConfirm() {
      this.isModalConfirmOpen = false
      this.init()
    },
    dateFormatted(date) {
      return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
    },
    renderListHistory() {
      if (this.searchGiftName == "") {
        return this.init()
      } else {
        this.myGiftExchange = this.myGiftExchange.filter(gift => {
          return gift?.gift?.name.toLowerCase().includes(this.searchGiftName.trim().toLowerCase())
        })
      }
    },
    handleNameInput() {
      this.renderListHistory()
    }
  },
  computed: {
    ...mapGetters({
      giftList: "gifts/getList"
    }),
    ...mapGetters('auth', ['uid'])
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
    height: 100%;
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

.card-gift {
    background-image: url("src/assets/images/fire-work.gif");
}
</style>
