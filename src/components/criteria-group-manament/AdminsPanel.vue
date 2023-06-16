<template>
    <div class="flex items-center justify-between pb-4">
        <h3 class="text-lg font-medium flex items-center space-x-5">
            Người đánh giá tiêu chí
        </h3>
    </div>
    <div class="flex -space-x-4">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-200 hover:bg-white rounded-full cursor-pointer border-2 border-transparent"
             @click="openModal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <AdminTag v-for="admin in adminListShowed" :admin="admin" :is-show-tooltip="admin.id === chosenAdminId"
                  :toggle-tooltip="toggleTooltip"
                  :group-id="activeGroup.id"
        />
        <div v-if="isMoreThan5Admins"
             class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-200 hover:bg-white rounded-full cursor-pointer"
             @click="toggleShowAllAdmins">
            <svg v-if="!showFullAdminList" class="w-6 h-6" fill="none" stroke="currentColor"
                 stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.75 19.5L8.25 12l7.5-7.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    </div>
    <AddAdminsModal :active-group="activeGroup" :excluded-admins="adminList" :is-open="isModalOpen"
                    :on-close="closeModal"/>
</template>

<script>
import AdminTag from "@/components/criteria-group-manament/AdminTag.vue";
import AddAdminsModal from "@/components/criteria-group-manament/AddAdminsModal.vue";

export default {
    name: "AdminsPanel",
    components: {AddAdminsModal, AdminTag},
    props: ["adminList", "activeGroup"],
    data() {
        return {
            isModalOpen: false,
            chosenAdminId: "",
            showDropdown: false,
            showFullAdminList: false
        }
    },
    computed: {
        adminListShowed() {
            if (this.showFullAdminList) {
                return this.adminList
            }

            return this.adminList.slice(0, 5)
        },
        isMoreThan5Admins() {
            return this.adminList.length >= 5
        },
    },
    methods: {
        openModal() {
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        },
        toggleTooltip(adminId) {
            if (this.chosenAdminId === adminId) {
                this.chosenAdminId = ""
            } else {
                this.chosenAdminId = adminId
            }
        },
        toggleShowAllAdmins() {
            this.showFullAdminList = !this.showFullAdminList
        },
    }
}
</script>

<style>
</style>