import Vue from 'vue'
import Router from 'vue-router'

import { deliveryClient } from './api/kontent/delivery-client'
import { flatten as flattenPost } from './api/kontent/models/post'
import { getDateUrlObject } from './api/helpers'

import Home from './pages/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/:locale?',
      name: 'home',
      component: Home,
      props: true
    },
    {
      path: '/blog/:year/:month/:date/:slug',
      name: 'post-detail',
      props: true,
      component: () => import('./pages/post-detail.vue')
    },
    {
      path: '/by',
      name: 'author-index',
      props: true,
      component: () => import('./pages/author-index.vue')
    },
    {
      path: '/by/:slug',
      name: 'author-detail',
      props: true,
      component: () => import('./pages/author-detail.vue')
    },
    {
      path: '/go',
      name: 'activity-index',
      component: () => import('./pages/activity-index.vue')
    },
    {
      path: '/go/:slug',
      name: 'activity-detail',
      props: true,
      component: () => import('./pages/activity-detail.vue')
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: () => import('./pages/not-found.vue')
    },
    {
      path: '/link/:guid',
      name: 'link',
      beforeEnter: (to, from, next) => {
        deliveryClient
          .items()
          .equalsFilter('system.id', to.params.guid)
          .getPromise()
          .then(items => {
            const item = items.firstItem
            if (item) {
              const params = {
                ...getDateUrlObject(item.published.datetime),
                slug: item.slug.value,
                postData: flattenPost(item)
              }

              switch (item.system.type) {
                case 'post':
                  next({
                    name: 'post-detail',
                    params
                  })
                  break
                default:
                  next({ name: 'not-found' })
              }
            } else {
              next({ name: 'not-found' })
            }
          })
          .catch(() => {
            next({ name: 'not-found' })
          })
      }
    },
    {
      path: '/:slug',
      name: 'page-detail',
      props: true,
      component: () => import('./pages/page-detail.vue')
    }
  ]
})
