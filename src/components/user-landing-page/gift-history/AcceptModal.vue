<template>
  <div id="success-notification-reject" class="toastify-content toastify-content-update hidden flex">
    <CheckCircleIcon class="text-success"/>
    <div class="ml-1 mr-2 message-toast">
      <div class="text-slate-500">
        Bạn đã hủy yêu cầu đổi món quà <span class="font-medium">{{ dataDetail?.gift?.name }}</span>
      </div>
    </div>
  </div>
  <div id="success-notification-confirm" class="toastify-content toastify-content-update hidden flex">
    <CheckCircleIcon class="text-success"/>
    <div class="ml-1 mr-2 message-toast">
      <div class="text-slate-500">
        Bạn đã nhận món quà <span class="font-medium">{{ dataDetail?.gift?.name }}</span>
      </div>
    </div>
  </div>
  <Modal :show="isOpen" size="modal-md" @hidden="closeModal" class="size-height">
    <div class="p-5 text-center" v-if="status === 3">
      <picture class="flex justify-center">
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp" type="image/webp">
        <img src="/src/assets/images/consider.gif" alt="🤔" width="60" height="60">
      </picture>
      <div class="text-3xl mt-5">Bạn có muốn</div>
      <div class="text-slate-500 mt-2">
        Hủy yêu cầu đổi món quà {{ dataDetail?.gift?.name }} này?
      </div>
    </div>
    <div class="p-5 text-center" v-else>
      <div class="text-3xl mt-5">Đã nhận được món quà {{ dataDetail?.gift?.name }}</div>
      <picture class="flex justify-center">
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.webp" type="image/webp">
        <img src="/src/assets/images/blush.gif" alt="☺" width="60" height="60">
      </picture>
      <div class="text-slate-500 mt-2">
        Bạn đồng ý là đã nhận được quà từ người phụ trách và hài lòng với món quà đã nhận. Lưu ý sau khi nhấn Xác nhận
        bạn sẽ không thể có bất cứ phản hồi nào liên quan đến quà tặng.
      </div>
    </div>
    <div class="px-5 pb-8 text-center">
      <button
          type="button"
          @click="closeModal"
          class="btn btn-outline-secondary w-24 mr-1"
      >
        Đóng
      </button>
      <button
          type="button"
          class="btn bg-green-400 text-white w-24"
          :class="{'bg-green-600': status === 2,
                   'bg-red-600': status === 3}"
          @click="confirmOperation"
      >
        {{ status === 3 ? "Hủy quà" : "Xác nhận" }}
      </button>
    </div>
  </Modal>
</template>
<script>
import GiftsExchange from "@/api/GiftsExchange";
import Swal from "sweetalert2";

export default {
  name: "ModalConfirmMe",
  props: ["isOpen", "onClose", "dataDetail", "status"],
  methods: {
    closeModal() {
      this.onClose()
    },
    async confirmOperation() {
      let res = ""
      let params = {
        id: this.dataDetail.id,
        status: this.status
      }
      if (this.status === 2) {
        res = await GiftsExchange.giftExchangeConfirmReceiveGift(this.$h.convertJsonToFormData(params))
        this.closeModal()
        if (res.status === 200) {
          await Swal.fire({
            title: `Bạn đã nhận món quà <span class="font-medium">${this.dataDetail?.gift?.name}</span>`,
            timerProgressBar: true,
            icon: "success",
            didOpen: () => {
              const titleElement = document.querySelector('.swal2-title')
              titleElement.style.lineHeight = ('1')
            }
          })
        }
      } else if (this.status === 3) {
        res = await GiftsExchange.giftExchangeConfirmRejectGift(this.$h.convertJsonToFormData(params))
        this.closeModal()
        if (res.status === 200) {
          await Swal.fire({
            title: `Bạn đã hủy yêu cầu đổi món quà <span class="font-medium">${this.dataDetail?.gift?.name}</span>`,
            timerProgressBar: true,
            icon: "success",
            didOpen: () => {
              const titleElement = document.querySelector('.swal2-title')
              titleElement.style.lineHeight = ('1')
            }
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.size-height {
    padding-top: 14%;
}
</style>