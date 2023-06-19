<template>
    <div class="grid grid-cols-4 gap-y-10 gap-x-11 mt-20 overflow-y-scroll h-[80vh] scroll-view pr-14">
        <CriterionCard v-for="criterion in data" :criterion="criterion " :key="criterion.id"/>
    </div>
    <DetailCriterionModal  :is-open="isModalOpen" :on-close="closeModal" :on-open="openModal" :active-group="activeGroup"/>
</template>

<script>
import CriterionCard from "@/components/user-landing-page/criterion-page/CriterionCard.vue";
import DetailCriterionModal from "@/components/user-landing-page/criterion-page/DetailCriterionModal.vue";

export default {
    components: {DetailCriterionModal, CriterionCard},
    props: ["data", "activeGroup"],
    data() {
        return {
            isModalOpen: false
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        }
    }
}
</script>