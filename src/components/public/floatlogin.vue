<template>
  <div id="mask" ref="mask">
    <div id="float-login" ref="loginbar">
      <div @click="close()" class="exit"></div>
      <div class="login regin">
        <dl>
          <dt>为爱电影的人</dt>
          <dd>For people who love movies</dd>
        </dl>
        <ul>
          <li>
            <input type="text"
                   v-model="loginbarinfo.currentUsername"
                   placeholder='请输入用户名'
            >
          </li>
          <li>
            <input type="password"
                   v-model="loginbarinfo.currentPassword"
                   placeholder='请输入密码'
            >
          </li>
        </ul>

        <div class="text-center login-tip">
          {{loginbarinfo.loginResult}}
          <router-link class="float-right" :to="{name:'register'}">立即注册</router-link>
        </div>
        <div class="login-send text-center" @click="sendingLogin()">登陆</div>
      </div>
    </div>
  </div>

</template>
<script>
  import tools from '@/assets/js/tools.js'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        loginbarinfo:{
          currentUsername:'',
          currentPassword:'',
          loginResult:''}
      }
    },
    methods:{
      //发送登陆验证前进行先本地验证
      sendingLogin(){
        //检查用户名格式
        let result = tools.regexp(this.loginbarinfo.currentUsername,{simple:'number',sure:11});
        if (!result.code && this.loginbarinfo.currentPassword.trim()){

          //本地验证成功
          this.$store.dispatch('fillUserInfo',{
            username:this.loginbarinfo.currentUsername,
            password:this.loginbarinfo.currentPassword
          }).then(r=>{

            if(!this.$store.state.userinfo.loginresult.code){
              this.close();//登陆成功关闭登陆框
            }else {
              this.loginbarinfo.loginResult=this.$store.state.userinfo.loginresult.message//显示登陆错误信息
            }

          })
        }else {
          //本地验证失败
          if(result.code){
            this.loginbarinfo.loginResult='用户名'+result.message
          }else {
            this.loginbarinfo.loginResult='密码不能为空'
          }

        }
      },
      showmask(){
        let x = document.documentElement.clientWidth;
        let y = document.documentElement.clientHeight;
        this.$refs.mask.style.width = x + 'px';
        this.$refs.mask.style.height = y + 'px';
        this.$refs.loginbar.style.left = (x - 500)/2 + 'px';
        this.$refs.loginbar.style.top = (y - 400)/2 + 'px';
      },
      //关闭登陆框
      close(){
        this.$store.commit('floatloginbaronooff',false)
      }

    },
    mounted(){
        this.showmask()
        window.addEventListener('resize',()=> {
          this.showmask()
        })
    }
  }
</script>
<style>
  #mask dl dd{color: #a3a3a3;font-size: 24px;font-weight: normal;}
  #mask dl dt{font-size: 38px;font-weight: 200;margin-bottom: 20px;}
  #mask dl{text-align: center;}
  #mask{top:0px;left: 0;background: rgba(0, 0, 0, 0.5);position: fixed;z-index: 20000;}
  #float-login{padding:50px 0 ;position: absolute;background: #fff;border-radius:5px;width: 500px; }
  #float-login .exit{width: 42px;height: 42px;display: inline-block;vertical-align: middle;
    overflow: hidden;position: absolute;background: url(../../assets/images/mtipbar_num.png) no-repeat -67px 0;
    right: -20px;top: -20px;cursor: pointer;z-index: 1;}
  #float-login .login-send{margin-top: 10px; color: #fff;background: #1e7dd7;border: 1px solid #1e7dd7;width: 100%;
    height: 48px;padding: 0;text-align: center;font-size: 20px;overflow: hidden;display: inline-block;
    vertical-align: middle;cursor: pointer;border-radius: 50px;line-height: 48px;}
  #float-login li input{background: none;height: 21px;border: none;padding: 14px;line-height: 21px;font-size: 14px;width: 345px;}
  #float-login li.cur{border: 1px solid #1db14d}
  #float-login li.err{border: 1px solid red}
  #float-login li {position: relative;
    border: 1px solid #aaa;
    zoom: 1;
    height: 49px;
    width: 375px;
    margin-top: 23px;
    border-radius: 4px;
    vertical-align: baseline;
    display: inline-block;
    z-index: 1;}

  #float-login .login .login-tip{
    color: red;
    line-height: 30px;
    height: 30px;
    font-size: 14px;}
  #float-login .regin{width: 380px;margin: auto;}

</style>
