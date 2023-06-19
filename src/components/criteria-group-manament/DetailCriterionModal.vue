<template>
    <Modal :show="isOpen" size="modal-xl" @hidden="closeModal" class="font-special">
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
                <h2
                    v-if="action === 'update' || action === 'create'"
                    class="text-3xl text-orange-800 font-bold pl-8 absolute"
                >
                    {{ action === 'update' ? 'Chi tiết tiêu chí' : 'Thêm mới tiêu chí' }}
                </h2>
            </ModalHeader>
            <ModalBody>
                <div class="sm:flex sm:items-start ml-4">
                    <div>
                        <div class="mt-3 sm:mt-0">
                            <div class="mt-4 mx-auto ml-52">
                                <div class="flex items-end">
                                    <label
                                        class="text-lg mr-11 w-48 leading-6 font-medium text-orange-700"
                                        for="criterion-name"
                                    >
                                        Tên tiêu chí
                                    </label>
                                    <input
                                        id="criterion-name"
                                        v-model="criterion.name"
                                        class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                        required
                                        type="text"
                                    />
                                </div>
                                <div class="flex mt-4 items-end">
                                    <label
                                        class="w-60 text-lg mr-4 leading-6 font-medium text-orange-700"
                                        for="criterion-point"
                                    >
                                        Số điểm tương ứng
                                    </label>
                                    <input
                                        id="criterion-point"
                                        v-model="criterion.point"
                                        class="mr-9 v-text-field font-medium bg-transparent border-none focus:border-orange-500 decoration-orange-800 focus:ring focus:ring-orange-200 w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                        required
                                        type="number"
                                    />
                                </div>
                                <div class="mt-4 flex">
                                    <div class="mr-7">
                                        <label
                                            class="text-lg leading-6 font-medium text-orange-700"
                                            for="criterion-description"
                                        >
                                            Mô tả chi tiết
                                        </label>
                                        <textarea
                                            id="criterion-description"
                                            v-model="criterion.description"
                                            class="custom-textarea ml-4 text-justify mt-4 bg-transparent w-11/12 h-72 focus:ring-orange-200 leading-tight rounded border border-gray-400 overflow-y-scroll scroll-view"
                                            :required="action === 'update' || action === 'create'"
                                            v-if="action === 'update' || action === 'create'"
                                        ></textarea>
                                    </div>
                                    <div class="mt-3 mr-9">
                                        <label class="relative">
                                            <div :class="{'border-danger': errors.img || errors.size}"
                                                 class="border-2 border-dashed border-primary aspect-square w-4/5 rounded-lg flex flex-col items-center">
                                                <div class="p-4 w-full">
                                                    <div class="relative h-full zoom-in ">
                                                        <div v-if="checkDelete === 'update'" data-v-9f00ac50=""
                                                             class="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                                                             @click="deleteImg">
                                                            <svg data-v-9f00ac50="" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                                 stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4">
                                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                                            </svg>
                                                        </div>
                                                        <img ref="imgRef" :src="this.tmpImgUrl" alt="image-default"
                                                             class="w-64 h-full rounded-lg overflow-hidden object-cover" style="height: 173px">

                                                    </div>
                                                </div>
                                                <div class="mb-4 flex items-center justify-center">

                                                    <button class="btn-upload-img relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24"
                                                             fill="none" class="svg-icon">
                                                            <g stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd"
                                                               clip-rule="evenodd">
                                                                <path
                                                                  d="m4 9c0-1.10457.89543-2 2-2h2l.44721-.89443c.33879-.67757 1.03131-1.10557 1.78889-1.10557h3.5278c.7576 0 1.4501.428 1.7889 1.10557l.4472.89443h2c1.1046 0 2 .89543 2 2v8c0 1.1046-.8954 2-2 2h-12c-1.10457 0-2-.8954-2-2z"></path>
                                                                <path d="m15 13c0 1.6569-1.3431 3-3 3s-3-1.3431-3-3 1.3431-3 3-3 3 1.3431 3 3z"></path>
                                                            </g>
                                                        </svg>
                                                        <span class="lable">Chọn ảnh</span>
                                                        <input
                                                          ref="uploadImage"
                                                          class="absolute opacity-0 w-full h-full rounded-2xl"
                                                          type="file"
                                                          @change="onChooseFile"
                                                        />
                                                    </button>
                                                </div>
                                                <div class="invalid-feedback font-sans font-medium text-center" v-for="(item, index) in errorImages" v-bind:key="index">{{ item }}</div>
                                                <Error :hidden="!errors.img&&!errors.size"
                                                       :message="errors.img || errors.size"/>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="showError" class="text-red-500 mt-2 text-center">
                    Vui lòng điền đầy đủ thông tin vào các trường!
                </div>
                <div class="flex justify-center mt-7 mb-7">
                    <button
                        class="w-24 mr-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        @click="closeModal"
                    >
                        Huỷ
                    </button>
                    <button
                        v-if="action === 'update'"
                        class="w-24 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        @click="saveCriterion"
                    >
                        Cập nhật
                    </button>
                    <button
                        v-else-if="action === 'create'"
                        class="w-24 bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        @click="saveCriterion"
                    >
                        Thêm
                    </button>
                </div>
            </ModalBody>
        </div>
    </Modal>
</template>

<script>
import Swal from "sweetalert2";
import CriterionApi from "@/api/CriterionApi";
import Error from "@/components/core/Error.vue";
import AvatarDefault from "@/assets/images/avatar-default.png";

export default {
    name: "DetailCriterionModal",
    components: { Error },
    data() {
        return {
            criterion: {
                ...this.initialCriterion,
                img: null,
                groupId: this.action === "create" ? this.activeGroup.id : null,
            },
            errors: {},
            tmpImgUrl: AvatarDefault,
            isValidImage: true,
            showError: false,
            errorImages: [],
            avatarDefault: AvatarDefault,
            checkDelete: this.action,
        };
    },
    props: ["isOpen", "onClose", "initialCriterion", "action", "activeGroup"],
    methods: {
        async saveCriterion() {
            this.errors = {};
            this.showError = false;

            if (
                !this.criterion.name ||
                !this.criterion.point ||
                !this.criterion.description
            ) {
                this.showError = true;
                return;
            }

            try {
                const data = this.$h.convertJsonToFormData(this.criterion);
                let res;
                this.validateImage()
                if (this.action === "update") {
                    res = await CriterionApi.updateCriterion(this.criterion.id, data);
                } else if (this.action === "create") {
                    res = await CriterionApi.createNewCriterion(data);
                }

                if (res.status === 200) {
                    this.closeModal();
                    this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList");

                    let successMessage;
                    if (this.action === "update") {
                        successMessage = `Cập nhật tiêu chí <b>${this.criterion.name}</b> thành công!`;
                    } else if (this.action === "create") {
                        successMessage = "Tạo mới tiêu chí thành công!";
                    }
                    await Swal.fire({
                        title: successMessage,
                        timerProgressBar: true,
                        icon: "success",
                        didOpen: () => {
                            const titleElement = document.querySelector(".swal2-title");
                            titleElement.style.lineHeight = "1";
                        },
                    });
                }
            } catch (e) {
                this.errors = e.data.errors;
            }
        },
        onChooseFile(e) {
            this.errors = {...this.errors, size: "", img: ""}
            let files = e.target.files || e.dataTransfer.files
            this.criterion.img = files[0]
            this.tmpImgUrl = URL.createObjectURL(files[0])
            this.checkDelete = "update"
        },
        closeModal() {
            this.onClose();
        },
        reset() {
            URL.revokeObjectURL(this.tmpImgUrl);
            this.tmpImgUrl = this.action == "update" ? this.initialCriterion.img : this.avatarDefault;
            this.errors = {};

            if (this.action === "create") {
                this.criterion = {
                    ...this.initialCriterion,
                    groupId: this.activeGroup.id,
                };
            } else if (this.action === "update"){
                this.criterion = { ...this.initialCriterion };
            }
        },
        deleteImg() {
            this.checkDelete = "create"
            this.errors = {...this.errors, size: "", img: ""}
            this.criterion.img = this.avatarDefault
            this.tmpImgUrl = this.avatarDefault
        },
        validateImage() {
            let file = this.$refs.uploadImage.files[0]
            let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
            this.errorImages = []
            if (!file) {
                this.errorImages.push('Vui lòng chọn hình ảnh.')
                return
            }
            if (!allowedTypes.includes(file.type)) {
                this.errorImages.push('Loại tệp không hợp lệ. Chỉ cho phép jpeg, png và jpg.')
                return
            }
            if (file.size > 500000) {
                this.errorImages.push('Kích thước tệp quá lớn. Kích thước tối đa là 500KB.')
                return
            }
        },
    },
    watch: {
        isOpen(val) {
            if (!val) {
                this.reset();
            }
        },
        tmpImgUrl(crc, oldSrc) {
            URL.revokeObjectURL(oldSrc);
        },
        initialCriterion: {
            deep: true,
            handler(newCriterion) {
                this.criterion = { ...newCriterion, img: null };
                this.tmpImgUrl = newCriterion.img;
            },
        },
        activeGroup(val) {
            this.criterion.groupId = val.id;
        },
        action(newValue, oldValue) {
            this.errorImages = []
            this.checkDelete = newValue
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
.upload-img {
    top: 80%;
    left: 40%;
    transform: translate(-50%)
}
.btn-upload-img {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 12px;
    gap: 8px;
    height: 40px;
    width: 172px;
    border: none;
    background: #FF2849;
    border-radius: 20px;
    cursor: pointer
}
.btn-upload-img .lable {
    line-height: 22px;
    font-size: 17px;
    color: #fff;
    letter-spacing: 1px
}
.btn-upload-img:hover {
    background: #e52441
}

.btn-upload-img:hover .svg-icon {
    animation: flickering 2s linear infinite
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
@keyframes flickering {
    0% {
        opacity: 1
    }

    50% {
        opacity: 1
    }

    52% {
        opacity: 1
    }

    54% {
        opacity: 0
    }

    56% {
        opacity: 1
    }

    90% {
        opacity: 1
    }

    92% {
        opacity: 0
    }

    94% {
        opacity: 1
    }

    96% {
        opacity: 0
    }

    98% {
        opacity: 1
    }

    99% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
}
</style>
