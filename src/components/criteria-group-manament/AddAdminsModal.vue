<template>
    <Modal :show="isOpen" size="modal-lg" @hidden="closeModal">
        <img alt="" class="absolute opacity-100 w-full h-full object-cover"
             src="https://c4.wallpaperflare.com/wallpaper/563/90/366/14476460-funny-wallpaper-preview.jpg">
        <div class="rounded-lg relative">
            <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModal">
                <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
            <div class="pb-20">
                <h2 class="text-3xl text-orange-800 font-bold absolute -mt-4 pl-16 ">Thêm người đánh giá</h2>
            </div>
            <ModalBody>
                <transition
                        mode="out-in"
                        name="fade"
                >
                    <div class="p-5 h-full">
                        <label class="text-start text-base text-orange-800 leading-10 w-full z-10">Chọn người đánh giá
                            nhóm
                            <b>{{ activeGroup.name }}</b> </label>
                        <div class="py-5">
                            <AvatarMultipleSelect ref="avatarMultipleSelect"
                                                  :data="availableAdmins"
                                                  :excluded-data="excludedAdminIds"
                                                  @change-selection="setSelectedAdmins"
                            />
                        </div>
                    </div>
                </transition>
                <div class="flex justify-center mt-4">
                    <button class="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-lg mr-2 w-24"
                            @click="closeModal">Hủy
                    </button>
                    <button class="px-4 py-2 bg-orange-700 hover:bg-orange-500 text-white rounded-lg w-24"
                            @click="addNewAdmins">Thêm
                    </button>
                </div>
            </ModalBody>
        </div>
    </Modal>
</template>

<script>
import Swal from "sweetalert2";
import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";
import AvatarMultipleSelect from "@/components/core/AvatarMultipleSelect.vue";
import {mapGetters} from "vuex";

export default {
    name: "AddAdminsModal",
    components: {AvatarMultipleSelect},
    props: ["excludedAdmins", "activeGroup", "isOpen", "onClose"],
    data() {
        return {
            selectedAdmins: []
        }
    },
    computed: {
        ...mapGetters({
            users: "users/getList"
        }),
        availableAdmins() {
            return this
                .users
                .map(user => ({img: user.avatarUrl, name: user.name, value: user.id}))
        },
        excludedAdminIds() {
            return this.excludedAdmins.map(admin => admin.id)
        }
    },
    methods: {
        setSelectedAdmins(val) {
            this.selectedAdmins = val
        },
        async addNewAdmins() {
            if (this.selectedAdmins.length === 0) {
                this.closeModal()
                await Swal.fire({
                        title: 'Không admin nào được thêm!',
                        timerProgressBar: true,
                        icon: "error"
                    }
                )
                return
            }
            const res = await CriteriaGroupsApi.addAdmins(this.activeGroup.id, {adminIds: this.selectedAdmins})
            if (res.status === 200) {
                this.closeModal()
                await Swal.fire({
                    title: 'Thêm admin thành công!',
                    timerProgressBar: true,
                    icon: "success"
                })
                this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
                this.resetSelectedAdmins()
            } else {
                await Swal.fire(
                    'Có lỗi xảy ra!',
                    "",
                    'error'
                )
            }
        },
        closeModal() {
            this.resetSelectedAdmins()
            this.onClose()
        },
        resetSelectedAdmins() {
            this.selectedAdmins = []
            this.$refs.avatarMultipleSelect.resetSelectedElements()
        }
    }
}
</script>

<style scoped>

</style>
