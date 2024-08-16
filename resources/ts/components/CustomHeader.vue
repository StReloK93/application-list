<template>
    <header class="py-2 font-semibold text-slate-800">
        <main class="flex justify-between items-center mb-6">
            <div class="text-xl">
                <span class="text-3xl text-blue-600">
                    <i class="fa-brands fa-hive"></i>
                </span>
                NGMK UAKTM
            </div>
    
            <RouterLink v-if="AuthStore.user == null" :to="{name: 'login'}">
                <i class="fa-duotone fa-right-to-bracket"></i>
                <span class="ml-3">
                    Kirish
                </span>
            </RouterLink>
            <main v-else class="">
                <span class="font-semibold mr-8">
                    <i class="fa-solid fa-user-helmet-safety mr-2"></i>
                    {{ AuthStore.user.name }}
                </span>
                <button @click="AuthStore.logout" class="text-right hover:text-blue-500">
                    Chiqish
                    <i class="fa-regular fa-arrow-right-from-bracket ml-2"></i>
                </button>
            </main>
        </main>
        <div>
            <button v-for="category in pageData.categories" @click="appStore.setActive(category.id)"
                class="p-1 border-b-2 border-transparent mr-5 text-slate-600 transition-all"
                :class="{ '!border-blue-600 !text-blue-600': appStore.activeCategory == category.id }">
                {{ category.name }}
            </button>
        </div>
    </header>
</template>

<script setup lang="ts">
import axios from '@/modules/axios'
import { reactive } from 'vue'
import { useAppStore } from '@/store/useApplication'
import { useAuthStore } from '@/store/useAuthStore';
const appStore = useAppStore()
const AuthStore = useAuthStore()
const pageData: any = reactive({categories: []})

axios.get('category').then(({ data: categories }) => {
    pageData.categories = categories
    pageData.categories.unshift({ name: 'Barcha', id: 0 })
})
</script>