<template>
    <div class="h-fit relative shadow-md rounded-md p-4 bg-white">
        <button class="absolute top-0 right-0 text-gray-600 hover:text-red-600" @click="onDelete">
            <svg class="h-6 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                      d="M12.707 7.293a1 1 0 010 1.414L9.414 11l3.293 3.293a1 1 0 01-1.414 1.414L8 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 11 3.293 7.707a1 1 0 011.414-1.414L8 9.586l3.293-3.293a1 1 0 011.414 0z"
                      fill-rule="evenodd"/>
            </svg>
        </button>
        <button class="h-52 w-full mt-2" @click="openModal">
            <img :src="criterion.img" alt="" class="h-full w-full object-cover rounded-md">
        </button>
        <h3 class="text-lg font-medium h-[2rem] truncate text-center mt-8">{{ criterion.name }}</h3>
        <div class="flex mt-2 mb-2">
            <div class="justify-center m-auto flex bg-blue-800 text-white font-bold py-2 px-5 rounded ">
                <svg class=" w-6 h-6 fill-yellow-400" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
                <span class="ml-2 text-lg ">{{ criterion.point }}</span>
            </div>
        </div>
        <DetailCriterionModal :initial-criterion="Object.assign({},criterion)"
                              :is-open="isModalOpen"
                              :on-close="closeModal"
                                :action = "action"/>
    </div>

</template>

<script>
import Swal from 'sweetalert2'
import CriterionApi from "@/api/CriterionApi";
import DetailCriterionModal from "@/components/criteria-group-manament/DetailCriterionModal.vue";

export default {
    name: "CriterionCard",
    components: {DetailCriterionModal},
    props: ["criterion"],
    data() {
        return {
            isModalOpen: false,
            action: ""
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
            this.action = "update"
        },
        closeModal() {
            this.isModalOpen = false
        },
        async onDelete() {
            const result = await Swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: "Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9a3412',
                cancelButtonColor: '#4b5563',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy bỏ',
                reverseButtons: true
            })

            if (result.isConfirmed) {
                try {
                    const res = await CriterionApi.deleteById(this.criterion.id)
                    if (res.status === 200) {
                        this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
                        await Swal.fire({
                                title: `<span style="font-weight: normal">Bạn đã xoá</span> <b>${this.criterion.name}</b> <span style="font-weight: normal">thành công!</span>`,
                                timerProgressBar: true,
                                icon: "success",
                                didOpen: () => {
                                    const titleElement = document.querySelector('.swal2-title');
                                    titleElement.style.lineHeight = '1';
                                }
                            }
                        )
                    }
                } catch (e) {
                    await Swal.fire(
                        {
                            title: `Có lỗi xảy ra!!`,
                            timerProgressBar: true,
                            icon: "error"
                        }
                    )
                }
            }
        }
    }
}
</script>

<style scoped>
.my-title-class {
    line-height: 1.5rem;
}
</style>
