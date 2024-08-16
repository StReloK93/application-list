export default [
    {
        path: '/',
        component: () => import('@/pages/Index.vue'),
        name: 'home',
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            guard: 'guest',
        },
        component: () => import('@/pages/Login.vue'),
    },
]