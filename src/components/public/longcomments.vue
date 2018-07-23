<template>
  <div id="longcomments">
    <div class="title">长影评</div>
    <ul v-if="commentsdata.length">
      <li v-show="index<shownum" class="hidden" v-for="(item,index) in commentsdata" :key="index">
        <div class="rank" v-if="index === 0">
          <p class="tip">TOP</p><p class="score">1</p>
        </div>
        <p class="con">
          {{item.comment}}
        </p>
        <div class="userinfo hidden">

          <div class="userinfo float-left">
            <div class="float-left user-head-pic">
              <router-link :to="{name:'user',params:{id:item.user._id}}">
                <img :src="port+item.user.img" width="50" height="50" alt="">
              </router-link>

            </div>
            <div class="float-right other">
              <p class="username">{{item.user.nickname}}</p>
              <p class="time">{{item.time | localtime}}</p>
            </div>
          </div>

          <div class="float-right ups">
            <p class="text-center tip" ref="tip"></p>
            <span @click="isagree(item._id,'agree',index)">
              <i class="up"></i>
              赞 ({{item.ups}})
            </span>
            <span @click="isagree(item._id,'disagree',index)">
              <i class="down"></i>
              踩 ({{item.disagree}})
            </span>
          </div>
        </div>
        <div class="line"></div>
      </li>
    </ul>
    <p class="text-center" v-else>快来抢沙发~</p>
    <p
      class="viewmore text-center"
      v-if="commentsdata.length>shownum"
      @click = showall()
    >显示更多 <i></i></p>
  </div>
</template>
<script>
  import moment from 'moment'
  import {post} from '@/server/'
  import {mapState} from 'vuex'
  export  default {
    data(){
      return {
        commentsdata:[],
        shownum:2
      }
    },
    computed:{
      ...mapState({
        port:state=>state.userinfo.port,
        user:state=>state.userinfo.userinfo._id
      })
    },
    methods:{
      showall(){
        this.shownum = 1000;
      },
      getdata(id){
        post('api/getlongcomments',{id:id}).then(({data})=>{
          this.commentsdata = data.data;
        })
      },
      isagree(id,type,index){
        if(!this.$store.state.userinfo.userinfo.username){
          this.$store.commit('floatloginbaronooff');
          return
        };
        post('/api/isagreecomment',{id,type,user:this.user})
          .then(({data})=>{
            if(!data.code){
              if(type === 'agree'){
                this.commentsdata[index].ups+=1;
              }else {
                this.commentsdata[index].disagree+=1;
              }
            }else {
              this.$refs.tip[index].innerText = data.message;
              setTimeout(()=>{
                this.$refs.tip[index].innerText = ''
              },1000);
            }
          })
      }
    },
    created(){
      this.getdata(this.$route.params.id)
    },
    watch:{
      $route(newvalue,oldvalue){
        this.getdata(newvalue.params.id);
      }
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>
<style>
  #longcomments .viewmore i{padding: 0 6px;margin-left: 6px;
    background: url(../../assets/images/head.png) -152px 4px no-repeat;}
  #longcomments .viewmore{padding-bottom: 15px;cursor: pointer;font-size: 13px;}
  #longcomments .ups p.tip{width: 100%;position: absolute;top:-20px;font-size: 12px;color: #ccc;}
  #longcomments .userinfo .ups span:hover{color: #1f7dd7;}
  #longcomments .userinfo .ups span .down{background: url(../../assets/images/allicon24.png) -82px -30px no-repeat}
  #longcomments .userinfo .ups span .up{background: url(../../assets/images/allicon24.png) -66px -30px no-repeat}
  #longcomments .userinfo .ups span i{padding: 0 8px;margin-right: 6px;}
  #longcomments .userinfo .ups span{padding: 0 10px;cursor: pointer;user-select: none;}
  #longcomments .userinfo .ups{margin-top: 20px;position: relative;}
  #longcomments .userinfo .time{font-size: 12px;color: #b2b2b2;}
  #longcomments .userinfo p.username{color: #56aed7;}
  #longcomments .userinfo .float-right.other{
    margin-top: 10px;}
  #longcomments .user-head-pic{margin-right: 10px;}
  #longcomments .line{margin: 30px 0 20px -80px ;border-bottom:2px dotted #999;}
  #longcomments p.con{font-size: 16px;text-align: justify;
    margin-bottom: 20px;
    line-height: 1.5em;
    color: #999;}
  #longcomments ul{margin: 35px 0 0;}
  #longcomments .rank p.score{    margin-right: 5px;
    font-size: 45px;
    line-height: 1em;
    font-weight: bold;}
  #longcomments .rank  p.tip{font-size: 18px;
    line-height: 1.2em;
    color: #fff;}
  #longcomments .rank{position: absolute;background: #ff9600;left: 0;

    width: 67px;
    height: 79px;
    position: absolute;

    top: 0;
    padding: 6px 8px 0 0;
    font-size: 18px;
    line-height: 1.2em;
    color: #fff;
    text-align: right;}
  #longcomments li{margin-top:15px;padding-left: 100px;position: relative;margin-right: 20px;}
  #longcomments .title{color: #fff; width: 110px;line-height: 32px;    background: #999;font-size: 16px;text-align: center;}
  #longcomments{background: #fff;padding-bottom: 25px;
    margin-bottom: 10px;}
</style>
