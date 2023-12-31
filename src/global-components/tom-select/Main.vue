<template>
  <select v-select-directive="{ props, emit, computedOptions }" class="tom-select">
    <slot></slot>
  </select>
</template>

<script setup>
import { computed, watch, toRaw, ref, onMounted, inject } from "vue";
import { setValue, init, updateValue } from "./index";
import dom from "@left4code/tw-starter/dist/js/dom";

const vSelectDirective = {
  mounted(el, { value }) {
    // Clone the select element to prevent tom select remove the original element
    const clonedEl = dom(el).clone().insertAfter(el)[0];
    dom(el).attr("hidden", true);

    // Initialize tom select
    setValue(clonedEl, value.props);
    init(el, clonedEl, value.props, value.emit, value.computedOptions);

    // Attach instance
    tomSelectRef.value = clonedEl;
  },
  updated(el, { value }) {
    const clonedEl = dom(el).next()[0];
    const modelValue = toRaw(value.props.modelValue);
    updateValue(
      el,
      clonedEl,
      modelValue,
      value.props,
      value.emit,
      value.computedOptions
    );

    // Attach instance
    tomSelectRef.value = clonedEl;
  },
};

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  refKey: {
    type: String,
    default: null,
  },
});

const emit = defineEmits();

const tomSelectRef = ref();
const bindInstance = () => {
  if (props.refKey) {
    const bind = inject(`bind[${props.refKey}]`);
    if (bind) {
      bind(tomSelectRef.value);
    }
  }
};

// Compute all default options
const computedOptions = computed(() => {
  let options = {
    ...props.options,
    plugins: {
      dropdown_input: {},
      ...props.options.plugins,
    },
    render: {
      no_results: function (data, escape) {
        return '<div class="no-results">Không tìm thấy kết quả "' + escape(data.input) + '"</div>';
      },
      ...props.options.render,
    },
  };

  if (Array.isArray(props.modelValue)) {
    options = {
      persist: false,
      create: true,
      onDelete: true,
      ...options,
      plugins: {
        remove_button: {
          title: "Remove this item",
        },
        ...options.plugins,
      },
    };
  }

  return options;
});

// Watch value change
watch(
  computed(() => props.modelValue),
  () => {
    emit("change");
  }
);

onMounted(() => {
  bindInstance();
});
</script>