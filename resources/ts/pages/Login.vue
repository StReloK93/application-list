<template>
    <main class="overflow-hidden absolute inset-0">
        <section class="w-svw">
            <div class="bg-no-repeat bg-cover bg-center relative" style="background-image: url('/fon.gif')">
                <router-link to="/"
                    class="text-blue-600 absolute top-5 left-1/2 -translate-x-1/2 z-50 bg-white w-14 h-14 inline-flex justify-center items-center rounded-full fa-bounce shadow-md">
                    <i class="fa-solid fa-house"></i>
                </router-link>
                <div class="absolute bg-gradient-to-b from-gray-900 to-gray-800 opacity-90 inset-0 z-0">
                </div>
                <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div class="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
                        <div class="self-start hidden lg:flex flex-col  text-white">
                            <img src="" class="mb-3">
                            <h1 class="mb-3 font-bold text-5xl">Hush kelibsiz!</h1>
                            <p class="pr-3">SHKB dasturlar ro'yhati admin paneliga kirish sahifasidasiz.</p>
                        </div>
                    </div>
                    <div class="flex justify-center self-center  z-10">
                        <div ref="loginblock" class="p-12 bg-white mx-auto rounded-2xl w-100 opacity-0">
                            <div class="mb-4">
                                <h3 class="font-semibold text-2xl text-gray-800">Kirish</h3>
                                <div v-if="errors" class="text-red-600">
                                    {{ errors.message }}
                                </div>
                            </div>
                            <form @submit.prevent="loginHandler" class="space-y-5">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Login</label>
                                    <input v-model="formData.login"
                                        class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="" placeholder="Login">
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                        Password
                                    </label>
                                    <input v-model="formData.password"
                                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="password" placeholder="password">
                                </div>
                                <div>
                                    <button type="submit"
                                        class="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Kirish
                                    </button>
                                </div>
                            </form>
                            <div class="pt-5 text-center text-gray-400 text-xs">
                                <span>
                                    UAKTM ©
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'
const loginblock = ref()
const Auth = useAuthStore()
const errorOut = ref(null)
const formData = reactive({
    password: null,
    login: null
})
const errors = ref(null)
async function loginHandler() {
    clearInterval(errorOut.value)
    errors.value = await Auth.login(formData)

    errorOut.value = setTimeout(() => errors.value = null, 3000);
}
defineExpose({ loginblock })
</script>