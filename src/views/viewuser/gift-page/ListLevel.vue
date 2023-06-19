<template>
  <div class="relative">
    <img :class="{'-mt-28 w-96 h-44': token, 'w-96 h-44': !token}"
    src="/src/assets/images/point.gif"/>
  </div>
  <FilterByScore class="-mt-7"/>
  <div class="mt-10">
    <div class="relative">
      <div class="flex justify-center mt-4 absolute previous-next gap-52 z-10">
        <button :disabled="currentPagePrimary === 1"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md mr-2 transform -translate-x-1/2 cursor-pointer"
                @click="prevPagePrimary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"/>
          </svg>

        </button>
        <button :disabled="currentPagePrimary === totalPagePrimary"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md next-button transform -translate-x-1/2 "
                @click="nextPagePrimary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" StrokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
          </svg>
        </button>
      </div>
      <div class="relative">
        <Block :numbers="paginatedBlocksPrimary" title="Cấp độ tiểu học" @add-to-block="addElementToBlock" @remove-to-block="removeElementToBlock">
        <img class="w-32 h-20 absolute -mt-16 ml-60" src="/src/assets/images/student1.png"/>
        </Block>
      </div>
    </div>
    <div class="relative">
      <div class="flex justify-center mt-4 absolute previous-next gap-52 z-10">
        <button :disabled="currentPageSecondary === 1"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md mr-2 transform -translate-x-1/2 cursor-pointer"
                @click="prevPageSecondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"/>
          </svg>
        </button>
        <button :disabled="currentPageSecondary === totalPageSecondary"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md next-button transform -translate-x-1/2"
                @click="nextPageSecondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" StrokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
          </svg>
        </button>
      </div>
      <div class="relative">
        <Block :numbers="paginatedBlocksSecondary" @add-to-block="addElementToBlock" @remove-to-block="removeElementToBlock" title="Cấp độ trung học">
        <img class="w-32 h-20 absolute -mt-16 z-10 ml-2" src="/src/assets/images/student2.png"/>
      </Block>
    </div>
    </div>
    <div class="relative">
      <div class="flex justify-center mt-4 absolute previous-next gap-52 z-10">
        <button :disabled="currentPageSecondary === 1"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md mr-2 transform -translate-x-1/2 cursor-pointer"
                @click="prevPageSecondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"/>
          </svg>
        </button>
        <button :disabled="currentPageSecondary === totalPageSecondary"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-950 text-white rounded-md next-button transform -translate-x-1/2"
                @click="nextPageSecondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" StrokeWidth={1.5}
               stroke="currentColor" class="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
          </svg>
        </button>
      </div>
     <div v-if="newListPointsHighSchool <= 0" class="relative">
       <Block :numbers="paginatedBlocksHighSchool" title="Cấp độ cấp ba"/>
       <img class="w-32 h-20 absolute -mt-48 ml-3" src="/src/assets/images/student1.png"/>
       <img class="w-32 h-20 absolute -mt-48 ml-52" src="/src/assets/images/student2.png"/>
     </div>
      <div v-else class="relative">
        <Block :numbers="paginatedBlocksHighSchool" @add-to-block="addElementToBlock"
             @remove-to-block="removeElementToBlock" title="Cấp độ cấp ba"/>
        <img class="w-32 h-20 absolute -mt-80 ml-3" src="/src/assets/images/student1.png"/>
        <img class="w-32 h-20 absolute -mt-80 ml-52" src="/src/assets/images/student2.png"/>
      </div>
    </div>
  </div>
</template>

<script>
import Block from "@/views/viewuser/gift-page/Block.vue";
import FilterByScore from "@/views/viewuser/gift-page/FilterByScore.vue";
import {mapGetters} from "vuex";
import {getToken} from "@/utils/localStorageUtils";


export default {
  name: "ListLevel",
  components: {FilterByScore, Block},
  data() {
    return {
      checkLogin: false,
      token: getToken(),
      currentPagePrimary: 1,
      currentPageSecondary: 1,
      currentPageHighSchool: 1,
      itemsPerPage: 15,
      newListPointsPrimary: [],
      newListPointsSecondary: [],
      newListPointsHighSchool: [],
    };
  },
  created() {
    this.$store.dispatch("gifts/fetchGifts")
    this.init()
  },
  computed: {
    ...mapGetters({
      giftsList: "gifts/getList"
    }),
    paginatedBlocksPrimary() {
      const startIndex = (this.currentPagePrimary - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return this.newListPointsPrimary.slice(startIndex, endIndex);
    },
    paginatedBlocksSecondary() {
      const startIndex = (this.currentPageSecondary - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return this.newListPointsSecondary.slice(startIndex, endIndex);
    },
    paginatedBlocksHighSchool() {
      const startIndex = (this.currentPageHighSchool - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return this.newListPointsHighSchool.slice(startIndex, endIndex);
    },
    totalPagePrimary() {
      return Math.ceil(this.newListPointsPrimary.length / this.itemsPerPage);
    },
    totalPageSecondary() {
      return Math.ceil(this.newListPointsSecondary.length / this.itemsPerPage);
    },
    totalPageHighSchool() {
      return Math.ceil(this.newListPointsHighSchool.length / this.itemsPerPage);
    },
  },
  methods: {
    addElementToBlock(point) {
      if (point >= 300) {
        this.newListPointsHighSchool.push(point)
        this.newListPointsHighSchool.sort((a, b) => a - b)
        this.newListPointsHighSchool = Array.from(new Set(this.newListPointsHighSchool))
      } else if (point < 330 && point >= 165) {
        this.newListPointsSecondary.sort((a, b) => a - b)
        this.newListPointsSecondary = Array.from(new Set(this.newListPointsSecondary))
        this.newListPointsSecondary.push(point)
      } else if (point < 165) {
        this.newListPointsPrimary.sort((a, b) => a - b)
        this.newListPointsPrimary = Array.from(new Set(this.newListPointsPrimary))
        this.newListPointsPrimary.push(point)
      }
    },
    removeElementToBlock(point) {
      if (point >= 300) {
        let index = this.newListPointsHighSchool.indexOf(point)
        if (index !== -1) {
          this.newListPointsHighSchool.splice(index, 1)
          this.newListPointsHighSchool.sort((a, b) => a - b)
          this.newListPointsHighSchool = Array.from(new Set(this.newListPointsHighSchool))
        }

      } else if (point < 330 && point >= 165) {
        let index = this.newListPointsSecondary.indexOf(point)
        if (index !== -1) {
          this.newListPointsSecondary.sort((a, b) => a - b)
          this.newListPointsSecondary = Array.from(new Set(this.newListPointsSecondary))
          this.newListPointsSecondary.splice(index, 1)
        }
      } else if (point < 165) {
        let index = this.newListPointsPrimary.indexOf(point)
        if (index !== -1) {
          this.newListPointsPrimary.sort((a, b) => a - b)
          this.newListPointsPrimary = Array.from(new Set(this.newListPointsPrimary))
          this.newListPointsPrimary.splice(index, 1)
        }
      }
    },
    init() {
      this.giftsList.map((ele, index) => {
        if (ele.point >= 300) {
          this.newListPointsHighSchool.push(ele.point)
        } else if (ele.point < 330 && ele.point >= 165) {
          this.newListPointsSecondary.push(ele.point)
        } else if (ele.point < 165) {
          this.newListPointsPrimary.push(ele.point)
        }
      })
      this.newListPointsPrimary.sort((a, b) => a - b)
      this.newListPointsPrimary = Array.from(new Set(this.newListPointsPrimary))
      this.newListPointsSecondary.sort((a, b) => a - b)
      this.newListPointsSecondary = Array.from(new Set(this.newListPointsSecondary))
      this.newListPointsHighSchool.sort((a, b) => a - b)
      this.newListPointsHighSchool = Array.from(new Set(this.newListPointsHighSchool))
    },
    prevPagePrimary() {
      if (this.currentPagePrimary > 1) {
        this.currentPagePrimary--
      }
    },
    nextPagePrimary() {
      if (this.currentPagePrimary < this.totalPagePrimary) {
        this.currentPagePrimary++
      }
    },
    prevPageSecondary() {
      if (this.currentPageSecondary > 1) {
        this.currentPageSecondary--
      }
    },
    nextPageSecondary() {
      if (this.currentPageSecondary < this.totalPageSecondary) {
        this.currentPageSecondary++
      }
    },
    prevPageHighSchool() {
      if (this.currentPageHighSchool > 1) {
        this.currentPageHighSchool--
      }
    },
    nextPageHighSchool() {
      if (this.currentPageHighSchool < this.totalPageHighSchool) {
        this.currentPageHighSchool++
      }
    },
    searchByPoint(point) {
      this.$emit("searchByPoint", point)
    }
  }
}
</script>

<style scoped>
.previous-button {
  bottom: -650%;
  left: 70%
}

.next-button {
  bottom: -650%;
  left: 500%
}

.previous-next {
  position: absolute;
  bottom: -5%;
  left: 40px
}
</style>
