import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function dynamicBreed (route) {
  return route.params
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/NotFound'
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home')
    },
    {
      path: '/NotFound',
      name: 'NotFound',
      component: () => import('@/pages/NotFound')
    },
    {
      name: 'favourites',
      path: '/favourites',
      component: () => import('@/pages/Favourites')
    },
    {
      path: '/:breed',
      name: 'Breed',
      component: () => import('@/pages/Breed'),
      props: dynamicBreed
    }
  ]
})
