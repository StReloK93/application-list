<template>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Dastur belgisi *</label>
      <BaseImageInput v-model="formData.icon" :preview="formData.preview" />
   </div>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Dastur nomi *</label>
      <Field v-model="formData.name" name="appname" id="emailField" type="text" :rules="validateText"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 focus:outline-blue-500"
         placeholder="Dastur nomi" />
      <ErrorMessage name="appname" class="text-red-500 mt-1 inline-block" />
   </div>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Dastur turi *</label>
      <Field name="caterogyField" :rules="validateText" v-model="formData.category_id" as="select"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 focus:outline-blue-500">
         <option v-for="category in pageData.categories" :value="category.id">
            {{ category.name }}
         </option>
      </Field>
      <ErrorMessage name="caterogyField" class="text-red-500 mt-1 inline-block" />
   </div>
   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Dastur giperssilkasi (Url)
         *</label>
      <Field v-model="formData.link" name="applink" id="emailField" type="text" :rules="validateText"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 focus:outline-blue-500"
         placeholder="192.168.1.1:1000" />
      <ErrorMessage name="applink" class="text-red-500 mt-1 inline-block" />
   </div>
   <div>
      <main class="flex justify-between items-center my-2">
         <label class="my-2 inline-block font-semibold text-gray-600">
            Dastur bajaradigan vazifalari
         </label>
         <div>
            <button type="button" @click="removeTask" :disabled="formData.tasks.length < 2"
               class="bg-red-200 text-red-500 w-8 h-8 rounded-full shadow-md disabled:bg-red-50 disabled:text-red-300">
               <i class="fa-light fa-minus"></i>
            </button>
            <button type="button" @click="addTask" :disabled="formData.tasks.length > 4"
               class="bg-blue-200 text-blue-500  w-8 h-8 rounded-full shadow-md disabled:bg-blue-50 disabled:text-blue-300 ml-3">
               <i class="fa-light fa-plus"></i>
            </button>
         </div>
      </main>
      <template v-for="(task, index) in formData.tasks" :key="index">
         <Field v-model="task.description" :name="`taskField${index}`" type="text" :rules="validateText"
            class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 focus:outline-blue-500 mb-1.5"
            placeholder="Juda ajoyibu g'aroyib dastur" />
         <ErrorMessage :name="`taskField${index}`" class="text-red-500 mt-1 inline-block" />
      </template>
   </div>

   <div>
      <label for="emailField" class="my-2 inline-block font-semibold text-gray-600">Izoh</label>
      <Field v-model="formData.description" name="description" as="textarea" id="emailField" type="text"
         class="bg-white px-2 w-full py-1.5 rounded border border-gray-200 max-h-32 focus:outline-blue-500"
         placeholder="Izoh (majburiy emas)" />
   </div>
</template>

<script setup lang="ts">
import axios from "@/modules/axios";
import { reactive, onMounted } from "vue";
import BaseImageInput from "@/components/BaseImageInput.vue";
import { Field, ErrorMessage } from "vee-validate";


const formData: any = reactive({
   name: null,
   category_id: null,
   link: null,
   icon: "",
   description: "",
   tasks: [
      { description: "" }
   ],
   preview: null,
});

const pageData = reactive({
   categories: []
})

function addTask() {
   if (formData.tasks.length < 5) formData.tasks.push({ name: "" })
}

function removeTask() {
   if (formData.tasks.length > 1) formData.tasks.pop()
}


function validateText(value) {
   if (!value) return "To'ldiring!";
   return true;
}


defineExpose({formData})

onMounted(async () => {
   const { data: categories } = await axios.get("category");

   pageData.categories = categories;
})
</script>