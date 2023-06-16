<template>
<div class="flex items-center justify-between pb-4">
    <h3 class="text-lg font-medium flex items-center space-x-5">
        Nhóm tiêu chí
        <button class="transform rotate-90 bg-gray-200 rounded-md ml-4 p-2 hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </h3>
</div>
<div class="flex flex-col items-center justify-center bg-white rounded-lg px-8">
    <div class="mt-10 w-full justify-center items-center overflow-y-scroll scroll-view h-[60vh]">
        <CriteriaGroupTab
                v-for="group in groupList"
                :id="group.id"
                :class="{
                         'bg-primary text-light': activeGroup?.id === group.id,
                         'bg-gray-200 hover:bg-gray-300': activeGroup?.id !== group.id
                       }"
                :group="group"
                :on-click="() => onClickGroupTab(group)"
                @delete="onDeleteGroup(group.id)"
        />
    </div>
    <button
            class="mb-10 mt-10 justify-center m-auto flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="openModal"
    >
        <span class="text-lg">Thêm</span>
        <svg class="w-6 h-6 ml-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4.5v15m7.5-7.5h-15" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</div>
<CreateGroupModal :is-open="isModalOpen" :on-close="closeModal"/>
</template>

<script>
import CriteriaGroupTab from "@/components/criteria-group-manament/CriteriaGroupTab.vue";
import CreateGroupModal from "@/components/criteria-group-manament/CreateGroupModal.vue";

export default {
  name: "GroupPanel",
  components: {CreateGroupModal, CriteriaGroupTab},
  props: ["groupList", "activeGroup", "onClickGroupTab", "onDeleteGroup"],
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

<style scoped>

</style>