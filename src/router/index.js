import Vue from 'vue'
import Router from 'vue-router'

import index from '@/components/index'

import noteList from '@/components/note/note-list'
import noteDetail from '@/components/note/note-detail'

import login from '@/components/login/login'
import register from '@/components/login/register'

import header from '@/components/common/header'
import footer from '@/components/common/footer'

import user from '@/components/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[

      ]
    },
    {
      path: '/note-list/:query',
      name: 'noteList',
      component: noteList
    },
    {
      path: '/note-detail',
      name: 'noteDetail',
      component: noteDetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/header',
      name: 'header',
      component: header
    },
    {
      path: '/footer',
      name: 'footer',
      component: footer
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
