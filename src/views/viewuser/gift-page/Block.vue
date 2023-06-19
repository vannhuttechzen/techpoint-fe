<template>
  <div v-if="numbers.length > 0" class="h-52 rounded-lg p-4 mb-16 border-2 border-dashed border-primary bg-white">
    <slot></slot>
    <h2 class="absolute rounded-xl text-xl font-bold mb-4 -mt-11 bg-blue-200 ml-20 cursor-pointer transition-transform transform hover:scale-110 px-4 py-2">{{ title }}</h2>
    <div class="grid grid-cols-5 gap-2 text-white mt-2">
      <div v-for="(number, index) in points" :key="number" :class="getPointClass(number)" class="p-2 text-center w-16 rounded-xl mt-2 cursor-pointer"
           @click="togglePoint(number)">{{ number }}
      </div>
    </div>
  </div>
  <div v-else class="h-20 rounded-lg p-4 mb-16 border-2 border-dashed border-primary bg-white">
    <slot></slot>
    <h2 class="absolute rounded-xl text-xl font-bold mb-4 -mt-11 bg-blue-200 ml-20 cursor-pointer transition-transform transform hover:scale-110 px-4 py-2">{{ title }}</h2>
    <div class="flex justify-center pt-4">Không có quà trong cấp này</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    numbers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedPoints: [],
      flagPoint: -1
    }
  },
  watch: {
    getDeletePoint(value) {
      this.$emit('add-to-block', value[0]);
      if (this.isSelected(value[0])) {
        this.selectedPoints = this.selectedPoints.filter(selected => selected !== value[0])
      } else {
        this.selectedPoints.push(value[0])
      }
      if (this.selectedPoints.includes(value[0])) {
        this.selectedPoints = this.selectedPoints.filter(selected => selected !== value[0])
      }
    },
    getSearchByPoint(value) {
      if(value != null) {
        if(typeof value == "object") {
          this.$emit('remove-to-block', value.point);
          const foundElement = this.selectedPoints.findIndex(element => element === value.point)
          if (foundElement !== -1) {
            this.selectedPoints.splice(foundElement, 1)
          } else {
            this.selectedPoints.push(value.point)
          }
        } else {
          this.$emit('remove-to-block', value);
          const foundElement = this.selectedPoints.findIndex(element => element === value)
          if (foundElement !== -1) {
            this.selectedPoints.splice(foundElement, 1)
          } else {
            this.selectedPoints.push(value)
          }
        }
      }
    }
  },
  created() {
    this.updatePointSelected(null);

  },
  computed: {
    ...mapGetters("filterPoint", ["getPointSelected", "getSearchByPoint", "getDeletePoint", "getSearchByLevel"]),
    points() {
      return Array.from(new Set(this.numbers));
    }
  },
  methods: {
    ...mapActions("filterPoint", ["updatePointSelected", "updateDeleteSearchBlock", "updateSearchByPoint", "updateDeletePoint"]),
    togglePoint(number) {
      if (this.flagPoint == number) {
        const objPoint = {
          point: number
        }
        this.updateDeleteSearchBlock(objPoint)
      }
      if (!this.isSelected(number)) {
        this.selectedPoints = this.selectedPoints.filter(selected => selected !== number)
      } else {
        this.selectedPoints.push(number)
      }
      if (this.flagPoint == number) {
        const objPoint = {
          point: number
        }
        const foundElement = this.selectedPoints.findIndex(element => element === objPoint.point)
        if (foundElement !== -1) {
          this.selectedPoints.splice(foundElement, 1)
        }
        this.updatePointSelected(objPoint)
      } else {
        this.updatePointSelected(number)
      }
      this.flagPoint = number
    },
    isSelected(number) {
      return this.selectedPoints.includes(number)
    },
    getPointClass(number) {
      return {
        "bg-blue-900": this.isSelected(number),
        "bg-blue-400": !this.isSelected(number)
      }
    }
  }
}
</script>

<style scoped>
.border {
    border-width: 2px;
    border-color: gray;
}
</style>
