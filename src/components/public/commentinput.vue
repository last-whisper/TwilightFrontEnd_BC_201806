<template>
  <div ref="usercomment" class="user-comment">
    <div v-if="userinfo" class="userpic float-left">
      <img :src="userpic" width="50" height="50" alt="">
      <p>{{this.$store.state.userinfo.userinfo.nickname}}</p>
    </div>
    <div ref="commentarea" class="comment-area float-left">
      <textarea :class="{focus:onfocus}"
        spellcheck="false"
        class="f-textarea"
        v-model="value"
        @focus="inputword()"
        @blur="check"
        :placeholder="placeholder"
      >
      </textarea>
      <button v-show="onfocus" @click="send()">提交</button>
      <p class="tip">{{tip}}</p>
    </div>
  </div>
</template>
<style>
  .user-comment .comment-area button{background: #679c21;
    border: none;color: #fff;position: absolute;right: 0;top:100px;}
  .user-comment .comment-area{position: relative;}
  .user-comment .userpic{width: 80px;text-align: center;margin-right: 20px;}
  .user-comment .userpic p{font-size: 12px;white-space: nowrap;}
  .user-comment textarea.focus{border:2px solid #679c21;    position: absolute;top: 0px;height: 100px;}
  .user-comment textarea{box-sizing: border-box;background: #fff;border: 1px solid #a9a9a9;height: 50px;
    font-size: 12px;padding: 0;resize: none;min-height: 50px;line-height: 18px;}
  .user-comment{width: 100%;height: 71px;}
</style>
<script>
  import userPic from '@/assets/images/defaulthead.gif'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        value:'',
        onfocus:false,
        port:this.$store.state.userinfo.port,
        tip:'',
      }
    },
    mounted(){
      if(this.userinfo){
        //显示头像
        this.$refs.commentarea.style.width = this.$refs.usercomment.clientWidth - 100 + 'px';

      }else {
        //不显示头像
        this.$refs.commentarea.style.width = '100%';
      }
    },
    props:{
      model:{
        type:String,
        default:'movie'
      },
      userinfo:{
        type:Boolean,
        default:true
      },
      placeholder:{
        type:String,
        default:'请输入评论'
      },

    },
    methods:{
      check(){
        setTimeout(()=>{
          this.onfocus = false;
        },200)

      },
      inputword(){
        this.onfocus = true;
      },
      send(){
        if(!this.$store.state.userinfo.userinfo.username){
          this.$store.commit('floatloginbaronooff');
          return
        }
        if(this.value.trim().length>300){
          this.tip = '不能超过300个字';
          return
        }
        if(!this.value.trim()){
          this.tip = '评论不能为空';
          return
        }
        post('/api/comment',{
          comment:this.value,
          user:this.$store.state.userinfo.userinfo._id,
          commenttype:this.model,
          ascription:this.$route.params.id,
        }).then(({data})=>{
          if(!data.code){
            this.value = '';
            // 评论成功后刷新评论区
            this.$emit('successed')
          }
          this.tip = data.message;
        })
      }
    },
    computed:{
      userpic(){
        if(this.$store.state.userinfo.userinfo.img){
          return this.port+this.$store.state.userinfo.userinfo.img
        }else {
          return userPic
        }
      },
    }
  }
</script>
