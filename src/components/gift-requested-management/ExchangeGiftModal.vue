<template>
  <Modal :show="isOpen" size="modal-lg" @hidden="closeModal" class="font-special">
    <img alt="" class="absolute opacity-100 w-full h-full object-cover"
         src="/src/assets/images/qua.gif">
    <div class="rounded-lg relative">
      <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModal">
        <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </svg>
      </button>
      <div class="pb-10">
        <h2 class="text-3xl text-orange-800 font-bold absolute -mt-4 pl-8">Đổi quà tặng</h2>
      </div>
      <ModalBody class="modal-xl">
        <transition
            mode="out-in"
            name="fade"
        >
          <div class="px-3 flex gap-4">
            <div class="w-full">
              <div class="flex align-center justify-center mb-4">
                <div class="w-1/3 font-bold text-base align-baseline text-g text-orange-800">Tên món quà
                </div>
                <div class="w-2/3">
                  <input
                      v-model="gift.name"
                      disabled="disabled"
                      class="form-control mb-2 rounded-2xl"
                      placeholder="Tên món quà"
                      type="text"
                  />
                </div>
              </div>
              <div class="flex align-center justify-center mt-4">
                <div class="w-1/3 font-bold text-base align-baseline text-orange-800">Số lượng</div>
                <div class="w-2/3 flex">
                  <input
                      v-model="quantity"
                      class="form-control mb-2 rounded-2xl"
                      :class="{'border-danger': errors.quantity}"
                      placeholder="Nhập số lượng"
                      type="number"
                      min="1"
                      @update:model-value="handleChangeValue"
                  />
                  <Error :hidden="!errors.quantity" :message="errors.quantity"/>
                </div>
              </div>
              <div class="flex align-center justify-center mt-6">
                <div class="w-1/3 font-bold text-base align-baseline text-orange-800">Tổng điểm sử dụng</div>
                <div class="w-2/3 flex">
                  <input
                      v-model="point"
                      disabled="disabled"
                      class="form-control mb-2 rounded-2xl"
                      placeholder="Điểm"
                      type="text"
                  />
                  <Error :hidden="!errors.quantity" :message="errors.quantity"/>
                </div>
              </div>
              <div class="flex align-center justify-center mt-4">
                <div class="w-1/3 font-bold text-base align-baseline text-orange-800">Mô tả</div>
                <div class="w-2/3">
                            <textarea
                                v-model="gift.description"
                                disabled="disabled"
                                class="form-control mb-2 rounded-2xl"
                                placeholder="Mô tả sản phẩm"
                                rows="5"
                            />
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="flex justify-center mt-7 mb-7 gap-7">
          <button class="px-9 py-2 bg-gray-600 text-white rounded-lg" @click="closeModal">Hủy</button>
          <button class="px-8 py-2 bg-orange-800 text-white rounded-lg" @click="confirmGiftModal(gift.id)">Xác nhận
          </button>
        </div>
      </ModalBody>
    </div>
  </Modal>
</template>

<script>

import Error from "@/components/core/Error.vue";
import GiftsExchange from "@/api/GiftsExchange"
import PointApi from "@/api/PointApi";
import {mapGetters, mapActions} from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "ExchangeGiftModal",
  components: {Error},
  props: ["isOpen", "onClose", "initialGift"],
  data() {
    return {
      gift: {...this.initialGift},
      quantity: 1,
      currentNumber: 1,
      point: 0,
      errors: {},
      listAllRequest: [],
      totalPointUser: 0,
      totalRequest: 0,
      userId: null,
      pointUser: 0,
      totalOfPoint: 0
    }
  },
  created() {
    this.getPointUser()
    this.getAllRequest()
  },
  mounted() {
    const userInfo = this.getUserInfo
    this.userId = userInfo.id
    this.point = this.gift.point
  },
  methods: {
    ...mapActions('pointUser', ['updatePoint']),
    closeModal() {
      this.quantity = 1
      this.currentNumber = 0
      this.point = this.gift.point
      this.reset();
      this.onClose()
      this.getAllRequest()
    },
    handleChangeValue() {
      this.point = this.quantity * this.gift.point
    },
    async getPointUser() {
      const res = await PointApi.getSelfPoint()
      this.totalOfPoint = res.data.data.totalOfPoint
    },
    async getAllRequest() {
      this.totalPointUser = 0
      this.totalRequest = 0
      const res = await GiftsExchange.getAll()
      this.listAllRequest = res.data.data
      this.listAllRequest.map((item, value) => {
        if(item.user.id == this.userId && item.status == 0) {
          this.totalPointUser += item.pointUsed
          this.totalRequest++
        }
      })
    },
    async confirmGiftModal(id) {
      this.onClose()
      if(this.gift.quantity < this.quantity){
        this.onClose()
        await Swal.fire({
          title: `<span style="font-weight: normal">Rất tiếc, số lượng món quà không đủ bạn chỉ có thể đổi tối đa</span> <b>${this.gift.quantity}</b> <span style="font-weight: normal">món quà</span> <b>${this.gift.name}</b><span> </span>`,
          timerProgressBar: true,
          icon: "error",
          didOpen: () => {
            const titleElement = document.querySelector('.swal2-title');
            titleElement.style.lineHeight = ('1');
          }
        })
      }else if(this.totalOfPoint < this.point) {
        this.onClose()
        await Swal.fire({
          title: `<span style="font-weight: normal">Rất tiếc, số điểm của bạn không đủ để đổi</span> <b>${this.quantity}</b> <span style="font-weight: normal">món quà</span> <b>${this.gift.name}</b><span> </span>`,
          timerProgressBar: true,
          icon: "error",
          didOpen: () => {
            const titleElement = document.querySelector('.swal2-title');
            titleElement.style.lineHeight = ('1');
          }
        })
      }
      else {
        let payload = {
          amount: this.quantity,
          pointUsed: this.point,
          userId: this.userId,
          giftId: id
        }
        const res = await GiftsExchange.createRequest(this.$h.convertJsonToFormData(payload))
        this.$store.dispatch("gifts/fetchGifts")
        this.$store.dispatch("point/fetchSelfPointInfo")
        this.reset();
        this.onClose()
        if(res.status == 200) {
          await Swal.fire({
            title: `<span style="font-weight: normal">Gửi yêu cầu đổi quà thành công</span> <b>${this.quantity}</b> <span style="font-weight: normal">món quà</span> <b>${this.gift.name}</b><span>`,
            timerProgressBar: true,
            icon: "success",
            didOpen: () => {
              const titleElement = document.querySelector('.swal2-title');
              titleElement.style.lineHeight = ('1');
            }
          })
        }
        else {
          await Swal.fire({
            title: `<span style="font-weight:   normal">Có lỗi trong quá trình đổi quà</span>`,
            timerProgressBar: true,
            icon: "Error",
            didOpen: () => {
              const titleElement = document.querySelector('.swal2-title');
              titleElement.style.lineHeight = ('1');
            }
          })
        }
      }
      await this.getAllRequest()
    },
    reset() {
      this.gift = {...this.initialGift}
    }
  },
  computed: {
    ...mapGetters('auth', ['getUserInfo'])
  }
}
</script>

<style scoped>

</style>
