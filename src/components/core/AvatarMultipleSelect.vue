<template>
<div class="flex flex-wrap gap-y-2">
    <div v-for="({img, name, value}, index) in data" class="relative">
        <label v-if="!checkExcluded(value)" :for="'check-' + index + unique">
            <input :id="'check-' + index + unique"
                   v-model="selectedElements"
                   :value="value" class="absolute invisible peer"
                   type="checkbox"
                   @change="changeHandler"
                   :disabled="checkExcluded(value)"
            >
            <span class="rounded-full w-12 h-12 bg-gray-200 opacity-75 flex justify-center items-center absolute invisible border-2 mx-2 peer-checked:visible peer-checked:border-green-500">
                <svg class="w-6 h-6 opacity-100 stroke-green-500" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 12.75l6 6 9-13.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
            <Tippy
                    tag="div"
                    :content="name"
                    class="w-12 h-12 flex items-center justify-center absolute rounded-full text-white bg-transparent right-0 top-0"
            />
            <img :src="img"
                 alt="Rounded avatar"
                 class="w-12 h-12 rounded-full border-2 object-cover mx-2"
            >
        </label>
    </div>
</div>

</template>

<script>
export default {
  name: "AvatarMultipleSelect",
  props: ["data", "excludedData"],
  emits: ["change-selection"],
  data() {
    return {
      selectedElements: [],
      unique: new Date().getTime()
    }
  },
  methods: {
    changeHandler() {
      this.$emit("change-selection", this.selectedElements)
    },
    resetSelectedElements() {
      this.selectedElements = []
    },
    checkExcluded(id) {
      return this.excludedData ? this.$props.excludedData.includes(id) : false
    }
  }
}
</script>

<style scoped>

</style>