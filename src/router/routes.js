
const routes = [
  { path: '/', redirect: '/guest' },
  {
    path: '/student',
    component: () => import('layouts/StudentLayout.vue'),
    children: [
      { path: '/student', redirect: '/student/driving' },
      { path: 'driving', component: () => import('pages/Driving.vue') },
      { path: 'services', component: () => import('pages/Services.vue') },
      { path: 'cabinet', component: () => import('pages/Cabinet.vue') },
    ],
  },
  {
    path: '/guest',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/guest', redirect: '/guest/login' },
      { path: 'prices', component: () => import('pages/Prices.vue') },
      { path: 'about', component: () => import('pages/About.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
    ],
  },

  { path: '*', redirect: '/' },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
