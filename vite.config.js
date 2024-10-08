import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
export default defineConfig({
    plugins: [
        laravel(['resources/ts/app.ts']),
        vue(),
    ],
    resolve: {
        alias: {
            '@': '/resources/ts',
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    }
})