import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {get,post} from '@/server/'
//用户模块
const userinfo = {
  state:{
    floatloginbar:false,
    port:'http://chat.wykiss.cn',
    unlogin:false,//表示未登录状态，后续不需要做登陆验证的路由将不会在全局路由守卫中发送登陆验证请求（减少请求）
    userinfo:{
      username:'',//用户信息，如果存在，表明用户登陆状态，将不会在全局路由守卫中发送登陆验证请求（减少请求）
      img:'',
      _id:''
    },
    loginresult:{//登陆验证结果
      code:1,
      message:''
    },

  },
  mutations:{

    //处理登陆返回的数据
    fillUserInfo(state,{code,userinfo,message}){
      state.loginresult.code = code;
      state.loginresult.message = message;

      //根据code判断登陆结果
      switch (code){
        case 0:
          state.unlogin = false //登陆成功
          state.userinfo = userinfo;
          break;

        case 1:
          state.unlogin = true //登陆失败
          state.userinfo = userinfo;
          break;

        case 2:
          state.unlogin = false //已经登陆该账号了
          break;

        default:
          state.unlogin = true //登陆失败
          state.userinfo = userinfo;
          break;
      }

    },
    //控制浮动登陆框
    floatloginbaronooff(state,boolean=true){
      state.floatloginbar = boolean
    }

  },
  actions:{
    //登陆请求
    /**
     * 实现的需求
     * 1.重复登陆账号，不会发送登陆请求，并给与文字提示
     * 2.登陆状态下登陆另一账号，会先登出再发送登陆请求
     * 3.登出后未刷新页面而残留的用户数据会被随后登陆返回的数据覆盖
     * */
    fillUserInfo({commit,state,dispatch},data={}){

      if(state.userinfo.username && state.userinfo.username === data.username){
        //如果已经登陆，并且再次登陆该账号
        commit('fillUserInfo',{code:2,message:'请勿重复登陆该账号'})
        return Promise.resolve()
      }else if(state.userinfo.username && state.userinfo.username != data.username){
        //如果已经登陆，并且再次登陆其他账号
        dispatch('dropout',false)//先登出再发送登陆请求，false为退出登陆时不刷新页面
          .then(r=>{
            return post('/userinfo/login',data)
              .then(r=>{
                commit('fillUserInfo',r.data)
              })
          })
      }else {
        return post('/userinfo/login',data)
          .then(r=>{
            commit('fillUserInfo',r.data)
          })
      }
    },
    //登出请求
    /**
     * 实现的需求
     * 1.退出登陆后刷新页面
     * 2.登录状态下登陆另一个账号的情况下，退出登陆会提交后端销毁session，
     * 但不会刷新页面，之前的用户数据交给之后的登陆请求处理(刷新页面之后的请求就没啦)
     * */
    dropout(reload=true){
      return get('/userinfo/loginout')
        .then(r=>{
          if(!r.data.code && reload){
            window.location.reload()
          }
        })
    }
  }
}

//网站导航信息
const menu = {
  state:{
    mainMenu:[],
    movieCategory:[],
    hotSpot:[{}],

  },
  mutations:{
    //填充主导航内容
    fillMainMenu(state,{data}){
      state.mainMenu=data.list
    }
  },
  actions:{
    async fillMainMenu({commit}){
      commit('fillMainMenu', await get('/api/mainmenulist'));
    }
  }
}

//搜索模块
const search = {
  state:{
    category:[],
    currentCategory:{name:'全部'},//当前选择的搜索分类,默认全部
    defaultplaceholder:''//当前搜索框提示信息（需要计算）
  },
  mutations:{
    //填充下拉选项列表内容
    fillSearchList(state,{data}){
      state.category=data;
      state.currentCategory=data[0];
    },
    //搜索框提示信息变更
    changeplaceholder(state,str){
      state.defaultplaceholder = str
    },
    //选择搜索分类
    chooseCategory(state,_id){
      let findcategory = state.category.find(item=>item._id===_id);
      findcategory ? state.currentCategory = findcategory : null
    }
  },
  actions:{
    fillSearchList({commit,state}){
      get('/api/searchlist')
        .then(r=>{
          commit('fillSearchList',r)
        })
        .then(()=>{
          //计算搜索框默认提示信息
          let str = '搜索';
          state.category.forEach(i=>{
            str+=i.name+"、"
          });
          commit('changeplaceholder',str.slice(0,-1))
        })
    }
  }
}

//广告模块
const advertisement = {
  state:{
    src:{},
  },
  mutations:{
    fillSrc(state,{data}){
      state.src = data.data;
    }
  },
  actions:{
    async fillSrc({commit}){
      commit('fillSrc', await get('/api/advertisementsrc'))
    }
  }
};

//网站数据
const webdata = {
  state:{
    firsttitle:{//首页第一个栏目分类导航
      title:'最新热点',
      subtitle:[
        {
          name:'暮光对话',
          link:{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b5'}}
        },
        {
          name:'产业聚焦',
          link:{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1b9'},hash:'#newslistcon'}
        },
        {
          name:'音乐情报',
          link:{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1b8'},hash:'#newslistcon'}
        },
        {
          name:'全球拾趣',
          link:{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b6'}}
        },
      ]
    },
    secondtitle:{//首页第二个栏目分类导航
      title:'暮光精选',
      subtitle:[
        {
          name:'暮光电影TOP100',
          link:{name:'mtimetop'}
        },
        {
          name:'观影指南',
          link:{name:'news',params:{category:'industry'}}
        },
        {
          name:'最佳期待',
          link:{name:'discovery'}
        },
        {
          name:'正版商城',
          link:{name:'mtimeshop'}
        },
      ]
    }
  }
}

//请求的公用数据
const publicdata = {
  state:{
    rankdata:{
      ranklist:[],
      totalpages:0
    },
  },
  mutations:{
    fillranklist(state,{data}){
      state.rankdata.ranklist = data.data;
      state.rankdata.totalpages = data.totalpages
    }
  },
  actions:{
    fillranklist({commit},count,page){
      post('/api/ranklist',{page:Number(page),count:Number(count)}).then(r=>{
        commit('fillranklist',r)
      })
    }
  }
}
const store = new Vuex.Store({
  modules:{
    userinfo,
    menu,
    search,
    advertisement,
    webdata,
    publicdata,
  }
});

export default store
