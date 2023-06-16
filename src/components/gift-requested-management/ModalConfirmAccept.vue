<template>
  <Modal :show="isOpen" size="modal-md" @hidden="closeModal" class="size-height">
    <div class="p-5 text-center">
      <picture class="flex justify-center">
        <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/512.webp" type="image/webp">
        <img src="/src/assets/images/consider.gif" alt="🤔" width="60" height="60">
      </picture>
      <div class="text-3xl mt-5">Bạn có chắc</div>
      <div class="text-slate-500 mt-2">
        Đổi quà cho nhân viên này?
      </div>
    </div>
    <div class="px-5 pb-8 text-center">
      <button
          type="button"
          @click="closeModal"
          class="btn btn-outline-secondary w-24 mr-1"
      >
        Hủy
      </button>
      <button type="button" class="btn bg-orange-400 text-white w-24" @click="approveRequest">Trao quà</button>
    </div>
  </Modal>
</template>

<script>
import moment from "moment/moment";
import GiftsExchange from "@/api/GiftsExchange";
import Swal from "sweetalert2";

export default {
  name: "ModalConfirmAccept",
  props: ["isOpen", "onClose", "requestId", "giftName", "dataDetail", "selectedTime"],
  emits: ["clicked"],
  methods: {
    closeModal() {
      this.onClose()
    },
    async approveRequest() {
      let params = {
        id: this.requestId,
        status: 1,
        updateAt: this.selectedTime
      }
      const res = await GiftsExchange.approveRequest((this.$h.convertJsonToFormData(params)))
      this.$emit("clicked", false)
      if (res.status === 200) {
        this.closeModal()
        this.$store.dispatch('giftsExchange/fetchGiftsExchangeList')
        await Swal.fire({
          title: `<span style="font-weight: normal">Quà tặng <span><b>${this.giftName === undefined ? this.dataDetail.gift?.name : this.giftName}</b></span>  đã được đổi </span>  <span style="font-weight: normal">thành công!</span>`,
          timerProgressBar: true,
          icon: "success",
          didOpen: () => {
            const titleElement = document.querySelector('.swal2-title');
            titleElement.style.lineHeight = ('1');
          }
        })
        this.onClose()
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
