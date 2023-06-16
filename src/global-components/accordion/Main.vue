<template>
    <div class="">
        <div class="tab__header">
            <h2 class="intro-x text-lg font-medium mt-4 text-white bg-blue-800 hover:text-zinc-300 ml-2" v-if="title === 'lang.CHECKIN.CK4'" @click.prevent="active = !active">{{$t(title)}}</h2>
            <h2 class="intro-x text-lg font-medium mt-4 text-white bg-red-600 hover:text-zinc-300 ml-2" v-if="title === 'lang.CHECKIN.CK9'" @click.prevent="active = !active">{{$t(title)}}</h2>
        </div>
        <div class="tab__content p-2" v-show="active"><slot /></div>
    </div>
</template>

<script>
export default {
    name: "Accordion",
    props: [
        'title'
    ],
    data() {
        return {
            active: true
        }
    }
}
</script>

<style scoped>
body{
    background-color:#f1f5f8;
}
h2 {
    height: 40px;
    display: flex;
    align-items: center;
    width: 240px;
    border-top-right-radius: 10px;
    justify-content: center;
    cursor: pointer;
}
</style>