import axios from "@/modules/axios";

const baseUrl = 'page-link'

async function index() {
   return await axios.get(`${baseUrl}`)
}
async function show(id: number) {
   return await axios.get(`${baseUrl}/${id}`)
}

async function store(formdata) {
   return await axios.post(`${baseUrl}`, formdata)
}

async function update(id: number, formdata) {
   return await axios.patch(`${baseUrl}/${id}`, formdata)
}

async function destroy(id: number) {
   return await axios.delete(`${baseUrl}/${id}`)
}

export default { index, show, store, update, destroy }