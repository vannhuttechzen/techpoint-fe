<template>
    <div class="h-fit relative shadow-md rounded-md p-4 bg-blue-100">
        <button class="h-52 w-full" @click="openModal">
            <img :src="criterion.img" alt="" class="h-full w-full object-cover rounded-md">
        </button>
        <h3 class="text-lg font-medium h-[2rem] truncate text-center mt-4">{{ criterion.name }}</h3>
        <div class="flex">
            <div class="justify-center m-auto flex items-end text-yellow-400 font-bold py-2 px-5 rounded ">
                <svg class=" w-6 h-6 fill-yellow-300" fill="none" stroke="currentColor" stroke-width="2"
                     viewBox="0 0 24 24">
                    <path
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span class=" ml-2 text-dark ">{{ criterion.point }}</span>
            </div>
        </div>
        <button
          class="mt-1 justify-center flex bg-green-700 text-white font-bold py-2 px-5 rounded-2xl hover:bg-green-500 w-32 absolute items-center ml-16 "
          @click="handlebuttonClick()">
            <span class="ml-2">Tích điểm</span>
        </button>
        <DetailCriterionModal :initial-criterion="Object.assign({}, criterion)" :is-open="isModalOpen"
                              :on-close="closeModal" />
        <RequestAccumulatePointsModel :initial-accumulatePoints="Object.assign({}, accumulatePoints)"
                                      :is-open="isModalOpenAccept" :on-close="closeModalAccept" :criterion="criterion"/>
    </div>
</template>
<script>
import DetailCriterionModal from "@/components/user-landing-page/criterion-page/DetailCriterionModal.vue";
import RequestAccumulatePointsModel from "@/components/user-landing-page/criterion-page/RequestAccumulatePointsModel.vue";
import {getToken} from "@/utils/localStorageUtils";

export default {
    name: "CriterionCard",
    components: { DetailCriterionModal, RequestAccumulatePointsModel },
    props: ["criterion", "accumulatePoints"],
    data() {
        return {
            isModalOpen: false,
            isModalOpenAccept: false,
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
        openModalAccept() {
            this.isModalOpenAccept = true
        },
        closeModalAccept() {
            this.isModalOpenAccept = false
        },
        handlebuttonClick() {
            if (this.token) { this.openModalAccept();
            } else {
                this.$router.push('/login');
            }
        },
    }
}
</script>
<style scoped>
.my-title-class {
    line-height: 1.5rem;
}
</style>
