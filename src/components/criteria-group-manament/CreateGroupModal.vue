<template xmlns="http://www.w3.org/1999/html">
    <Modal :show="isOpen" size="modal-lg" @hidden="closeModalHandler">
        <img alt=""
             class="absolute opacity-60 rounded-lg w-full h-full object-cover"
             src="https://storage.pixteller.com/designs/designs-images/2019-03-27/05/funny-background-drawing-backgrounds-cartoon-1-5c9b97d1c4d88.png">
        <div class="rounded-lg relative">
            <button class="mx-auto flex items-center mr-3 pt-4 pr-3 justify-center h-10 w-10" @click="closeModalHandler">
                <svg aria-hidden="true" class="h-7 w-7 text-gray-600 hover:text-red-600" fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>
            </button>
            <div class="pb-20">
                <h2 class="text-3xl text-orange-800 font-bold absolute -mt-4 pl-16 ">Thêm nhóm tiêu chí</h2>
            </div>
            <ModalBody class="modal-xl">
                <transition
                        mode="out-in"
                        name="fade"
                >
                    <div>
                        <div class="flex align-center justify-center mb-4">
                            <div class="w-1/3 font-bold text-base align-baseline text-orange-800">Tên nhóm tiêu chí
                            </div>
                            <div class="w-2/3">
                                <input
                                        v-model.trim="groupName"
                                        class="form-control mb-2"
                                        placeholder="Nhập tên nhóm tiêu chí"
                                        type="text"
                                />
                            </div>
                        </div>
                        <div class="flex align-center justify-center mb-4">
                            <div class="w-1/3 font-bold text-base align-baseline text-orange-800">Các thành viên đánh
                                giá
                            </div>
                            <div class="w-2/3">
                                <AvatarMultipleSelect ref="avatarMultipleSelect"
                                                      :data="users.map(user => ({img: user.avatarUrl,name: user.name, value: user.id}))"
                                                      @change-selection="setSelectedAdmins"/>
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="flex justify-center mt-4 mb-4">
                    <button class="px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-lg mr-2 w-24"
                            @click="closeModalHandler">Hủy
                    </button>
                    <button class="px-4 py-2 bg-orange-700 hover:bg-orange-500 text-white rounded-lg w-24"
                            @click="createGroup">
                        Thêm
                    </button>
                </div>
            </ModalBody>
        </div>
    </Modal>
</template>

<script>
import Error from "@/components/core/Error.vue";
import AvatarMultipleSelect from "@/components/core/AvatarMultipleSelect.vue";
import {mapGetters} from "vuex";
import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";
import Swal from "sweetalert2";

export default {
    name: "CreateGroupModal",
    components: {AvatarMultipleSelect, Error},
    props: ["isOpen", "onClose"],
    data() {
        return {
            groupName: "",
            selectedAdmins: [],
        }
    },
    computed: {
        ...mapGetters({
            users: "users/getList"
        }),
    },
    methods: {
        setSelectedAdmins(val) {
            this.selectedAdmins = val
        },
        closeModalHandler() {
            this.selectedAdmins = []
            this.$refs.avatarMultipleSelect.resetSelectedElements()
            this.onClose()
        },
        async createGroup() {
            try {
                const res = await CriteriaGroupsApi.create({name: this.groupName, adminIds: this.selectedAdmins})
                if (res.status === 200) {
                    this.closeModalHandler()
                    this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")

                    await Swal.fire(
                        {
                            title: `<span style="font-weight: normal">Thêm mới nhóm</span> <b>${this.groupName}</b> <span style="font-weight: normal">thành công!</span>`,
                            timerProgressBar: false,
                            icon: "success",
                            didOpen: () => {
                                const titleElement = document.querySelector('.swal2-title');
                                titleElement.style.lineHeight = ('1');
                            }
                        }
                    )

                    this.groupName = ""
                }
            } catch (e) {
                this.closeModalHandler()
                await Swal.fire(
                    {
                        title: `Có lỗi xảy ra!!`,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: "error"
                    }
                )
            }
        }
    }
}
</script>

<style scoped>

</style>