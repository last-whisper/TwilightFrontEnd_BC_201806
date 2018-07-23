import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import routerAdmin from '@/router/router_admin'
import mtimeshop from '@/views/mtimeshop.vue'
import homePage from '@/views/index'
import registerPage from '@/views/register'
import newsPage from '@/views/news'
import newslistpage from '@/views/newslist'
import newsDetail from '@/views/newsdetail'
import movieDetail from '@/views/index_movie'
import movieTrailer from '@/views/movie_trailer'
import moviePic from '@/views/movie_pic'
import movienewslist from '@/views/movienewslist'
import discovery from '@/views/discovery'
import community from '@/views/index_community'
import guide from '@/views/index_guide'
import rankDetail from '@/views/rank_detail'
import userControl from '@/views/index_user'
import topHundred from '@/views/tophundred'
import search from '@/views/index_search'
import store from  '@/store/'
import {get,post} from '@/server/'

const router = new Router({
  mode: 'history',
  routes: [
    {//首页
      path: '/',
      name: 'home',
      component:homePage,
      meta: { requiresAuth: false }
    },
    {
      //新闻首页
      path:'/news/:category?',
      name:'news',
      component:newsPage,
      meta: { requiresAuth: false },
      props:true
    },
    {
      //新闻详情页
      path:'/newsdetail/:newstype/:id',
      name:'newsdetail',
      component:newsDetail,
      meta: { requiresAuth: false },
      props:true
    },
    {//新闻分类首页
      path:'/newslist/:category',
      name:'newslist',
      component:newslistpage,
      meta: { requiresAuth: false },
      props:true
    },
    {//影片新闻列表页
      path:'/movienewslist/:id',
      name:'movienewslist',
      component:movienewslist,
      meta:{requiresAuth: false},
      props:true
    },
    {//电影发现页
      path: '/discovery',
      name: 'discovery',
      component:discovery,
      meta: { requiresAuth: false }
    },
    {//观影指南页
      path: '/guide',
      name: 'guide',
      component:guide,
      meta: { requiresAuth: false }
    },
    {//排行榜详情页
      path: '/rankdetail/:id',
      name: 'rankdetail',
      component:rankDetail,
      meta: { requiresAuth: false },
      props:true
    },
    {
      //电影详情页
      path:'/movie/:id',
      name:'moviedetail',
      component:movieDetail,
      meta: { requiresAuth: false },
      props:true
    },
    {
      //电影预告片播放页
      path:'/trailer',
      name:'trailer',
      component:movieTrailer,
      meta: { requiresAuth: false },
    },
    {
      //电影图片预览页
      path:'/moviepic',
      name:'moviepic',
      component:moviePic,
      meta: { requiresAuth: false },
    },
    {
      //社区首页
      path: '/community',
      name: 'community',
      component:community,
      meta: { requiresAuth: false }
    },
    {
      //搜索首页
      path: '/search',
      name: 'search',
      component:search,
      meta: { requiresAuth: false },
      props:true
    },
    {//注册
      path: '/register',
      name: 'register',
      component:registerPage,
      meta: { requiresAuth: false }
    },
    {//用户主页
      path: '/user/:id',
      name: 'user',
      component:userControl,
      meta: { requiresAuth: true },
      props:true
    },
    {//时光TOP100页
      path: '/mtimetop',
      name: 'mtimetop',
      component:topHundred,
      meta: { requiresAuth: false }
    },
    {//商城页
      path: '/mtimeshop',
      name: 'mtimeshop',
      component:mtimeshop,
      meta: { requiresAuth: false }
    },
    ...routerAdmin,//后台管理页路由

  ],
  //设置页面滚动行为，页面打开时滚动到顶端
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
      //包含admin的路由记录滚动位置
    } else if(/admin/.test(to.path)){
      return {}
    } else if(to.hash){
      return {
        selector: to.hash
      }
    }else {
      return { x: 0, y: 0 }
    }

  }
})

/**
 * 全局路由守卫实现了以下功能
 * 1.登陆状态下刷新页面会重新提交登陆请求（cookie+session）
 * 2.未登录状态前往不需要做登陆验证的路由，不会发送登陆请求
 * 3.未登陆的状态前往需要做登陆验证的路由，则跳转至登陆页面
 * 说明：全局路由守卫只判断分发与不分发actions，根据store的状态调用next()与否，
 * 请求与其他操作交给action处理
 * */

router.beforeEach((to,from,next)=>{

  //不需要发送登陆验证请求的情况（用户信息存在 或者 未登录状态标识存在&&前往的路由不需要登陆验证）
  if(store.state.userinfo.userinfo.username ||
    store.state.userinfo.unlogin &&
    !to.matched.some(record => record.meta.requiresAuth)){
    next()
  }
  //需要发送登陆验证的情况
  else {
    //分发actions
    store.dispatch('fillUserInfo')
      .then(r=>{
        if(!store.state.userinfo.loginresult.code){
          //登陆验证成功
          next()
        }else {
          //登陆失败并且前往的路由需要验证登陆，则跳转至登陆页
          if(to.matched.some(record => record.meta.requiresAuth)){
            next({name:'register'})
          }else {
            next()//以未登录的状态前往路由
          }
        }
      })
  }
})

export default router
