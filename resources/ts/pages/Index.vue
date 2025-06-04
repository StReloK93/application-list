<template>
	<main class="overflow-hidden absolute inset-0 bg-slate-50">
		<section class="w-svw overflow-y-scroll h-full">
			<div class="container mx-auto flex flex-col py-5">
				<CustomHeader id="customHeader" class="opacity-1" />
				<RouterView></RouterView>
			</div>
		</section>
	</main>
</template>

<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
</script>