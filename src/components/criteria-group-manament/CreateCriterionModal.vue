<template>
    <Modal :show="isOpen" size="modal-xl" @hidden="closeModal">
        <img alt="" class="absolute opacity-100 w-full h-full "
             src="https://cdn.wallpapersafari.com/58/49/b5taeY.jpg">
        <div class="rounded-lg relative">
            <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModal">
                <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
            <ModalHeader class="pb-8 pt-1">
                <h2 class="text-3xl text-orange-800 font-bold pl-8 absolute ">Thêm mới tiêu chí</h2>
            </ModalHeader>
            <ModalBody>
                <div class="sm:flex sm:items-start ml-4">
                    <div class="">
                        <div class="mt-3 sm:mt-0">
                            <div class="mt-4 mx-auto ml-52">
                                <div class="flex items-end">
                                    <label class="text-lg mr-11 w-48 font-sans leading-6 font-medium text-orange-700"
                                           for="criterion-name">Tên tiêu chí</label>
                                    <input id="criterion-name" v-model="criterion.name"
                                           class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                           required
                                           type="text">
                                </div>
                                <div class="flex mt-4 items-end">
                                    <label class="w-60 text-lg mr-4 font-sans leading-6 font-medium text-orange-700"
                                           for="criterion-point">Số điểm đổi quà</label>
                                    <input id="criterion-point" v-model="criterion.point"
                                           class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                           required
                                           type="number">
                                </div>
                                <div class="mt-4 flex">
                                    <div class="mr-7">
                                        <label class="text-lg font-sans leading-6 font-medium text-orange-700"
                                               for="criterion-description">Mô tả chi tiết</label>
                                        <textarea id="criterion-description" v-model="criterion.description"
                                                  class="custom-textarea ml-2 text-justify mt-1 border-none bg-transparent w-full h-72 decoration-orange-800 focus:ring-orange-200 leading-tight overflow-y-scroll scroll-view"
                                                  required></textarea>
                                    </div>
                                    <div class="mt-3 mr-9 ">
                                        <label class="relative" for="upload-img">
                                            <div :class="{'border-danger': errors.img || errors.size}"
                                                 class="border-2 border-dashed border-primary aspect-square w-full rounded-lg flex flex-col items-center justify-center">
                                                <div v-if="isValidImage && this.tmpImgUrl" class="p-3">
                                                    <img ref="imgRef" :src="this.tmpImgUrl" alt=""
                                                         class="w-64 h-52 object-full">
                                                </div>
                                                <div v-else>
                                                    <div class="text-center text-danger">Ảnh không hợp lệ</div>
                                                    <div class="text-center text-danger">Hệ thống chỉ hỗ trợ PNG, JPG,
                                                        JPEG, GIF!
                                                    </div>
                                                </div>
                                                <Error :hidden="!errors.img&&!errors.size"
                                                       :message="errors.img || errors.size"/>
                                            </div>
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <button class="rounded-full bg-orange-800 text-light w-10 h-10 flex items-center justify-center">
                                                    <svg class="w-6 h-6" fill="none"
                                                         stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                              stroke-linecap="round"
                                                              stroke-linejoin="round"/>
                                                    </svg>
                                                </button>
                                                <input
                                                    id="upload-img"
                                                    class="absolute opacity-0"
                                                    type="file"
                                                    @change="onChooseFile"
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="showError" class="text-red-500 mt-2 text-center">Vui lòng điền đầy đủ thông tin vào các
                    trường!
                </div>
                <div class="flex justify-center mt-7 mb-7">
                    <button class="w-24 mr-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                            @click="closeModal">
                        Huỷ
                    </button>
                    <button class=" w-24 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            @click="createCriterion">
                        Thêm
                    </button>
                </div>
            </ModalBody>
        </div>
    </Modal>
</template>

<script>
import CriterionApi from "@/api/CriterionApi";
import Swal from "sweetalert2";
import Error from "@/components/core/Error.vue";

export default {
    name: "CreateCriterionModal",
    components: {Error},
    data() {
        return {
            criterion: {...this.initialCriterion, groupId: this.activeGroup.id},
            errors: {},
            tmpImgUrl: "",
            isValidImage: true
        }
    },
    props: ["isOpen", "onOpen", "onClose", "activeGroup"],
    methods: {
        async createCriterion() {
            this.errors = {}
            try {
                const res = await CriterionApi.createNewCriterion(this.$h.convertJsonToFormData(this.criterion))
                if (res.status === 200) {
                    this.closeModal()
                    this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
                    await Swal.fire({
                        title: 'Tạo mới tiêu chí thành công!',
                        timerProgressBar: true,
                        icon: "success",
                        didOpen: () => {
                            const titleElement = document.querySelector('.swal2-title');
                            titleElement.style.lineHeight = ('1');
                        }
                    })
                }
            } catch (e) {
                this.errors = e.data.errors
            }
        },
        onChooseFile(e) {
            this.errors = {...this.errors, size: "", img: ""}
            const file = e.target.files[0]

            if (this.$h.isAnImage(file.name)) {
                this.criterion.img = file
                this.tmpImgUrl = URL.createObjectURL(file);
                this.isValidImage = true
            } else {
                this.isValidImage = false
            }
        },
        closeModal() {
            this.reset();
            this.onClose()
        },
        reset() {
            URL.revokeObjectURL(this.tmpImgUrl)
            this.tmpImgUrl = ""
            this.criterion = {...this.initialCriterion, groupId: this.activeGroup.id}
            this.errors = {}
        }
    },
    watch: {
        tmpImgUrl(crc, oldSrc) {
            URL.revokeObjectURL(oldSrc)
        },
        activeGroup(val) {
            this.criterion.groupId = val.id
        }
    }
}
</script>

<style>
</style>
