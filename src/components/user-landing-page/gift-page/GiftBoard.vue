<template>
    <div class="h-full w-full rounded-xl p-8">
        <div class=" pr-11 opacity-90 grid grid-cols-3 gap-x-12 gap-y-12 overflow-y-scroll h-[70vh] scroll-view">
            <GiftCard v-for="gift in giftList" :key="gift.id" :gift="gift"/>
        </div>
    </div>
</template>

<script>
import GiftCard from "@/components/user-landing-page/gift-page/GiftCard.vue";

export default {
    components: {GiftCard},
    props: ["giftList"],
}
</script>

<style>
</style>

