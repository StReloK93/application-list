<template>
    <header class="py-2 font-semibold text-slate-800">
        <main class="flex justify-between items-center mb-6">
            <RouterLink :to="{ name: 'applications' }" class="text-xl flex items-end">
                <img :src="logoimage" class="inline w-12">
                <span>AJ NKMK UAKTM </span>
            </RouterLink>

            <aside class="flex gap-5">
                <span v-if="AuthStore.user" class="font-semibold">
                    <i class="fa-solid fa-user-helmet-safety mr-2"></i>
                </span>
                <RouterLink :to="{ name: 'page-link' }">
                    Sahifalar
                </RouterLink>

                <button v-if="AuthStore.user" @click="AuthStore.logout" class="text-right hover:text-blue-500">
                    Chiqish
                    <i class="fa-regular fa-arrow-right-from-bracket ml-2"></i>
                </button>
                <RouterLink v-else :to="{ name: 'login' }">
                    <i class="fa-duotone fa-right-to-bracket"></i>
                    <span class="ml-3">
                        Kirish
                    </span>
                </RouterLink>
            </aside>
        </main>

    </header>
</template>

<script setup lang="ts">
import logoimage from '@/assets/logo.png'
import { useAuthStore } from '@/store/useAuthStore';
import { RouterLink } from 'vue-router';
const AuthStore = useAuthStore()
</script>