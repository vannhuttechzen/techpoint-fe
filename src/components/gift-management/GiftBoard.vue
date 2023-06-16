<template>
        <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-5 overflow-y-scroll h-[60vh] scroll-view ">
            <button class="h-fit relative shadow-md rounded-md bg-gray-200 hover:bg-white cursor-pointer " @click="openModal">
                <svg class="w-full h-80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <GiftCard v-for="gift in giftList" :gift="gift" :key="gift.id"/>
        </div>
    <DetailGiftModal :is-open="isModalOpen" :on-close="closeModal" :on-open="openModal" :action-modal="actionModal"/>
</template>
<script>
import GiftCard from "@/components/gift-management/GiftCard.vue" ;
import DetailGiftModal from "@/components/gift-management/DetailGiftModal.vue";

export default {
    components: {DetailGiftModal, GiftCard},
    data() {
        return {
            isModalOpen: false,
            actionModal: ""
        }
    },
    props: ["giftList"],
    methods: {
        openModal() {
            this.actionModal = "CREATE"
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        }
    },
};
</script>

<style>
</style>
