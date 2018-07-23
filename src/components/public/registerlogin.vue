<template>
  <div id="register">
      <div class="register">
        <div class="regin-line"></div>
        <!--左侧注册-->
        <div class="new-user regin float-left">
          <h5>新会员注册</h5>
          <ul>
            <li :class="haserr.username" >
              <input type="text"
                     :placeholder="placeholder.username"
                     @focus="usernameOnFocus()"
                     @blur="usernameOnBlur()"
                     @input="checkUsername()"
                     v-model="currentUsername"
              >
              <div class="tips">{{tips.username}}</div>
            </li>
            <li :class="haserr.password" >
              <input :type="type.password"  :placeholder="placeholder.password"
                     @focus="passwordOnFocus()"
                     @blur="passwordOnBlur()"
                     @input="checkPassword()"
                     v-model="currentPassword"
              >
              <div class="tips">{{tips.password}}</div>
              <div class="show-password"
                   :class="{'check-box-on':type.password=='text'}"
                   @click="type.password=='password' ? type.password='text' : type.password='password'"
              ></div>
              <div class="password-power">
                <div class="power">{{passwordPower.tips}}</div>
                <span :class="{on:passwordPower.num>0}" class="inline-block"></span>
                <span :class="{on:passwordPower.num>1}" class="inline-block"></span>
                <span :class="{on:passwordPower.num>2}" class="inline-block"></span>
              </div>
            </li>
            <li :class="haserr.repassword" >
              <input :type="type.repassword" :placeholder="placeholder.repassword"
                     @focus="repasswordOnFocus()"
                     @blur="repasswordOnBlur()"
                     @input="checkRepassword()"
                     v-model="currentRepassword"
              >
              <div class="tips">{{tips.repassword}}</div>
              <div class="show-password"
                   :class="{'check-box-on':type.repassword=='text'}"
                   @click="type.repassword=='password'?type.repassword='text':type.repassword='password'"
              ></div>
            </li>
          </ul>
          <div class="isagree">
            <a
              class="check-box"
              :class="{'check-box-on':isagree}"
              @click="checkbox()"
            >
            </a>
            <a>已同意《Mtime时光网服务条款》</a>
            <span class="tips red float-right">{{tips.isagree}}</span>
          </div>
          <div class="register-send">
            <a
              :class="{sending:registerResult!='注册'}"
              @click="sendingRegister()"
            >
              {{registerResult}}
            </a>
          </div>
        </div>
        <!--右侧登陆-->
        <div class="login regin float-right">
          <h5>会员登陆</h5>
          <ul>
            <li>
              <input type="text"
                     v-model="loginbarinfo.currentUsername"
                     :placeholder='loginbarinfo.usernamePlaceholder'
                     @focus="loginUsernameOnFocus()"
                     @blur="loginUsernameOnBlur()"
              >
            </li>
            <li>
              <input type="password"
                     v-model="loginbarinfo.currentPassword"
                     :placeholder='loginbarinfo.passwordPlaceholder'
                     @focus="loginPasswordOnFocus()"
                     @blur="loginPasswordOnBlur()"
              >
            </li>
          </ul>
          <div class="text-center login-tip">{{loginbarinfo.loginResult}}</div>
          <div class="login-send text-center"><a @click="sendingLogin()">登陆</a></div>
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
        //用于表单项边框颜色处理
        haserr:{//表单项填写是否有误
          username:'',
          password:'',
          repassword:''
        },
        //表单项placeholder
        placeholder:{
          username:'用户名',
          password:'密码',
          repassword:'确认密码'
        },
        //表单项错误提示信息
        tips:{
          username:'',
          password:'',
          repassword:'',
          isagree:''
        },
        //表单控件类型，用于切换密码显示方式
        type:{
          password:'password',
          repassword:'password'
        },
        //表单项v-model绑定
        currentPassword:'',
        currentUsername:'',
        currentRepassword:'',
        //提交信息本地检测结果
        isagree:false,//是否同意了条款
        usernamePass:false,
        passwordPass:false,
        repasswordPass:false,
        //注册按钮显示信息
        registerResult:'注册',
        //登陆面板信息
        loginbarinfo:{
          currentUsername:'',
          currentPassword:'',
          usernameTip:'',
          passwordTip:'',
          loginResult:'',
          usernamePlaceholder:'您的手机号',
          passwordPlaceholder:'字母开头，6-8个字符'
        }
      }
    },
    methods:{
      //登陆
      loginUsernameOnFocus(){
        this.loginbarinfo.usernamePlaceholder=''
      },
      loginUsernameOnBlur(){
        this.loginbarinfo.usernamePlaceholder='您的手机号'
      },
      loginPasswordOnFocus(){
        this.loginbarinfo.passwordPlaceholder=''
      },
      loginPasswordOnBlur(){
        this.loginbarinfo.passwordPlaceholder='字母开头，6-8个字符'
      },
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
              this.$router.push({name:'home'})//登陆成功后跳转至首页
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
      //注册
      usernameOnFocus(){
        this.haserr.username='cur';
        this.placeholder.username=''
      },
      usernameOnBlur(){
        this.haserr.username='';
        this.placeholder.username='用户名'
      },
      passwordOnFocus(){
        this.haserr.password='cur';
        this.placeholder.password=''
      },
      passwordOnBlur(){
        this.haserr.password='';
        this.placeholder.password='密码'
      },
      repasswordOnFocus(){
        this.haserr.repassword='cur';
        this.placeholder.repassword=''
      },
      repasswordOnBlur(){
        this.haserr.repassword='';
        this.placeholder.repassword='确认密码'
      },
      checkUsername(){
        //用户名必须是11位的纯数字组成
        let result = tools.regexp(this.currentUsername,{simple:'number',sure:11})
        if (result.code){

          this.haserr.username='err';
          this.tips.username='用户名'+result.message;
          this.usernamePass=false;

        }else {

          this.tips.username='正在验证...';
          post('/userinfo/register/username',{username:this.currentUsername}).then(r=>{
            if (r.data){
              if (r.data.code){//用户名存在

                this.haserr.username='err';
                this.tips.username='该用户名已被注册';
                this.usernamePass=false;

              }else {

                this.haserr.username='';
                this.tips.username='';
                this.usernamePass=true;

              }
            }else {

              this.haserr.username='err';
              this.tips.username='验证出错';
              this.usernamePass=false;

            }
          })
        }
      },
      checkPassword(){
      //用户密码必须是数字，字母，或者'_'组成，长度为6-8个字符
        let result = tools.regexp(this.currentPassword,{simple:false,max:8,symbol:true})
        if (result.code){

          this.haserr.password='err';
          this.tips.password='用户密码'+result.message;
          this.passwordPass=false

        }else {

          //如果repassword有输入内容，那么需要判断两次密码是否一致
          this.passwordPass=true
          if(this.currentRepassword){
            this.checkRepassword()
          }
          this.haserr.password='';
          this.tips.password='';

        }
      },
      checkRepassword(){
        if (this.currentPassword!==this.currentRepassword){

          this.haserr.repassword='err';
          this.tips.repassword='两次输入的密码不一致';
          this.repasswordPass=false;

        }else {

          this.repasswordPass=true;
          this.haserr.repassword='';
          this.tips.repassword='';

        }
      },
      checkbox(){
        this.isagree=!this.isagree;
        this.isagree?this.tips.isagree='':this.tips.isagree='是否同意条款？'
      },
      sendingRegister(){
        if (this.usernamePass && this.passwordPass && this.repasswordPass && this.isagree){

          //本地信息校验成功，发送账号注册请求
          this.registerResult='请稍等...';
          let postData = {
            username:this.currentUsername,
            password:this.currentPassword
          };
          post('/userinfo/register',postData)
            .then(r=>{
              if (r.data){
                if (r.data.code){
                  //注册失败
                  this.registerResult=r.data.message
                }else {
                  //注册成功跳转至首页,前端再使用session登陆
                  this.registerResult='注册成功！正在为您跳转至首页';
                  this.$store.state.userinfo.unlogin = false;
                  setTimeout(()=>{this.$router.push({name:'home'})},800)
                }

              }else {

              }
            })

        }else {

          this.checkUsername();
          this.checkPassword();
          if(!this.isagree) this.tips.isagree='是否同意条款？';
          this.registerResult='请核对信息';
          setTimeout(()=>{this.registerResult='注册'},1000)

        }
      }
    },
    computed:{
      passwordPower(){
        let result={tips:'密码强度',num:0};
        let n =this.currentPassword.length;
        if (n>0 && n<6){
          result.tips='弱';
          result.num = 1;
        }else if (n>=6 && n<8){
          result.tips='中';
          result.num = 2;
        }else if (n>=8){
          result.tips='强';
          result.num = 3;
        }
        return result
      }
    }
  }
</script>
<style>
  #register .register-send{
    margin-top: 40px;}
  #register .login-send{
    margin-top: 10px;
  }
  #register .register-send a.sending{font-size: 14px}
  #register .register-send a:hover,#register .login-send a:hover{background:#1498d4; }
  #register .register-send a,#register .login-send a{background: #0081bc;
    margin: auto;
    width: 257px;
    height: 53px;
    display: block;
    overflow: hidden;
    font-size: 20px;
    line-height: 53px;
    border-radius: 27px;
    color: #fff;
    text-align: center;
    vertical-align: middle;}
  #register .isagree .check-box{    width: 24px;
    height: 24px;
    display: inline-block;
    position: relative;
    zoom: 1;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 6px;
    background-image: url("../../assets/images/choose.png");
    background-position:-2px -24px;
  }
  #register .isagree .check-box-on{
    background-position:-2px 0;
  }

  #register .isagree{    padding-top: 40px;
    font-size: 14px;}

  #register .password-power{color: #949494;
    position: absolute;
    right: 10px;
    top: 11px;
    font-size: 12px;}
  #register .password-power span.on{
    background: red
  }
  #register .password-power span{    background: #c5c5c5;
    overflow: hidden;
    display: inline-block;
    width: 14px;
    height: 4px;
    position: relative;
    top: -10px;}
  #register .power{
    color: #949494;
text-align: right;
    font-size: 12px;
  }
  #register .show-password{
    background-image: url(../../assets/images/showcode.png) ;
    background-repeat: no-repeat;
    width: 25px;
    height: 17px;
    position: absolute;
    right: 75px;
    top: 50%;
    margin-top: -9px;
    cursor: pointer;}
  #register li .check-box-on{
    background-position:0px -17px;
  }
  #register div.tips{width: 345px;
    position: absolute;
    left: -1px;
    top: 50px;

    color: red;
    line-height: 22px;
    padding: 0 15px;
    font-size: 12px;}

  #register li input{
    background: none;
    height: 21px;
    border: none;
    padding: 14px;
    line-height: 21px;
    font-size: 14px;
    width: 345px;}
  #register li.cur{border: 1px solid #1db14d
  }
  #register li.err{border: 1px solid red}
  #register li {position: relative;
    border: 1px solid #aaa;
    zoom: 1;
    height: 49px;
    width: 375px;
    margin-top: 23px;
    border-radius: 4px;
    vertical-align: baseline;
    display: inline-block;
    z-index: 1;}
  #register .regin h5{
    font-size: 30px;
    line-height: 1em;
    text-align: center;
    padding-bottom: 10px;
    font-weight: 400;
  }
  #register .regin-line{
    background: #dedede;
    background: -webkit-gradient(linear,left top,left bottom,from(#fff),color-stop(10%,#dedede),color-stop(90%,#dedede),to(#fff));
    background: -webkit-linear-gradient(#fff,#dedede 10%,#dedede 90%,#fff);
    background: -o-linear-gradient(#fff 0,#dedede 10%,#dedede 90%,#fff 100%);
    background: linear-gradient(#fff,#dedede 10%,#dedede 90%,#fff);
    width: 1px;
    height: 482px;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 50px;
  }
  #register .login .login-tip{
    color: red;
    line-height: 60px;
    height: 60px;
    font-size: 14px;}
  #register .regin{width: 380px;}
  #register .register{    background: #fff;
    width: 870px;
    margin: auto;
    border-radius: 6px;
    position: relative;
    min-height: 480px;
    padding: 30px 65px 60px
  }
  #register{padding: 100px 0;background:#e3e3e5;}
</style>
