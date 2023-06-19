<template>
  <div class="text-white rounded-lg p-4 relative w-full aspect-[1/2] h-80">
    <div class="relative">
      <div class="flex justify-center">
        <div :class="{'overlay': gift.quantity < 1, 'hidden': gift.quantity > 0}"><span class="pb-4">Hết quà</span>
        </div>
        <img
            :src="gift.img"
            alt="Card Image"
            class="object-cover rounded-md h-64 w-64"
            data-action="zoom"
        />
        <div class="absolute top-0 right-0 flex flex-col items-end gap-2 p-3 mt-6">
          <div class="opacity-80 flex items-center w-24 -mr-10"
               :class="gift.quantity < 1 ? 'bg-stone-400' : 'bg-yellow-200'">
            <svg class="w-8 h-8 text-pink-400 fill-pink-200 mr-3" fill="" stroke="currentColor"
                 stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-lg text-orange-800">{{ gift.quantity >= 0 ? gift.quantity : 0 }}</p>
          </div>
          <div class="bg-orange-500 opacity-80 flex items-center w-24 -mr-10"
               :class="{'bg-stone-400': gift.quantity < 1}">
            <svg class="w-8 h-8 fill-yellow-400 mr-3" fill="none" stroke="currentColor" stroke-width="1.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-lg text-orange-800">{{ gift.point }}</p>
          </div>
          <div class="bg-green-500 opacity-80 flex items-center w-24 -mr-10"
               :class="{'bg-stone-400': gift.quantity < 1}">
            <svg class="w-6 h-6 bg-red-600 fill-white mr-4" fill="none" stroke="currentColor" stroke-width="1.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>
            </svg>
            <p class="text-lg text-orange-800">200</p>
          </div>
          <img class="w-24"
              :class="{'bg-slate-500 hover:bg-slate-500 cursor-not-allowed': gift.quantity <= 0, 'border-2 border-orange-700 rounded-md w-22 h-16 -mr-7 cursor-pointer transition-transform transform hover:scale-110': true}"
              alt="đổi điểm Image"
              src="/src/assets/images/traoqua.jpg"
              @click="handleImageClick()"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center bg-white w-full rounded-xl">
      <div class="items-center justify-center">
        <button class="text-lg my-1 text-yellow-950 w-96 font-bold " @click="openModal">
          {{ gift.name }}
        </button>
      </div>
    </div>
    <DetailGiftModal
        :initial-gift="Object.assign({},gift)"
        :is-open="isModalOpen"
        :on-close="closeModal"
    />
    <ExchangeGiftModal
        :initial-gift="Object.assign({},gift)"
        :is-open="isModalExchangeOpen"
        :on-close="closeModalExchange"
    />
  </div>
</template>
<script>
import DetailGiftModal from "@/components/user-landing-page/gift-page/DetailGiftModal.vue";
import ExchangeGiftModal from "@/components/gift-requested-management/ExchangeGiftModal.vue";
import {getToken} from "@/utils/localStorageUtils";

export default {
  name: "GiftCard",
  components: {ExchangeGiftModal, DetailGiftModal},
  props: ["gift"],
  data() {
    return {
      isModalOpen: false,
      isModalExchangeOpen: false,
      checkLogin: false,
      token: getToken()
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    openModalExchange() {
      this.isModalExchangeOpen = true
    },
    closeModalExchange() {
      this.isModalExchangeOpen = false
    },
    handleImageClick() {
      if (this.token) {
        if (this.gift.quantity > 0) {
          this.openModalExchange()
        } else {
          this.isModalOpen = false
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
};
</script>
<style>
.my-title-class {
    line-height: 1.5rem;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    display: flex;
    justify-content: center;
    line-height: normal;
    color: white;
    font-size: 20px;
    background-size: 100px;
    background-image: url("src/assets/images/sold-out-tag.png");
    z-index: 100;
    background-repeat: no-repeat;
}
</style>
