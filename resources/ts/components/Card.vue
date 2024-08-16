<template>
    <section class="p-6 pb-5 bg-white shadow-md rounded-xl">
        <UpdateAppForm v-if="editAppHandler" :application="application" @close="editAppHandler = false" />
        <main class="h-52 lg:h-52 xl:h-52 2xl:h-60">
            <div class="flex items-center">
                <article class="flex justify-center items-center w-12 h-12 border rounded-md">
                    <img :src="'/icons/' + application.icon" class="w-9">
                </article>
                <nav class="leading-none flex-grow ml-5">
                    <a class="text-xs text-gray-400 hover:text-blue-500" :href="'http://' + application.link"
                        target="_blank">
                        <h3 class="font-bold text-base text-slate-800">
                            {{ application.name }}
                        </h3>
                        <i class="fa-light fa-link-simple text-blue-400"></i>
                        {{ application.link }}
                    </a>
                </nav>
            </div>

            <ul class="text-sm text-gray-500 mt-4">
                <li v-for="task in application.tasks">
                    <i class="fa-solid fa-circle-small scale-50"></i>
                    {{ task.description }}
                </li>
            </ul>
        </main>
        <main>
            <hr class="mt-5 -mx-6">
            <div class="flex justify-between items-center pt-4">
                <span class="text-sm text-gray-500">
                    {{ moment(application.created_at).format('DD-MM-YYYY') }}
                </span>
                <main>
                    <button v-if="Auth.user" @click="openUpdateForm"
                        class="bg-gray-200 w-10 h-10 rounded-full shadow-sm text-teal-600 relative overflow-hidden">
                        <i class="fa-duotone fa-pen"></i>
                        <span
                            class="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-0 hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-pen"></i>
                        </span>
                    </button>
                    <!-- <button class="bg-gray-200 w-10 h-10 rounded-full shadow-sm text-blue-600 relative overflow-hidden">
                        <i class="fa-solid fa-book-blank"></i>
                        <span
                            class="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-0 hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-book-open-cover"></i>
                        </span>
                    </button> -->
                </main>
            </div>
        </main>
    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
import { ref } from 'vue'
import UpdateAppForm from '@/entities/application/UpdateAppForm.vue';
import moment from 'moment'
const Auth = useAuthStore()
const { application } = defineProps(['application'])
const editAppHandler = ref(false)

const buttonLoading = ref(false)

function openUpdateForm() {
    buttonLoading.value = true
    editAppHandler.value = true
}

function uploadApp() {
    buttonLoading.value = false
}
</script>