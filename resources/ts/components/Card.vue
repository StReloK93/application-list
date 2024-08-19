<template>
    <section class="px-6 py-4 bg-white shadow-md rounded-xl">
        <UpdateAppForm v-if="editAppHandler" :application="application" @close="editAppHandler = false" />
        <main class="h-44">
            <a :href="'http://' + application.link" class="font-bold text-base inline-block text-slate-800 leading-none mb-4">
                {{ application.name }}
            </a>
            <div class="flex items-start">
                <article class="flex justify-center items-center w-12 h-12 border rounded-md">
                    <img :src="'/icons/' + application.icon" class="w-9">
                </article>
                <nav class=" flex-grow ml-5">
                    <a class="text-xs text-gray-400 hover:text-blue-500" :href="'http://' + application.link"
                        target="_blank">

                        <i class="fa-light fa-link-simple text-blue-400"></i>
                        {{ application.link }}
                    </a>
                </nav>
            </div>

            <ul class="text-sm text-gray-500 mt-4">
                <template v-if="application.tasks.length < 3">
                    <li v-for="task in application.tasks">
                        <i class="fa-solid fa-circle-small scale-50"></i>
                        {{ task.description }}
                    </li>
                </template>
                <template v-else>
                    <li>
                        <i class="fa-solid fa-circle-small scale-50"></i>
                        {{ application.tasks[0].description }}
                    </li>
                    <li>
                        <i class="fa-solid fa-circle-small scale-50"></i>
                        {{ application.tasks[1].description }}
                    </li>
                </template>
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
                    <button v-else
                        class="bg-gray-200 w-10 h-10 rounded-full shadow-sm text-blue-600 relative overflow-hidden">
                        <i class="fa-solid fa-book-blank"></i>
                        <span
                            class="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-0 hover:opacity-100 transition-opacity">
                            <i class="fa-solid fa-book-open-cover"></i>
                        </span>
                    </button>
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

function openUpdateForm() {
    editAppHandler.value = true
}
</script>