<template>
    <div class="container sm:px-10">
        <div class="block xl:grid grid-cols-2 gap-4">
            <div class="hidden xl:flex flex-col min-h-screen">
                <div class="my-auto">
                    <img alt="Midone Tailwind HTML Admin Template" class="-intro-x w-1/2 -mt-16"
                         src="@/assets/images/illustration.svg"/>
                    <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                        Hãy lựa chọn đăng nhập <br/>
                        Để sử dụng các dịch vụ phù hợp.
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-center justify-center h-screen">
                <h1 class="text-2xl intro-x font-bold xl:text-3xl text-center xl:text-left text-blue-900 ">Chào mừng bạn đến với Techzen Service!</h1>
                <ul class="flex justify-center space-x-4 md:space-x-6 lg:space-x-8 mt-11">
                    <li class="rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <a class="block py-4 px-6 text-lg md:text-xl lg:text-2xl text-center text-white hover:text-gray-100"
                           href=""> Techzai
                        </a>
                    </li>
                    <li class="rounded-md bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                        <a class="block py-4 px-6 text-lg md:text-xl lg:text-2xl text-center text-white hover:text-gray-100"
                           href="/techpoint">
                            Techpoint
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IntermediatePage',
    methods: {
        navigateTo(path) {
            this.$router.push(path);
        }
    },
    mounted() {
        document.body.classList.add("login")
    }
}
</script>

<style scoped>

</style>
