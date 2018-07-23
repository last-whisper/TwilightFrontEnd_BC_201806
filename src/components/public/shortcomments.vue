<template>
  <div class="shortcomments hidden">
    <div class="title">短影评</div>
    <ul v-if="commentsdata.length">
      <li class="hidden"
          v-show="index<shownum"
          v-for="(item,index) in commentsdata"
          :key="index">
        <dl class="float-left user-info">
          <dt class="float-left">
            <router-link :to="{name:'user',params:{id:item.user._id}}">
              <img width="50" height="50" :src="port+item.user.img" >
            </router-link>
          </dt>
          <dd>
            <p class="username ellipsis">{{item.user.nickname}}</p>
            <p class="time">{{item.time | localtime}}</p>
          </dd>
        </dl>
        <dl class="float-right comment hidden">
          <p class="con">
            {{item.comment}}
          </p>
          <div class="isagree">
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
        </dl>
      </li>

    </ul>
    <p class="text-center" v-else>快来抢沙发</p>
    <p
      v-if="commentsdata.length>shownum"
      @click = showall()
      class="viewmore text-center"
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
        shownum:5
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
        post('api/getshortcomments',{id:id}).then(({data})=>{
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
        return moment(iso).format('YYYY-MM-DD')
      }
    }
  }
</script>
<style>



  .shortcomments .viewmore i{padding: 0 6px;margin-left: 6px;
    background: url(../../assets/images/head.png) -152px 4px no-repeat;}
  .shortcomments .viewmore{padding-bottom: 15px;cursor: pointer;font-size: 13px;}


  .shortcomments  .isagree span:hover{color: #1f7dd7;}
  .shortcomments  .isagree span .down{background: url(../../assets/images/allicon24.png) -82px -30px no-repeat}
  .shortcomments  .isagree span .up{background: url(../../assets/images/allicon24.png) -66px -30px no-repeat}
  .shortcomments  .isagree span i{padding: 0 8px;margin-right: 6px;}
  .shortcomments  .isagree span{padding: 0 10px;cursor: pointer;user-select: none;}
  .shortcomments .isagree p.tip{width: 100%;position: absolute;top:-20px;font-size: 12px;color: #ccc;}
  .shortcomments .isagree{position: relative;float: right}
  .shortcomments p.con{text-align: justify; font-size: 16px;margin-bottom: 15px;
    line-height: 1.8em;}
  .shortcomments p.time{font-size: 12px;color: #b2b2b2; }
  .shortcomments p.username{color: #56aed7;}
  .shortcomments dl.user-info dd{float: right;width: 90px;}
  .shortcomments dl.comment{width: 475px;padding-left: 20px;border-left: 1px solid #e1e1e1;}
  .shortcomments dl.user-info{width: 150px;height: 50px;}
  .shortcomments ul{margin: 35px 0 15px;}
  .shortcomments li{margin:25px 20px 0;border-bottom: 2px dotted #e1e1e1;padding-bottom: 30px;}
  .shortcomments .title{color: #fff; width: 110px;line-height: 32px;    background: #999;font-size: 16px;text-align: center;}
  .shortcomments{background: #fff;padding-bottom: 25px;}
</style>
