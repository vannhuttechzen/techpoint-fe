<template>
    <Modal :show="isOpen" size="modal-xl" @hidden="closeModal" class="font-special">
        <img alt="" class="absolute opacity-100 w-full h-full"
             src="/src/assets/images/2.jpg">
        <div class="rounded-lg relative">
            <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModal">
                <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
            <ModalHeader class="pb-8 pt-1">
                <h2 class="pb-1 text-3xl text-orange-800 font-bold pl-8 absolute">Chi tiết quà tặng</h2>
            </ModalHeader>
            <ModalBody>
                <div class="sm:flex sm:items-start">
                    <div class="">
                        <div class=" sm:mt-0">
                            <div class="">
                                <div class="flex ml-20 mt-2">
                                    <label class="text-2xl w-64 font-medium text-orange-900"
                                           for="gift-name">Tên quà tặng</label>
                                    <p id="gift-name"
                                       class="text-2xl font-medium bg-transparent border-none v-text-field  focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-2/4 text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                       required
                                       type="text">{{ gift.name }}</p>
                                </div>
                                <div class="flex mt-4 ml-20">
                                    <div class="">
                                        <div class="flex">
                                            <div class="flex items-end">
                                                <label class="w-64 mt-1 text-lg font-medium text-orange-700"
                                                       for="gift-point">Số điểm tương ứng</label>
                                                <p id="gift-point"
                                                   class=" w-32 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 py-1 px-2 leading-tight focus:outline-none"
                                                   required
                                                   type="number">{{ gift.point }}</p>
                                            </div>
                                        </div>
                                        <div class="flex mt-4 items-end">
                                            <label class="w-64 text-lg font-medium text-orange-700"
                                                   for="gift-point">Số lượng quà</label>
                                            <p id="gift-point"
                                               class=" w-32 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 py-1 px-2 leading-tight focus:outline-none"
                                               required
                                               type="number">{{ gift.quantity }}</p>
                                        </div>
                                        <div class="mt-4 flex">
                                            <div class="mb-4">
                                                <label class="text-lg leading-6 font-medium text-orange-700"
                                                       for="gift-description">Mô tả chi tiết</label>
                                                <textarea id="gift-description" v-model="gift.description"
                                                          class=" mt-2 custom-textarea border-none bg-transparent w-96 h-72 decoration-orange-800 focus:ring-orange-200 leading-tight overflow-y-scroll scroll-view"
                                                          readonly></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" mr-20 mt-4 ">
                                        <label class="relative" for="upload-img">
                                            <img
                                                    :src="gift.img"
                                                    alt="Card Image"
                                                    class="object-cover rounded-md h-72 w-full"
                                            />
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
    name: "DetailGiftModal",
    components: {Error},
    props: ["isOpen", "onClose", "initialGift"],
    data() {
        return {
            errors: {},
            gift: {...this.initialGift},
            tmpImgUrl: this.initialGift.img,
            isValidImage: true,
        }
    },
    methods: {
        closeModal() {
            this.reset();
            this.onClose()
        },
        reset() {
            this.gift = {...this.initialGift}
        }
    }
}
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
</style>