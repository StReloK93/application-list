import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "@/modules/axios";
export const useAppStore = defineStore("appStore", () => {
    const applications = ref([]);
    const activeCategory = ref(0);
    const timer = ref(true);
    const search = ref("");
    const sortList = ref([]);
    const selectedSort = ref(null);

    function getData() {
        axios.get("app").then(({ data: apps }) => {
            applications.value = apps;
        });
    }

    async function create(formdata) {
        const form = new FormData();
        form.append("name", formdata.name);
        form.append("category_id", formdata.category_id);
        form.append("link", formdata.link);
        form.append("icon", formdata.icon);
        form.append("description", formdata.description);
        form.append("tasks", JSON.stringify(formdata.tasks));

        return await axios.post("app", form).then(({ data: app }) => {
            applications.value.push(app);
        });
    }

    function update(id, formdata) {
        const form = new FormData();
        form.append("name", formdata.name);
        form.append("category_id", formdata.category_id);
        form.append("link", formdata.link);
        form.append("icon", formdata.icon);
        form.append("description", formdata.description);
        form.append("tasks", JSON.stringify(formdata.tasks));

        axios.post(`app/${id}`, form).then(({ data: app }) => {
            const index = applications.value.findIndex((application) => application.id == app.id)
            applications.value[index].category_id = app.category_id
            applications.value[index].description = app.description
            applications.value[index].icon = app.icon
            applications.value[index].link = app.link
            applications.value[index].tasks = app.tasks
            applications.value[index].created_at = app.created_at
        });
    }

    async function show(app_id) {
        const { data } = await axios.get(`app/${app_id}`);
        return data;
    }

    function setActive(id) {
        timer.value = false;
        activeCategory.value = id;
        setTimeout(() => {
            timer.value = true;
        }, 200);
    }

    function searchText(string, search) {
        if (search.trim() == "") return true;
        else return string.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    }

    function filterCategory(searched) {
        if (activeCategory.value == 0) return searched;
        else
            return searched.filter(
                (app) => app.category_id == activeCategory.value
            );
    }

    const filteredAndSort = computed(() => {
        if (timer.value == false) return [];
        const searched = applications.value.filter((app) =>
            searchText(app.name, search.value)
        );
        return filterCategory(searched);
    });

    return {
        activeCategory,
        timer,
        search,
        applications,
        setActive,
        create,
        update,
        show,
        filteredAndSort,
        sortList,
        selectedSort,
        getData,
    };
});
