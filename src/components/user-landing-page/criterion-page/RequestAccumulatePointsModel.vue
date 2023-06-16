<template>
    <Modal :show="isOpen" size="modal-md" @hidden="closeModalAccept" class="mt-6 padding-position">
        <div class="p-5 text-center">
          <picture class="flex justify-center">
            <img src="/src/assets/images/agree.gif" alt="😄" width="60" height="60">
          </picture>
            <div class="text-3xl mt-5">Bạn có muốn</div>
            <div class="text-slate-500 mt-2">
                Gửi yêu cầu tích điểm?
            </div>
        </div>
        <div class="px-5 pb-8 text-center">
            <button type="button" @click="closeModalAccept" class="btn btn-outline-secondary w-24 mr-1">
                Hủy
            </button>
            <button type="button" class="btn bg-green-700 text-white w-24" @click="createRequest">Gửi</button>
        </div>
    </Modal>
</template>
<script>
import PointsExchange from "@/api/PointsExchange"
import {mapGetters} from "vuex";
import Swal from "sweetalert2";
export default {
    name: "RequestAccumulatePointsModel",
    props: ["isOpen", "onClose", "initialAccumulatePoints", "criterion"],
    data() {
        return {
            accumulatePoints: { ...this.initialAccumulatePoints },
        }
    },
    methods: {
        closeModalAccept() {
            this.reset();
            this.onClose()
        },
        async createRequest() {
            let param = {
                point : this.criterion.point,
                userId: this.getUserInfo.id,
                criteriaId: this.criterion.id
            }
            await PointsExchange.create(this.$h.convertJsonToFormData(param))
            this.onClose()
            await Swal.fire({
                title: `<span style="font-weight: normal">Gửi yêu cầu tích điểm thành công</span>`,
                timerProgressBar: true,
                icon: "success",
                didOpen: () => {
                    const titleElement = document.querySelector('.swal2-title');
                    titleElement.style.lineHeight = ('1');
                }
            })
        },
        reset() {
            this.accumulatePoints = { ...this.initialAccumulatePoints }
        },
    },
    computed: {
        ...mapGetters('auth', ['getUserInfo'])
    }
};
</script>
<style scoped>
.padding-position {
  padding-top: 14%;
}
</style>