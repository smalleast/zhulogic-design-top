let router = []

if (process.env.NODE_ENV !== 'production') {
  router = [
    {
      path: '/test',
      name: 'test',
      component: () => import('@/test/index.vue')
    }
  ]
}

export default router
