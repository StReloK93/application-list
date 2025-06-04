export default [
	{
		path: '/',
		component: () => import('@/pages/Index.vue'),
		name: 'home',
		redirect: { name: 'applications' },
		children: [
			{
				path: 'applications',
				component: () => import('@/pages/IndexApplication.vue'),
				name: 'applications',
			},
			{
				path: '/page-link',
				component: () => import('@/pages/IndexPageLink.vue'),
				name: 'page-link',
			},
		]
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