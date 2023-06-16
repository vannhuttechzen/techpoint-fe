<template>
    <div class="h-[70vh]">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium flex items-center space-x-5 mr-20">
                Danh sách quà tặng
            </h3>
            <div class="flex relative">
                <input
                        id="search"
                        v-model="searchTerm"
                        class="w-96 pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                        placeholder="Tìm kiếm theo tên"
                        type="text"
                />
                <div class="absolute top-0 left-0 inline-flex items-center p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="flex items-end mt-1 gap-2 mr-5">
            <svg class="w-8 h-8 text-pink-400 fill-pink-200" fill="" stroke="currentColor"
                 stroke-width={1.5}
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>
            </svg>
            <p class="text-base font-sans font-medium"> Số lượng quà tặng đang có </p>
        </div>
        <div class="flex items-end mt-2 gap-2 mr-5 ">
            <svg class="w-8 h-8 fill-yellow-400 text-white" fill="none" stroke="currentColor"
                 stroke-width={1.5}
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
            <p class="text-base font-sans font-medium"> Số điểm tương ứng để đổi quà </p>
        </div>
        <div class="flex items-start justify-center mt-6">
            <div class="w-full h-full">
                <GiftBoard :gift-list="filledList"/>
            </div>
        </div>
    </div>
</template>
<script>
import GiftBoard from "@/components/gift-management/GiftBoard.vue";
import {mapGetters} from "vuex";

export default {
    name: "GiftManagement",
    components: {GiftBoard},
    data() {
        return {
            searchTerm: "",
        }
    },
    async created() {
        this.$store.dispatch("gifts/fetchGifts")
    },
    computed: {
        gifts() {
            return gifts
        },
        ...mapGetters({
            giftList: "gifts/getList"
        }),
        filledList() {
            if (this.searchTerm === "") {
                return this.giftList
            }

            return this.giftList.filter(gift => gift.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()))
        }
    }
}
</script>

<style scoped>
input:focus {
    border-color: #63b3ed;
    box-shadow: 0 0 0 2px #63b3ed;
}

</style>