<template>
	<section @mousedown="pageData.openForm = false"
		class="fixed w-full h-full bg-black/55 backdrop-blur-sm top-0 left-0 z-50 flex justify-end">
		<nav ref="addAppModal" @transitionend="animationend" @mousedown.stop
			:class="[{ '!translate-x-0': pageData.openForm }]"
			class="w-96 bg-gray-100 p-4 shadow translate-x-full transition-transform duration-500">
			<Form @submit="submitHandler">
				<h3 class="-m-4 mb-0 p-4 bg-white border-b font-semibold text-center">
					Tahrirlash
				</h3>
				<InputsApp ref="inputsapp" />
				<div class="text-right mt-4">
					<button type="submit"
						class="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white py-1.5 rounded shadow-md px-4">
						<i class="fa-solid fa-floppy-disk mr-2"></i> Saqlash
					</button>
				</div>
			</Form>
		</nav>
	</section>
</template>

<script setup lang="ts">
import InputsApp from "@/entities/page-link/Inputs-PageLink.vue";
import { Form } from "vee-validate";
import { onMounted, reactive, ref } from "vue";
import PageLinkRepo from "./PageLinkRepo";
const props = defineProps(['pageLinkId'])
const emit = defineEmits(["close", "submitForm"]);
const addAppModal = ref();
const inputsapp = ref();
const pageData = reactive({
	openForm: false,
});

async function submitHandler() {
	const formData = inputsapp.value.formData
	emit('submitForm', { ...formData, id: props.pageLinkId })
}


function animationend() {
	if (pageData.openForm == false) emit("close")
}

onMounted(async () => {
	setTimeout(() => pageData.openForm = true, 100)
	PageLinkRepo.show(props.pageLinkId).then(({ data }) => {
		inputsapp.value.formData.link = data.link
		inputsapp.value.formData.description = data.description
	})
});
</script>
