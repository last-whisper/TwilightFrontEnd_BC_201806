<template>
  <div id="mainmenu">
    <div class="mainmenu"  @mouseout="hideHeadTool()">
      <div class="menucon">
        <h1><router-link tag="a" :to="{name:'home'}"></router-link></h1>
        <!--主导航-->
        <ul>
          <router-link
            v-for="(item,index) in $store.state.menu.mainMenu"
            :key="index"
            tag="li"
            :to="{name:item.link}"
            exact
          >
            <a>
              {{item.navname}}
              <i></i>
              <em v-if="item.tag">{{item.tag}}</em>
            </a>
          </router-link>
        </ul>

        <!--购物-->
        <div id="cart-box" @mouseover="showHeadTool(1)">
          <i class="icocart"></i>

          <!--购物下拉框-->
          <div class="headtip"  v-show="headtool===1">
            <p class="tips">敬请期待...</p>
          </div>
        </div>

        <!--登陆注册-->
        <div class="headtool" id="sign-box" v-if="!userinfo.username">
          <i class="line"></i>
          <div class="headunlogin">
            <a id="loginbox"  @click="loginonoff=!loginonoff">登录<i :class="{'cur':loginonoff}"></i></a><em></em>
            <router-link tag="a" :to="{name:'register'}">注册</router-link>
          </div>

          <!--登陆下拉表单-->
          <div class="login-tip"  v-show="loginonoff">
            <div class="login-tool text-center">
              <p><strong>为爱电影的人</strong> For people who love movies</p>
            </div>
            <div class="user-login">
              <li>
                <input type="text" :placeholder="placeholder.username"
                 @focus="placeholder.username=''"
                 @blur="placeholder.username='输入用户名'"
                 v-model="username"
                >
              </li>
              <li>
                <input type="password" :placeholder="placeholder.key"
                 @focus="placeholder.key=''"
                 @blur="placeholder.key='输入密码'"
                 v-model="password"
                >
              </li>
              <p>
                <span class="red">{{loginresult}}</span>
                <router-link :to="{name:'register'}">立即注册</router-link>
              </p>
              <div class="text-center" @click="login()">登陆</div>
            </div>
          </div>
        </div>

        <!--用户信息-->
        <div class="headtool" id="userinfo-box"
             v-if="userinfo.username"
             @mouseover="showHeadTool(3)"
        >
          <i class="line"></i>
          <div id="head-logined">
            <a href="">
              <i :class="{cur:headtool===3}"></i>
              <img :src="src" :alt="username">
              <em id="nickname">{{userinfo.nickname}}</em>
              <b></b>
            </a>

            <!--用户详细信息-->
            <div class="userinfo" v-show="userinfo.username && headtool===3">
              <dl>
                <dd class="float-left">
                  <a href="">
                    <img :src="src" :alt="username">
                  </a>
                </dd>
                <dt class="float-right">
                  <p class="nickname">{{userinfo.nickname}}</p>
                  <span>积分：<span>{{userinfo.exp}}</span></span><em>|</em><a>我的主页</a>
                  <div><span>上次登陆</span></div>
                  <div><span>{{userinfo.lastloading | localtime}}</span></div>
                </dt>

              </dl>

              <dl>
                <dt>
                  您的标签：
                  <span v-for="(item,index) in tags" :key="index">
                    <a :_id="item._id">{{item.kind}}</a>
                    <em v-if="!(index==tags.length-1)">|</em>
                  </span>
                </dt>
                <dd class="collection">
                  期待影片：
                  <span v-for="(item,index) in wish">
                    <a :_id="item._id" class="add-book-name">{{item.name}}</a>
                  </span>

                </dd>
              </dl>
              <dl>
                <dd>
                  <router-link
                    class="admin"
                    v-if="userinfo.isAdmin"
                    :to="{name:'addnav'}"
                  >
                    进入后台管理
                  </router-link>
                  <router-link
                    class="admin"
                    v-else
                    :to="{name:'user',params:{id:userinfo._id}}"
                  >
                    进入个人主页
                  </router-link>
                  <a class="login-out" @click="loginout()">登出</a>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <!--app下载-->
        <div class="headtool" id="download-app" @mouseover="showHeadTool(4)">
          <i class="line"></i>
          <a>
            <i :class="{cur:headtool===4}"></i>
            <em class="ico-app"></em>
            <span>App下载</span>
            <b></b>
          </a>

          <!--app二维码-->
          <div class="headtip qrcode-tip" v-show="headtool===4">
            <a>
              <i class="qrcode">
                <img src="@/assets/images/code.jpg" alt="扫描二维码下载APP">
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //引入辅助函数
  import {mapActions,mapState} from 'vuex'
  import moment from 'moment'
  import defaultheadimg from '@/assets/images/defaulthead.gif'
  export default {
    data(){
      return {
        headtool:0,  //购物车app下载显示与否
        loginonoff:false,//登陆显示与否
        placeholder:{//登陆框表单控件提示信息
          username:'请输入用户名',
          key:'请输入密码'
        },
        username:'',
        password:'',
        loginresult:'',
        src:defaultheadimg
      }
    },
    computed:{
      ...mapState({
        userinfo:state=>state.userinfo.userinfo,
        port:state=>state.userinfo.port
      }),
      tags(){
        return this.userinfo.tags
      },
      wish(){
        return this.userinfo.wish
      },
      finallysrc(){
        return this.port+this.userinfo.img
      }
    },
    methods:{
      showHeadTool(num){
        this.headtool = num
      },
      hideHeadTool(){
        this.headtool = 0
      },
      ...mapActions(['fillMainMenu','fillUserInfo','dropout']),
      login(){
        this.fillUserInfo({
          username:this.username,
          password:this.password
        })
          .then(r=>{
            this.loginresult = this.$store.state.userinfo.loginresult.message;
            if(this.$store.state.userinfo.loginresult.code){
              this.loginonoff = true//登陆失败
            }else {
              this.loginonoff = false//登陆成功
              this.$router.push({name:'home'})//登陆成功后跳转至首页
            }
          })
      },
      loginout(){
        this.dropout()
      }
    },
    created(){
      //分发请求主导航的列表信息
      this.fillMainMenu()
    },
    watch:{
      finallysrc:function (newvalue,oldvalue){
        let img = new Image()
        img.onload=()=>{
          img.onload=null;
          this.src=img.src;
        };
        img.onerror=()=>{
          img.onerror=null;
          this.src=defaultheadimg
        }
        img.src=newvalue;
      }
    },
    filters:{
      //处理UTC时间格式
      localtime(utc,str='YYYY-MM-DD HH:mm'){
        return moment(utc).format(str)
      }
    }
  }
</script>
<style>
  #download-app i.cur{    width: 0;
    height: 0;
    overflow: hidden;
    border-bottom: 5px solid #fff;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -7px;}
  #download-app .qrcode-tip {
    right: -20px;
    box-shadow: none;
    border: none;
    position: absolute;
    top: 60px;
  }
  #download-app img{background: none;}
  #download-app a{
    margin-right: 0;
    padding-right:15px;
  }
  #download-app span{color: #fff}
  #download-app .ico-app{background: url(../../assets/images/head.png) -54px -45px no-repeat;
    display: inline-block;
    position: relative;
    zoom: 1;
    vertical-align: middle;
    width: 13px;
    height: 20px;
    margin-right: 5px;}
  #head-logined a.admin{float: left;height: 32px;
    line-height: 32px;border-radius: 50px;
    background: #f4f4f4;
    color: #333;
    border: 1px solid #d9d9d9;
    text-align: center;
    font-size: 14px;width: 140px;
  }
  #head-logined a.admin:hover{
    background: #1e7dd7;
    border-color: #1e7dd7;
    color: #fff;
  }
  #head-logined a.login-out{    width: 90px;
    float: right;
    height: 32px;
    line-height: 32px;border-radius: 50px;
    background: #f4f4f4;
    color: #333;
    border: 1px solid #d9d9d9;
    text-align: center;
    font-size: 14px;}
  #head-logined a.login-out:hover{
    background: #1e7dd7;
    border-color: #1e7dd7;
    color: #fff;
  }

  #head-logined dl a{
    line-height: 24px;
    right: 0;
    color: #333;
    padding-right: 0;
  }
  #head-logined .userinfo dl em{color: #f1f1f1;
    padding: 0 8px;}

  #head-logined .userinfo dl{}
  #head-logined .userinfo dl p.nickname{font-size: 18px;
    margin-bottom: 10px;}
  #head-logined .userinfo dl:first-child dd {
    width: 100px;
    height: 100px;
  }

  #head-logined .userinfo dl:first-child dt {
    width: 176px;
    height: 100px;

  }

  #head-logined .userinfo img {
    border-radius: 70px;
    border: none;
    width: 100px;
    height: 100px;
  }

  #head-logined .userinfo dl:not(:last-child) {
    border-bottom: 1px solid #f1f1f1;

  }
  #head-logined .userinfo dl{
    padding: 15px 0;
    overflow: hidden;
  }

  #head-logined .userinfo {

    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .25);
    position: absolute;
    top: 60px;
    /* display: none; */
    border: 1px solid #f5f5f5;
    border-top: none;
    padding: 10px 20px 0px;
    right: 0;
    width: 300px;
  }

  #head-logined a {
    margin-right: 0;
    padding-right: 15px;
  }

  #head-logined b,#download-app b {
    background: url(../../assets/images/head.png) -140px 0 no-repeat;
    width: 7px;
    height: 4px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -2px;
    opacity: .7;
  }

  #head-logined em {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-style: normal;
    max-width: 84px;
  }

  #head-logined img {
    background: #fff;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #c9c9c9;
    margin-right: 5px;
  }

  #sign-box .login-tool strong {
    display: block;
    font-size: 22px;
    font-weight: lighter;
    color: #333;
    padding-bottom: 3px;
    line-height: 1.1;
  }

  #sign-box .login-tool p {
    font-size: 16px;
    color: #9b9b9b;
  }

  #sign-box .user-login p {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #999;
    font-size: 12px;
  }

  #sign-box .user-login p span.red {
    color: red
  }

  #sign-box .user-login p a {
    line-height: 40px;
    margin-right: 0;
    color: #999;
    float: right;
  }

  #sign-box .user-login div {
    height: 30px;
    line-height: 30px;
    background: #1870c9;
    border-radius: 50px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  #sign-box .user-login li {
    border: 1px solid #9b9b9b;
    margin: 10px 0 0;
    border-radius: 5px;
    position: relative;
    height: 38px;
    line-height: 38px;
  }

  #sign-box .user-login input {
    border: none;
    width: 90%;
    padding: 0 12px;
    background: 0 0;
    color: #949494;
  }

  #sign-box .headunlogin a {
    margin-right: 0;
  }

  #sign-box .login-tip {
    width: 245px;
    padding: 20px;
    right: 0;
    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .25);
    position: absolute;
    top: 60px;

    border: 1px solid #f5f5f5;
    border-top: none;
  }

  .mainmenu .headunlogin {
    position: relative;
    padding: 0 17px;
  }

  .mainmenu .headunlogin em {
    width: 0;
    height: 16px;
    border-left: 1px solid #303947;
    margin: 0 23px;
  }

  .mainmenu .headtool {
    float: right;
    position: relative;
    padding: 0 18px;
  }

  .mainmenu .headtool i.line {
    height: 60px;
    width: 0;
    position: absolute;
    left: 0;
    top: 0;
    border-left: 1px solid #141c28;
    border-right: 1px solid #303947;
    overflow: hidden;
  }

  #cart-box {
    background: #e83729;
    height: 62px;
    width: 62px;
    position: absolute;
    top: 0;
    right: 20px;
    z-index: 2;
    cursor: pointer;
  }

  #cart-box .headtip {
    width: 350px;
    border-top: 3px solid #e83729;
    right: 0;
    background: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .25);
    position: absolute;
    top: 60px;

  }

  #cart-box .headtip p {
    text-align: center;
    color: #999;
    padding: 100px 0;
  }

  #cart-box i {
    background: url(../../assets/images/head.png) 0 -45px no-repeat;
    width: 26px;
    height: 20px;
    position: absolute;
    left: 18px;
    top: 21px;
  }

  .mainmenu {
    background: rgb(25, 35, 50);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .menucon {
    min-width: 1092px;
    height: 60px;
    padding: 0 88px 0 20px;
    position: relative;
    z-index: 5;
  }

  .mainmenu h1 {
    width: 117px;
    height: 36px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -18px 0 0 -58px;
  }

  .mainmenu h1 a {
    background: url(../../assets/images/head.png) 0 -315px no-repeat;
    width: 117px;
    height: 36px;
    display: block;
    font-size: 0;
    line-height: 0;
  }

  .mainmenu .menucon ul {
    float: left;
    font-size: 14px;
  }

  .mainmenu ul li {
    float: left;
    height: 60px;
  }

  .mainmenu .menucon a {
    display: inline-block;
    vertical-align: middle;
    color: #c8c8c8;
    line-height: 60px;
    margin-right: 35px;
    position: relative;
  }

  .mainmenu .menucon a:hover {
    color: #fff;
  }

  .mainmenu li.router-link-active a {
    color: #fff;
    font-weight: 700;
  }

  .mainmenu .menucon i.cur, .mainmenu li.router-link-active i{
    width: 0;
    height: 0;
    overflow: hidden;
    border-bottom: 5px solid #fff;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -7px;
  }

  .mainmenu .menucon li em {
    width: 28px;
    height: 14px;
    position: absolute;
    right: -26px;
    top: 15px;
    font-size: 10px;
    text-align: center;
    line-height: 13px;
    background: red;
    border-radius: 20px;
    font-style: normal;
    color: #fff;
    font-family: Consolas;
  }
  #mainmenu{
    position: relative;
    z-index:1555;}
</style>
