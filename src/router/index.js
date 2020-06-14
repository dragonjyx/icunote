import Vue from 'vue'
import Router from 'vue-router'

import noteList from '@/components/note/note-list'
import noteDetail from '@/components/note/note-detail'
import noteWrite from '@/components/note/note-write'
import login from '@/components/login/login'
import register from '@/components/login/register'
import index from '@/components/index'

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
      path: '/note-write',
      name: 'noteWrite',
      component: noteWrite
    }
  ]
})


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
