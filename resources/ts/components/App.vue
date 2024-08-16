<template>
	<section class="overflow-hidden relative h-svh">
		<router-view v-slot="{ Component }">
			<transition  name="scale" mode="in-out" @before-enter="beforeEnter" @enter="enterHandler" @leave="onLeave" @after-enter="onAfterEnter">
				<component ref="page" :is="Component" />
			</transition>
		</router-view>
	</section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { ref } from 'vue'
const page = ref()
function beforeEnter(elem) {
	elem.style.zIndex = 1000
}

function enterHandler(elem) {
	elem.style.zIndex = 0
}


function onLeave(elem) {
	elem.style.zIndex = 0
}

function onAfterEnter() {
	if (page.value.loginblock) {
		gsap.fromTo(page.value.loginblock, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 , ease: 'slow'})
	}
}
</script>