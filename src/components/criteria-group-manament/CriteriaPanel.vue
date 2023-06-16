<template>
    <div class="flex items-center justify-between pb-4">
        <h3 class="text-lg font-medium flex items-center space-x-5">
            Các tiêu chí
        </h3>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 mt-3 overflow-y-scroll h-[60vh] scroll-view pe-4">
        <button class="h-fit relative shadow-md rounded-md p-7 bg-gray-200 hover:bg-white cursor-pointer " @click="openModal">
            <svg class="w-full h-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <CriterionCard v-for="criterion in data" :criterion="criterion " :key="criterion.id"/>
    </div>
    <DetailCriterionModal :action="action" :is-open="isModalOpen" :on-close="closeModal" :on-open="openModal" :active-group="activeGroup"/>
</template>

<script>
import CriterionCard from "@/components/criteria-group-manament/CriterionCard.vue";
import DetailCriterionModal from "@/components/criteria-group-manament/DetailCriterionModal.vue";

export default {
    components: {DetailCriterionModal, CriterionCard},
    props: ["data", "activeGroup"],
    data() {
        return {
            isModalOpen: false,
            action: ""
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
            this.action = "create"
        },
        closeModal() {
            this.isModalOpen = false
        }
    }
}
</script>