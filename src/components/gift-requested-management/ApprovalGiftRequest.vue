<template>
  <ModalConfirmAccept :is-open="isModalConfirmOpen"
                      :on-close="closeModalConfirm"
                      :request-id="requestId"
                      :dataDetail="dataDetail"
                      @clicked="closeModal"
                      :selected-time="selectedTime"/>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal">
    <ModalHeader>
      <h2 class="font-medium text-lg">Yêu cầu đổi quà của {{ dataDetail.user?.name }}</h2>
    </ModalHeader>
    <ModalBody class="modal-background">
      <div class="flex">
        <div class="flex flex-col justify-center form-create px-4 w-2/3">
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Người đổi quà:</label>
            <div class="flex bg-neutral-100 px-3 w-full py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ dataDetail.user?.name }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Tên quà:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ dataDetail.gift?.name }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Số lượng:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ dataDetail.amount }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Số điểm sử dụng:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ dataDetail.pointUsed }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Ngày đổi:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ dataDetail.createAt }}</p>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <img :src="dataDetail.gift?.img" alt="">
        </div>
      </div>
    </ModalBody>
    <div class="text-center py-4">
      <button class="btn btn-outline-secondary w-24 mr-4" type="button"
              @click="closeModal">
        Đóng
      </button>
      <button v-if="dataDetail.status == 0" class="btn w-24 mr-4 text-white bg-orange-400" href="javascript:;"
              type="button" @click="openModalConfirm">
        Trao quà
      </button>
    </div>
  </Modal>
</template>

<script>
import GiftsExchange from "@/api/GiftsExchange";
import ModalConfirmAccept from "@/components/gift-requested-management/ModalConfirmAccept.vue";
import AvatarMultipleSelect from "@/components/core/AvatarMultipleSelect.vue";

export default {
  name: "ApprovalGiftRequest",
  components: {AvatarMultipleSelect, ModalConfirmAccept},
  props: ["isOpen", "onClose", "requestId", "selectedTime"],
  data() {
    return {
      errors: {},
      showError: false,
      dataDetail: {},
      isModalConfirmOpen: false
    }
  },
  methods: {
    closeModal() {
      this.onClose()
    },
    async getDetailGift() {
      const res = await GiftsExchange.getDetailRequest(this.requestId)
      this.dataDetail = res.data.data
      this.dataDetail.createAt = this.dataDetail.createAt.slice(0, 10)
    },
    openModalConfirm() {
      this.isModalConfirmOpen = true
    },
    closeModalConfirm() {
      this.isModalConfirmOpen = false
    }
  },
  watch: {
    isOpen: function () {
      this.getDetailGift()
    }
  }
}
</script>

<style scoped>
.modal-background {
    background-image: url("https://images.unsplash.com/photo-1494426383302-7b9d36a1a028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover;
    min-height: 280px;
    color: black;
}
</style>