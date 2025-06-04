<template>
	<main>
		<div>
			<button v-for="category in pageData.categories" @click="appStore.setActive(category.id)"
				class="p-1 border-b-2 border-transparent mr-5 text-slate-600 transition-all"
				:class="{ '!border-blue-600 !text-blue-600': appStore.activeCategory == category.id }">
				{{ category.name }}
			</button>
		</div>
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
				<button @click="AddApplicationForm = true"
					class="bg-blue-500 text-white px-3 py-1.5 rounded shadow-md border active:bg-blue-400  hover:bg-blue-600 border-white hover:outline-2 hover:outline-blue-500 hover:outline-double">
					<i class="fa-solid fa-plus mr-2"></i> Dastur kiritish
				</button>
			</div>
		</nav>
	</main>
</template>

<script setup lang="ts">
import axios from '@/modules/axios'
import { reactive } from 'vue'
import CreateAppForm from '@/entities/application/CreateAppForm.vue'
import { useAppStore } from '@/store/useApplication'
import { useAuthStore } from '@/store/useAuthStore'
const AuthStore = useAuthStore()
const appStore = useAppStore()
import { ref } from 'vue'

const AddApplicationForm = ref(false)

const pageData: any = reactive({ categories: [] })

axios.get('category').then(({ data: categories }) => {
	pageData.categories = categories
	pageData.categories.unshift({ name: 'Barcha', id: 0 })
})
</script>