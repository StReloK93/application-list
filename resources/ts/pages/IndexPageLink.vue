<template>
   <main class="p-4 bg-white rounded-md border border-zinc-100">
      <Transition name="opacity">
         <CreatePageLinkForm v-if="pageData.state_create_form" @close="pageData.state_create_form = false" @submit-form="createPageLink" />
      </Transition>
      <UpdatePageLinkForm v-if="pageData.selected" :pageLinkId="pageData.selected" @close="pageData.selected = null" @submit-form="updatePageLink" />
      <nav class="text-right mb-4">
         <button @click="pageData.state_create_form = true"
            class="bg-slate-50 hover:bg-white w-10 h-10 rounded-full shadow-sm border border-zinc-100 text-blue-600 relative overflow-hidden">
            <i class="fa-solid fa-plus"></i>
         </button>
      </nav>
      <table class="w-full">
         <tr>
            <td class="border px-2 py-1 w-10 text-center">№</td>
            <td class="border px-2 py-1">Sahifa manzili</td>
            <td class="border px-2 py-1">Malumoti</td>
            <template v-if="AuthStore.user">
               <td class="border px-2 py-1 w-10"></td>
               <td class="border px-2 py-1 w-10"></td>
            </template>
         </tr>
         <tr v-for="page_link in pageData.page_links">
            <td class="border px-2 h-10 text-center">{{ page_link.id }}</td>
            <td class="border px-2 h-10">{{ page_link.link }}</td>
            <td class="border px-2 h-10">{{ page_link.description }}</td>

            <template v-if="AuthStore.user">
               <td @click="pageData.selected = page_link.id" class="border px-2 h-10 text-center hover:bg-gray-100 cursor-pointer">
                  <i class="fa-solid fa-pen text-teal-500"></i>
               </td>
               <td @click="destroyPageLink(page_link.id)" class="border px-2 h-10 text-center hover:bg-gray-100 cursor-pointer">
                  <i class="fa-solid fa-trash text-red-500"></i>
               </td>
            </template>
         </tr>
      </table>
   </main>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/useAuthStore'
const AuthStore = useAuthStore()
import CreatePageLinkForm from '@/entities/page-link/CreatePageLinkForm.vue'
import PageLinkRepo from '@/entities/page-link/PageLinkRepo'
import { reactive } from 'vue'
import UpdatePageLinkForm from '@/entities/page-link/UpdatePageLinkForm.vue'
const pageData = reactive({
   page_links: null,
   state_create_form: false,
   selected: null
})
PageLinkRepo.index().then((result) => pageData.page_links = result.data)

function createPageLink(formdata) {
   PageLinkRepo.store(formdata).then(({ data }) => {
      pageData.page_links.push(data)
      pageData.state_create_form = false
   })
}

function updatePageLink(formdata) {
   PageLinkRepo.update(pageData.selected , formdata).then(({ data }) => {
      const selectedLink = pageData.page_links.find((link) => link.id == formdata.id)
      selectedLink.link = data.link
      selectedLink.description = data.description
      pageData.selected = null
   })
}


function destroyPageLink(id){
   PageLinkRepo.destroy(id).then(({ data }) => {
      pageData.page_links = pageData.page_links.filter((page_link) => page_link.id != id)
   })
}




</script>