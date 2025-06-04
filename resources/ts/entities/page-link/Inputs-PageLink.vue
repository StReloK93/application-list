<template>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Dastur giperssilkasi (Url)*</label>
      <Field v-model="formData.link" name="applink" id="emailField" type="text" :rules="validateText"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 focus:outline-blue-500"
         placeholder="192.168.1.1:1000" />
      <ErrorMessage name="applink" class="text-red-500 mt-1 inline-block" />
   </div>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Izoh</label>
      <Field v-model="formData.description" name="description" as="textarea" id="emailField" type="text"
      :rules="validateText"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 max-h-32 focus:outline-blue-500"
         placeholder="Izoh" />
         <ErrorMessage name="description" class="text-red-500 mt-1 inline-block" />
   </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Field, ErrorMessage } from "vee-validate";


const formData: any = reactive({
   link: null,
   description: "",
});



function validateText(value) {
   if (!value || value.trim() == "") return "To'ldiring!";
   return true;
}


defineExpose({formData})
</script>