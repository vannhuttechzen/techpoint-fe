<template>
  <div class="-mt-10">
    <div class="absolute flex justify-end -mt-2 right-0 pr-60">
      <input
          id="search"
          v-model="searchTerm"
          class="border-2 border-green-700 w-96 pl-10 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Nhập tên món quà cần tìm"
          type="text"
          @input="handleNameInput"
      />
      <div class="absolute top-0 left-0 inline-flex items-center p-2 -mt-9 -ml-14">
        <img alt="" class="w-20 aspect-square" src="../../../assets/images/13.png">
      </div>
    </div>

    <div class="bg-gray-200 h-16">
      <div class="flex">
        <img class="-mt-20 w-36 mr-32 ml-16 cursor-pointer transition-transform transform hover:scale-110"
             src="/src/assets/images/news.gif"/>
        <img class="-mt-20 w-36 cursor-pointer transition-transform transform hover:scale-110"
             src="/src/assets/images/hot.gif"/>
      </div>
    </div>
    <div class="flex h-full">
      <div v-if="listGift.length === 0" class="w-full h-full flex justify-center items-center">
        <div class="text-lg font-bold">Không có data!</div>
      </div>
      <GiftBoard v-else :gift-list="listGift" />
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import GiftBoard from "@/components/user-landing-page/gift-page/GiftBoard.vue";

export default {
  name: "GiftPage",
  components: {GiftBoard},
  data() {
    return {
      searchTerm: "",
      searchPoint: [],
      flagSearch: 1,
      listGift: []
    }
  },
  created() {
    this.$store.dispatch("gifts/fetchGifts")
    this.$store.dispatch("point/fetchSelfPointInfo")
    this.listGift = this.giftList
  },
  watch: {
    getSearchByPoint(value) {
      if (value != null) {
        let foundElement = -1
        if (this.searchPoint > 0 || typeof value == "object") {
          foundElement = this.searchPoint.findIndex(element => element === value.point)
        } else if (this.searchPoint > 0 || typeof value != "object") {
          foundElement = this.searchPoint.findIndex(element => element === value)
        }
        if (foundElement != -1) {
          this.searchPoint.splice(foundElement, 1)
        } else {
          foundElement = this.searchPoint.findIndex(element => element === value)
          if (foundElement == -1 && typeof value != "object") {
            this.searchPoint.push(value)
          } else if (foundElement == -1 && typeof value == "object") {
            this.searchPoint.push(value.point)
          } else {
            this.searchPoint.splice(foundElement, 1)
          }
        }
        this.renderList()
      }
    },
    getDeletePoint(value) {
      this.searchPoint = this.searchPoint.filter(item => item !== value[0])
      this.renderList()
      this.flagSearch = 2
    }
  },
  methods: {
    ...mapActions("filterPoint", ["updatePointSelected"]),
    renderList() {
      if (this.searchPoint.length > 0 && this.searchTerm !== "") {
        this.listGift = this.giftList.filter(gift => {
          return this.searchPoint.includes(gift.point) && gift.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        })
      } else if (this.searchPoint.length > 0) {
        this.listGift = this.giftList.filter(gift => {
          return this.searchPoint.includes(gift.point)
        })
      } else if (this.searchTerm !== "") {
        this.listGift = this.giftList.filter(gift => {
          return gift.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())
        })
      } else {
        this.listGift = this.giftList
      }
    },
    handleNameInput() {
      this.renderList()
    }
  },

  computed: {
    ...mapGetters({
      top10: "point/getTop10"
    }),
    gifts() {
      return this.gifts
    },
    ...mapGetters({
      giftList: "gifts/getList"
    }),
    ...mapGetters('filterPoint', ['getSearchByPoint', "getDeletePoint"])
  },
  mounted() {
    document.body.classList.remove("login")
  }
}
</script>

<style scoped>
input:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 2px #63b3ed;
}
</style>
