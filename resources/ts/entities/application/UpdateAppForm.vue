<template>
	<section @mousedown="close" class="fixed w-full h-full bg-black/55 backdrop-blur-sm top-0 left-0 z-50 flex justify-end">
		<nav ref="addAppModal" @mousedown.stop class="w-96 bg-gray-100 p-4 shadow translate-x-full">
			<Form @submit="submitHandler">
				<h3 class="-m-4 mb-0 p-4 bg-white border-b font-semibold text-center">
					Dasturni tahrirlash formasi
				</h3>
				<InputsApp ref="inputsapp"/>
				<div class="text-right mt-4">
					<button type="submit"
						class="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white py-1.5 rounded shadow-md px-4">
						<i class="fa-solid fa-floppy-disk mr-2"></i> Tahrirlash
					</button>
				</div>
			</Form>
		</nav>
	</section>
</template>

<script setup lang="ts">
import InputsApp from "@/entities/application/Inputs-app.vue";
import { onMounted, reactive, ref } from "vue";
import { Form } from "vee-validate";
import { useAppStore } from "@/store/useApplication";
import gsap from "gsap";
const emit = defineEmits(["close"]);


const props = defineProps(['application'])
const addAppModal = ref();
const inputsapp = ref();
const appStore = useAppStore()

const pageData = reactive({
	categories: [],
	onLoad: false,
});

function submitHandler() {
	const formData = inputsapp.value.formData
	appStore.update(props.application.id, formData)
	close()
}

async function close() {
	await gsap.fromTo(
		addAppModal.value,
		{ x: "0%", opacity: 0 },
		{ x: "100%", opacity: 1, duration: 0.25 }
	);

	emit("close");
}



async function getApplication() {
	const formData = inputsapp.value.formData
	const application = JSON.parse(JSON.stringify(props.application))

	formData.name = application.name
	formData.category_id = application.category_id
	formData.link = application.link
	formData.icon = application.icon
	formData.preview = `/icons/${application.icon}`
	formData.tasks = application.tasks
	formData.description = application.description
}

onMounted(async () => {
	gsap.fromTo(
		addAppModal.value,
		{ x: "100%", opacity: 0 },
		{ x: "0%", opacity: 1, duration: 0.25 }
	);
	pageData.onLoad = true;

	getApplication()
});
</script>
