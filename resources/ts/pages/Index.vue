<template>
	<main class="overflow-hidden absolute inset-0 bg-slate-50">
		<section class="w-svw overflow-y-scroll h-full">
			<div class="container mx-auto flex flex-col py-5">
				<CustomHeader id="customHeader" class="mb-2 opacity-1" />
				<CustomNavigator class="mb-4 sticky top-0 bg-slate-50 z-50" />
				<TransitionGroup name="fade" tag="main" id="cardList" mode="out-in"
					class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 relative origin-top">
					<Card v-for="(app, index) in appStore.filteredAndSort" :application="app" :key="index" class="origin-top-left" />
				</TransitionGroup>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomNavigator from '@/components/CustomNavigator.vue'
import Card from '@/components/Card.vue'
import { useAppStore } from '@/store/useApplication'

const appStore = useAppStore()
import { onMounted, onUnmounted } from "vue"

onMounted(async () => {
	appStore.getData()
})

onUnmounted(() => {
	appStore.applications = []
})
</script>