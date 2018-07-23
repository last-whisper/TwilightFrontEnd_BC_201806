<template>
  <div class="user-score hidden">
    <div class="core-tip" v-show="tiponoff">{{tip}}</div>
    <div class="user-info float-left">
      <img width="50" height="50" :src="userpic" alt="">
    </div>
    <div class="give-score float-left">
      <p>我要评分</p>
      <div class="func">
        <i class="ups" :class="{move:agreedone}">+1</i>
        <span @click="agree()">点赞</span>
        <i class="wantsee" :class="{move:seedone}">+1</i>
        <span @click="wantsee()">想看</span>
        <ul class="float-left">
          <li
            @click="scoresure()"
            @mouseout="exit()"
            @mouseover="givescore(index)"
            :class="{on:current && current > index}"
            v-for="(item,index) in array" :key="index"
          ></li>
        </ul>
        <span class="my-score">{{current}}分</span>
      </div>
    </div>
  </div>
</template>
<script>
  import userPic from '@/assets/images/defaulthead.gif'
  import {post} from '@/server/'
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        array:new Array(10).fill(''),
        current:0,
        isdone:false,
        tip:'',
        tiponoff:false,
        port:this.$store.state.userinfo.port,
        agreedone:false,
        seedone:false,
      }
    },
    methods:{
      //影片点赞
      agree(){
        if(!this.$store.state.userinfo.userinfo.username){
          this.$store.commit('floatloginbaronooff');
          return
        }
        let id = this.$route.params.id;
        post('/api/movieup',{user:this.user,id}).then(({data})=>{
          if(!data.code){
            //点赞成功，播放‘+1’的动画
            this.agreedone = true;
            setTimeout(()=>{
              this.agreedone = false
            },300)
          }
        })
      },
      //影片想看
      wantsee(){
        if(!this.$store.state.userinfo.userinfo.username){
          this.$store.commit('floatloginbaronooff');
          return
        };
        let id = this.$route.params.id;
        post('/api/moviewantsee',{user:this.user,id}).then(({data})=>{
          if(!data.code){
            //想看成功，播放‘+1’的动画
            this.seedone = true;
            setTimeout(()=>{
              this.seedone = false
            },300)
          }
        })
      },
      exit(){
        !this.isdone ? this.current = 0 : null;
        this.tiponoff = false
      },
      givescore(index){
        this.current = index + 1;
        this.tiponoff = true;
      },
      scoresure(){
        if(!this.$store.state.userinfo.userinfo.username){
          this.$store.commit('floatloginbaronooff');
          return
        }
        this.isdone = true;
      },

    },
    computed:{
      userpic(){
        if(this.$store.state.userinfo.userinfo.img){
          return this.port+this.$store.state.userinfo.userinfo.img
        }else {
          return userPic
        }
      },
      ...mapState({
        user:state=>state.userinfo.userinfo._id
      })

    },
    watch:{
      current(newvalue){
        if(!newvalue) return;
        if(newvalue === 1 || newvalue === 2){
          this.tip = '很差，完全是浪费时间';
        }else if(2 < newvalue && newvalue < 6){
          this.tip = '平庸之作，不看也罢';
        }else if(5 < newvalue && newvalue <8){
          this.tip = '一般，不妨一看';
        }else if(newvalue === 8){
          this.tip = '很好，公认的佳作';
        }else {
          this.tip = '很完美，绝对不容错过';
        }

      }
    }

  }
</script>
<style>
  .give-score .func i.move{top:-25px;z-index: 2;opacity: 1;transition: all ease-out .3s;}
  .give-score .func i.wantsee{left:76px;}
  .give-score .func i.ups{left:16px;}
  .give-score .func i{color: #FF9800;position: absolute;top:0;user-select: none;}
  .give-score .func{position: relative;z-index: 0}
  .give-score .my-score{width: 26px;text-align: center;}
  .give-score ul li.on{background:#679C21; }
  .give-score ul li{cursor: pointer; background: #fff; float: left; width: 10px;height: 20px; border:1px solid #ccc;margin-right: 3px;}
  .give-score span{user-select: none; position:relative;z-index:1;cursor: pointer; line-height: 19px; font-size: 12px; float:left;padding:1px 12px;margin-right:10px;background: #679c21;border-radius: 3px;color: #fff;}
  .user-score .user-info{margin-right: 10px;}
  .give-score p{color: #333;padding-bottom: 8px;font-size: 12px;}
  .user-score{position: relative;}
  .user-score .core-tip{ color: #679c21;text-align: center;position: absolute;top: -19px;left: 117px;
    background: url(../../assets/images/per_tip.png) no-repeat;width: 270px;height: 47px;line-height: 61px;}
</style>
