<template>
  <button
      class="px-8 py-3 w-32 bg-primary rounded-lg flex justify-between items-center disabled:opacity-50 enabled:hover:bg-blue-700"
      :class="{[className]: className}"
      :disabled="disabled"
      @click="onClick">
    <span class="text-lg text-light font-bold text-center w-full">
      {{label}}
    </span>
    <i v-if="icon" class="text-light text-[1.5rem]" :class="icon"/>
  </button>
</template>

<script>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "CommonButton",
  components: {FontAwesomeIcon},
  props: [
    "label",
    "onClick",
    "icon",
    "className",
    "disabled"
  ]
}
</script>

<style scoped>

</style>