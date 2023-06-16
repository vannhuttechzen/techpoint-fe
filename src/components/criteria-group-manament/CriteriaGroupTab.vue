<template>
    <div class="bg-gray-200 flex items-center justify-between p-4 mb-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 h-[6vh] cursor-pointer"
         @click="onClick">
        <div class="truncate mt-1 ml-3 text-lg font-bold">{{ group.name }}</div>
        <button class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                type="button"
                @click.stop="handleDelete">
            <span class="sr-only ">Trash</span>

            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke-linecap="round"
                      stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import CriteriaGroupsApi from "@/api/CriteriaGroupsApi";

export default {
    name: "CriteriaGroupTab",
    props: ["group", "onClick"],
    methods: {
        async handleDelete() {
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
                    const res = await CriteriaGroupsApi.deleteById(this.group.id)
                    if (res.status === 200) {
                        this.$store.dispatch("criteriaGroup/fetchCriteriaGroupList")
                        await Swal.fire(
                            {
                                title: `<span style="font-weight: normal">Bạn đã xoá</span> <b>${this.group.name}</b> <span style="font-weight: normal">thành công!</span>`,
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

