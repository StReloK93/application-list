import './assets/main.css'
import { createApp } from "vue"
import App from './components/App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/useAuthStore'


async function initApp() {
    const app = createApp(App)
        .use(createPinia())
        const AuthStore = useAuthStore()
        await AuthStore.getUser()
        app.use(router)
        app.mount('#app')
    
}

initApp()