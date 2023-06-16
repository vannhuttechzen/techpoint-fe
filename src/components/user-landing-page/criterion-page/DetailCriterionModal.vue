<template>
  <Modal :show="isOpen" size="modal-xl" @hidden="closeModal">
    <img
        alt=""
        class="absolute opacity-100 w-full h-full"
        src="https://cdn.wallpapersafari.com/58/49/b5taeY.jpg"
    />
    <div class="rounded-lg relative">
      <button
          class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10"
          @click="closeModal"
      >
        <svg
            aria-hidden="true"
            class="h-7 w-7 text-gray-600 hover:text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M6 18L18 6M6 6l12 12"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
          />
        </svg>
      </button>
      <ModalHeader class="pb-8 pt-1">
        <h2 class="text-3xl text-orange-800 font-bold pl-8 absolute">
          Chi tiết tiêu chí
        </h2>
      </ModalHeader>
      <ModalBody>
        <div class="sm:flex sm:items-start ml-4">
          <div>
            <div class="mt-3 sm:mt-0">
              <div class="mt-4 mx-auto ml-52">
                <div class="flex items-end">
                  <label
                      class="text-lg mr-11 w-48 font-sans leading-6 font-medium text-orange-700"
                      for="criterion-name"
                  >
                    Tên tiêu chí
                  </label>
                  <input
                      id="criterion-name"
                      v-model="criterion.name"
                      class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                  />
                </div>
                <div class="flex mt-4 items-end">
                  <label
                      class="w-60 text-lg mr-4 font-sans leading-6 font-medium text-orange-700"
                      for="criterion-point"
                  >
                    Số điểm đổi quà
                  </label>
                  <input
                      id="criterion-point"
                      v-model="criterion.point"
                      class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                      type="number"
                  />
                </div>
                <div class="mt-4 flex">
                  <div class="mr-7">
                    <label
                        class="text-lg font-sans leading-6 font-medium text-orange-700"
                        for="criterion-description"
                    >
                      Mô tả chi tiết
                    </label>
                    <textarea
                        id="criterion-description"
                        v-model="criterion.description"
                        class="custom-textarea ml-4 text-justify mt-4 bg-transparent w-11/12 h-72 focus:ring-orange-200 leading-tight rounded border border-gray-400 overflow-y-scroll scroll-view"
                    ></textarea>
                  </div>
                  <div class="mt-3 mr-9">
                    <label class="relative" for="upload-img">
                      <div
                          :class="{'border-danger': errors.img || errors.size}"
                          class="border-2 border-dashed border-gray-400 aspect-square w-full rounded-lg flex flex-col items-center justify-center"
                      >
                        <div
                            v-if="isValidImage && tmpImgUrl"
                            class="p-3"
                        >
                          <img
                              ref="imgRef"
                              :src="tmpImgUrl"
                              alt=""
                              class="w-64 h-52 object-full"
                          />
                        </div>
                      </div>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <button
                            class="rounded-full bg-orange-800 text-light w-10 h-10 flex items-center justify-center opacity-25"
                        >
                          <svg
                              class="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </div>
  </Modal>
</template>

<script>

export default {
  name: "DetailCriterionModal",
  data() {
    return {
      criterion: {
        ...this.initialCriterion,
        img: null,
        groupId: this.action === "create" ? this.activeGroup.id : null,
      },
      errors: {},
      tmpImgUrl: this.initialCriterion && this.initialCriterion.img ? this.initialCriterion.img : "",
      isValidImage: true,
      showError: false
    };
  },
  props: ["isOpen", "onClose", "initialCriterion", "activeGroup"],
  methods: {
    closeModal() {
      this.onClose();
    }
  }
};
</script>
<style scoped>
textarea {
    font-family: 'Marck Script', cursive;
    font-size: 17px;
    line-height: 40px;
    resize: none;
}

.v-text-field {
    border: none;
    border-bottom: 1px solid #7c2d12;
    padding-bottom: 2px;
}

textarea::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to right, wheat, white);
}

textarea::-webkit-scrollbar-thumb {
    background: white;
}
</style>
