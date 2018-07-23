

const routerAdmin = [
  {
    path:'/admin',
    component: r => require.ensure([], () => r(require('../views/index_admin')), 'admin'),
    meta: { requiresAuth: true },
    children:[
      {
        path:'',
        name:'addnav',
        component: r => require.ensure([], () => r(require('../components/admin/edit_nav')), 'admin'),
        meta: { requiresAuth: true },
      },
      {
        path:'addmovie',
        name:'addmovie',
        component: r => require.ensure([], () => r(require('../components/admin/edit_movie')), 'admin'),
        meta: { requiresAuth: true },
      },
      {
        path:'addnews',
        name:'addnews',
        component: r => require.ensure([], () => r(require('../components/admin/edit_news')), 'admin'),
        meta: { requiresAuth: true },
      },
      {
        path:'addrank',
        name:'addrank',
        component: r => require.ensure([], () => r(require('../components/admin/edit_rank')), 'admin'),
        meta: { requiresAuth: true },
      },
      {
        path:'addad',
        name:'addad',
        component: r => require.ensure([], () => r(require('../components/admin/edit_ad')), 'admin'),
        meta: { requiresAuth: true },
      },
      {
        path:'addbanner',
        name:'addbanner',
        component: r => require.ensure([], () => r(require('../components/admin/edit_banner')), 'admin'),
        meta: { requiresAuth: true },
      }
    ]
  },
]



export default routerAdmin
