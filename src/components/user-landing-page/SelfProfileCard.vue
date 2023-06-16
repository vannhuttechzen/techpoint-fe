<template>
    <div>
        <div class="flex items-center rounded-lg">
            <div class="flex items-center gap-4 w-52 rounded-full">
                <button
                  class="bg-blue-950 rounded-full w-28 mt-2 mb-2 flex items-center justify-center gap-1 ml-5 transition-transform transform hover:scale-110"
                  @click="filterGifts"
                >
                    <svg class="w-10 h-10 fill-yellow-400 stroke-yellow-400" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                    </svg>
                    <div class="text-xl font-bold text-white">{{ selfPointInfo.totalOfPoint }}</div>
                </button>
                <div class="text-base">
                    <b>Top {{ selfPointInfo.rank }}</b><br />
                </div>
            </div>
            <img :src="avatarUrl" alt="" class="w-16 aspect-square rounded-full object-cover ring-2 ring-[#354259]" />
        </div>
        <img @click="handleLogout"  class="ml-32 w-36 cursor-pointer transition-transform transform hover:scale-110" src="/src/assets/images/logout.png" />
    </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "SelfProfileCard",
    computed: {
        ...mapGetters({
            selfPointInfo: "point/getSelfPointInfo",
            username: "auth/username",
            avatarUrl: "auth/avatarUrl"
        }),

        userPoint() {
            return this.getPoint;
        }
    },
    methods: {
        filterGifts() {
            this.$emit('filter-gifts', this.selfPointInfo.totalOfPoint);
        },
        handleLogout() {
            const isLogout = this.logout();
            this.$router.push('/login');
        },
        ...mapActions('auth', ['logout']),
    }
}
</script>

<style scoped></style>
