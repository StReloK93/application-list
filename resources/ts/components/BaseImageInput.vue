<template>
   <section class="relative">
      <Field name="logoicon" ref="inputFileTag" id="localInputInput" @change="onChangeHandler" type="file"
         :rules="validateText" v-model="model" class="opacity-0 absolute" />
      <label for="localInputInput" class="">
         <div v-if="viewImage == null"
            class="w-16 h-16 bg-gray-200 rounded content-center text-center hover:bg-gray-300 active:bg-gray-100">
            <span class="text-blue-500">
               <i class="fa-duotone fa-image-landscape"></i>
            </span>
         </div>
         <div v-else class="w-16 h-16">
            <img :src="viewImage">
         </div>
      </label>
      <ErrorMessage name="logoicon" class="text-red-500 mt-1 inline-block" />

   </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Field, ErrorMessage } from "vee-validate";
const props = defineProps(['preview'])
const model: any = defineModel()
const inputFileTag = ref()
const viewImage = ref(null)

function validateText(value) {
   if (!value) return "Tanlang!";
   return true;
}
function onChangeHandler(event) {
   if (event.target.files[0]) {
      viewImage.value = URL.createObjectURL(event.target.files[0])
      model.value = event.target.files[0]
   }
}


watch(() => props.preview, (current) => viewImage.value = current)
</script>