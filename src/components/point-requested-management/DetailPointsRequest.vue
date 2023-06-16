<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal(0)">
    <ModalHeader>
      <h2 class="font-medium text-lg">Yêu cầu đổi điểm của {{ this.dataDetail.user?.name }}</h2>
    </ModalHeader>
    <ModalBody>
      <div class="flex">
        <div class="flex flex-col justify-center form-create px-4 w-2/3">
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Nhân viên yêu cầu đổi điểm:</label>
            <div class="flex bg-neutral-100 px-3 w-full py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ this.dataDetail.user?.name }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Tên tiêu chí:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ this.dataDetail.criterion?.name }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Số điểm đổi:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ this.dataDetail.point }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Ngày gửi yêu cầu:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <p>{{ this.dataDetail.createAt }}</p>
            </div>
          </div>
          <div class="w-full flex create-layout gap-1 mb-4">
            <label class="text-sm w-1/3 mr-3 font-medium">Người phụ trách:</label>
            <div class="flex bg-neutral-100 w-full px-3 py-2 rounded-md border-slate-100 border-1 text-black">
              <div class="flex -space-x-4">
                <AdminTagForPointsRequested v-for="admin in this.dataDetail.adminToGroup" :admin="admin" class="h-9"/>
              </div>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <img :src="this.dataDetail?.criterion?.img" alt="">
        </div>
      </div>
    </ModalBody>
    <div class="text-center py-4">
      <button class="btn btn-outline-secondary w-24 mr-4" type="button"
              @click="closeModal(0)">
        Đóng
      </button>
      <button class="btn w-24 mr-4 text-white bg-rose-400" href="javascript:;"
              type="button" @click="openModalApprove(2)">
        Từ chối
      </button>
      <button class="btn w-24 mr-4 text-white bg-green-400" href="javascript:;"
              type="button" @click="openModalApprove(1)">
        Duyệt
      </button>
    </div>
  </Modal>
  <ModalConfirmApprove :is-open="isModalApproveOpen"
                       :on-close="closeModalApprove"
                       :status="status"
                       @clicked="closeModal"
                       :data-detail="dataDetail"
                       :selected-time="selectedTime"/>
</template>

<script>
import ModalConfirmApprove from "@/components/point-requested-management/ModalConfirmApprove.vue";
import moment from "moment";
import AdminTagForPointsRequested from "@/components/criteria-group-manament/AdminTagForPointsRequested.vue";

export default {
  name: "DetailPointsRequest",
  components: {AdminTagForPointsRequested, ModalConfirmApprove},
  data() {
    return {
      isModalApproveOpen: false,
      status: 0,
      selectedTime: null
    }
  },
  props: ["isOpen", "onClose", "dataDetail"],
  methods: {
    closeModal(props) {
      this.onClose(props)
    },
    openModalApprove(status) {
      if (status === 1) {
        this.status = 1
      } else if (status === 2) {
        this.status = 2
      }
      this.isModalApproveOpen = true
      this.selectedTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    closeModalApprove() {
      this.isModalApproveOpen = false
    }
  }
}
</script>

<style scoped>

</style>