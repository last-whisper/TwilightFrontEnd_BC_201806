<template>
  <div class="newstitle-text-photos" v-if="newsdata">
    <div class="title">
      <h2>{{newsdata.title}}</h2>
      <h3>{{newsdata.subtitle}}</h3>
    </div>
    <div class="news-info">
      <span class="time">{{newsdata.editdate | localtime}}</span>
      <span class="anthor">来源：Mtime时光网</span>
      <span class="commentcount"><i></i> {{newsdata.commontcount}}</span>
      <span class="readcount"><i></i>{{newsdata.readingcount}}</span>
      <span
        @click="isagree('agree')"
        class="ups func">
        <i></i>{{newsdata.up}}<em :class="{on:success}">+1</em>
      </span>
      <span
        @click="isagree('disagree')"
        class="disagree func">
        <i></i>{{newsdata.disagree}}<em :class="{on:dissuccess}">+1</em>
      </span>
    </div>
  </div>
</template>
<style>
  .newstitle-text-photos .news-info span em.on{top:-15px;transition:all ease-in-out .35s;opacity: 1;z-index: 2;}
  .newstitle-text-photos .news-info span em{top: 0; position: absolute;color: #d67200;z-index: -2;left: 8px;opacity: 0;}
  .newstitle-text-photos .news-info span{margin-right: 22px;position: relative;cursor: pointer;}
  .newstitle-text-photos .news-info .ups i{background-position:-69px 0; }
  .newstitle-text-photos .news-info .readcount i{background-position:-45px 0; }
  .newstitle-text-photos .news-info .disagree i{background-position:-20px 0; }
  .newstitle-text-photos .news-info i{background: url(../../assets/images/newsicon.png) no-repeat;
    padding:0 10px;margin-right: 8px;}
  .newstitle-text-photos .news-info{   width: 1000px;margin:15px auto;box-sizing: border-box;
    padding-left: 25px;color: #666;}
  .newstitle-text-photos h3{font-size: 28px;line-height: 1em;margin-top: 17px;}
  .newstitle-text-photos h2{font-size: 36px;line-height: 1em;}
  .newstitle-text-photos .title{box-sizing: border-box;border-left: 9px solid #d01538;text-indent: 10px;}
  .newstitle-text-photos .title{width: 1000px;margin: auto;}
  .newstitle-text-photos{background: #f2f2f2;border-bottom: 1px solid #e5e5e5;padding-top: 50px;}
</style>
<script>
  import moment from 'moment'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        success:false,//点赞点踩操作是否成功
        dissuccess:false
      }
    },
    props:{
      newsdata:{
        type:Object,
        required:true
      }
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    methods:{
      isagree(str){
        if(!this.$store.state.userinfo.userinfo._id){
          this.$store.commit('floatloginbaronooff');
          return
        }
        post('/api/isagreenews',{
          id:this.$route.params.id,
          type:str,
          user:this.$store.state.userinfo.userinfo._id
        })
          .then(({data})=>{
            if(data.code){
              if(str === 'agree'){
                this.success = false
              }else {
                this.dissuccess = false
              }

            }else {
              if(str === 'agree'){
                this.success = true;
                setTimeout(()=>{this.success = false},350);
                this.$emit('success','up')//让父组件将点赞数和点踩数的数据变化
              }else {
                this.dissuccess = true;
                setTimeout(()=>{this.dissuccess = false},350);
                this.$emit('success','disagree')//让父组件将点赞数和点踩数的数据变化
              }

            }
          })
      }
    }
  }
</script>
