<template>
  <div class="flex items-center justify-center rounded-lg px-8">
    <div class=" -mt-2 w-full justify-center items-center overflow-y-scroll scroll-view h-[50vh] pt-5">
      <CriteriaGroupTab
          v-for="group in groupList"
          :id="group.id"
          :class="{
                         'bg-green-700 text-light': activeGroup?.id === group.id,
                         'bg-gray-200 hover:bg-gray-300': activeGroup?.id !== group.id
                       }"
          :group="group"
          :on-click="() => onClickGroupTab(group)"
      />
    </div>
  </div>
</template>

<script>
import CriteriaGroupTab from "@/components/user-landing-page/criterion-page/CriteriaGroupTab.vue";

export default {
  name: "GroupPanel",
  components: {CriteriaGroupTab},
  props: ["groupList", "activeGroup", "onClickGroupTab"],
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