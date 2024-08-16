<template>
    <nav class="flex justify-between items-center py-3">
        <Teleport to="body">
            <Transition name="opacity">
                <CreateAppForm v-if="AddApplicationForm" @close="AddApplicationForm = false" />
            </Transition>
        </Teleport>
        <div id="searchInput" class="bg-white shadow-sm p-2 rounded-md">
            <span class="px-2">
                <i class="fa-sharp fa-regular fa-magnifying-glass"></i>
            </span>
            <input type="text" v-model="appStore.search" class="bg-transparent outline-none" placeholder="Qidirish">
        </div>
        <div v-if="AuthStore.user">
            <button
                @click="AddApplicationForm = true"
                class="bg-blue-500 text-white px-3 py-1.5 rounded shadow-md border active:bg-blue-400  hover:bg-blue-600 border-white hover:outline-2 hover:outline-blue-500 hover:outline-double">
                <i class="fa-solid fa-plus mr-2"></i> Dastur kiritish
            </button>
        </div>
        <!-- <div id="sortInput" class="bg-white shadow-sm p-2 px-5 rounded-md">
            <span class="pr-2">
                <i class="fa-sharp fa-regular fa-bars-sort"></i>
            </span>
            <span class="text-gray-400">
                Tartiblash
            </span>
            <span class="pl-4">
                <i class="fa-sharp fa-regular fa-chevron-down"></i>
            </span>
            <main v-for="item in appStore.sortList">

            </main>
        </div> -->
    </nav>
</template>

<script setup lang="ts">
import CreateAppForm from '@/entities/application/CreateAppForm.vue'
import { useAppStore } from '@/store/useApplication'
import { useAuthStore } from '@/store/useAuthStore'
const appStore = useAppStore()
const AuthStore = useAuthStore()
import { ref } from 'vue'

const AddApplicationForm = ref(false)
</script>