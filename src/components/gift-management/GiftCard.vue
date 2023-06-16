<template>
    <div class="bg-blue-300 text-white rounded-lg p-3 relative w-full aspect-[1/2] h-80">
        <button class="absolute top-0 right-0 text-gray-600 hover:text-red-600" @click="onDelete">
            <svg class="h-6 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd"
                      d="M12.707 7.293a1 1 0 010 1.414L9.414 11l3.293 3.293a1 1 0 01-1.414 1.414L8 12.414l-3.293 3.293a1 1 0 01-1.414-1.414L6.586 11 3.293 7.707a1 1 0 011.414-1.414L8 9.586l3.293-3.293a1 1 0 011.414 0z"
                      fill-rule="evenodd"/>
            </svg>
        </button>
        <img
                :src="gift.img"
                alt="Card Image"
                class=" object-cover rounded-md h-52 mt-2 w-full"
                data-action="zoom"
        />
        <h3 class="text-lg font-medium mt-2 text-center">{{ gift.name }}</h3>
        <div class="flex mr-10 ml-10 justify-between ">
            <div class="flex items-end mt-2 gap-2 ml-5">
                <svg class="w-8 h-8 text-pink-400 fill-pink-200" fill="" stroke="currentColor"
                     stroke-width={1.5}
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
                <p class="text-white text-lg"> {{ gift.quantity }}</p>
            </div>

            <div class="flex items-end mt-2 gap-2 mr-5">
                <svg class="w-8 h-8 fill-yellow-400" fill="none" stroke="currentColor"
                     stroke-width={1.5}
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
                <p class="text-white text-lg">{{ gift.point }}</p>
            </div>

        </div>
        <div class="flex items-center justify-center mt-10">
            <button class="absolute bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl inline-flex items-center"
                    @click="openModal">
                Chi tiết
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
        <DetailGiftModal :initial-gift="Object.assign({},gift)"
                         :is-open="isModalOpen"
                         :on-close="closeModal"
                         :action-modal="actionModal"/>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import GiftsApi from "@/api/GiftsApi";
import DetailGiftModal from "@/components/gift-management/DetailGiftModal.vue";

export default {
    name: "GiftCard",
    components: {DetailGiftModal},
    props: ["gift"],
    data() {
        return {
            isModalOpen: false,
            actionModal: null
        }
    },
    methods: {
        openModal() {
            this.actionModal = "UPDATE"
            this.isModalOpen = true
        },
        closeModal() {
            this.isModalOpen = false
        },
        async onDelete() {
            const result = await Swal.fire({
                title: 'Bạn có chắc muốn xóa?',
                text: "Hành động này không thể hoàn tác!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9a3412',
                cancelButtonColor: '#4b5563',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy bỏ',
                reverseButtons: true
            })

            if (result.isConfirmed) {
                try {
                    const res = await GiftsApi.deleteById(this.gift.id)
                    if (res.status === 200) {
                        this.$store.dispatch("gifts/fetchGifts")
                        await Swal.fire(
                            {
                                title: `<span style="font-weight: normal">Bạn đã xoá</span> <b>${this.gift.name}</b> <span style="font-weight: normal">thành công!</span>`,
                                timerProgressBar: true,
                                icon: "success",
                                didOpen: () => {
                                    const titleElement = document.querySelector('.swal2-title');
                                    titleElement.style.lineHeight = '1';
                                }
                            }
                        )
                    }
                } catch (e) {
                    await Swal.fire(
                        {
                            title: `Có lỗi xảy ra!!`,
                            timerProgressBar: true,
                            icon: "error"
                        }
                    )
                }
            }
        }
    }
}
</script>

<style scoped>
.my-title-class {
    line-height: 1.5rem;
}
</style>