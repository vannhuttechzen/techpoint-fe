<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-14 mt-9 overflow-y-scroll h-[79vh] scroll-view">
        <CriterionCard v-for="criterion in criterionList" :key="criterion.id" :criterion="criterion"/>
    </div>
</template>

<script>

import CriterionCard from "@/components/user-landing-page/criterion-page/CriterionCard.vue";

export default {
    components: {CriterionCard},
    props: ["criterionList"],
}
</script>