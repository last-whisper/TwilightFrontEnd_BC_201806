<template>
  <div>
    <div class="rank-list-box" v-if="data.data.length">
      <dl v-for="(item,index) in data.data" :key="index">
        <dt>
          <h4> <router-link :to="{name:'rankdetail',params:{id:item._id}}"> {{item.title}}</router-link></h4>
          <p>{{item.introduce}}</p>
        </dt>
        <dd>
          <ul>
            <li v-for="(i,j) in item.list" :key="j">
              <router-link :to="{name:'moviedetail',params:{id:i._id}}">
                <img width="173" height="262" v-lazy="port+i.vertical" :alt="i.name">
                <p>{{i.name}} <span>{{i.showtime | getyear}}</span></p>
                <span class="time">{{i.score}}</span>
              </router-link>
            </li>
          </ul>
        </dd>
      </dl>
      <pages-info @changepage="sendpage" :totalpages="data.totalpages"></pages-info>
    </div>
    <div class="loadingimg ranklistbox" v-else>
      <img :src="loadingsrc" alt="">
    </div>
  </div>

</template>
<script>
  import pagesInfo from '@/components/public/pagesinfo'
  import moment from 'moment'
  export default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        loadingsrc:'../../static/images/twilight.gif',
        isScroll:0
      }
    },
    methods:{
      sendpage(index){
        this.isScroll++;
        this.$emit('changepage',index);
        if(this.isScroll>1){
          window.scrollTo(0,1950)
        }
      }
    },
    props:{
      data:{
        type:Object,
        required:true
      }
    },
    filters:{
      getyear(iso){
        return moment(iso).format('YYYY')
      }
    },
    components:{
      pagesInfo,
    }
  }
</script>
<style>
  .loadingimg.ranklistbox img{width: 60px;height: 60px;vertical-align: middle;background: none;}
  .loadingimg.ranklistbox{width: 1000px;margin: auto;text-align: center;line-height: 300px;}
  .rank-list-box dl ul{height: 365px;}
  .rank-list-box dl li span.time{background: #679c21;
    display: inline-block;
    position: relative;
    zoom: 1;
    padding: 4px 6px;margin-left: 6px;
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #fff;}
  .rank-list-box dl li p span{font-size: 12px;color: #999999;}
  .rank-list-box dl li p{padding: 6px;font-weight: bold;}
  .rank-list-box dl ul li:last-child{margin-right: 0;}
  .rank-list-box dl li{background: #fff;width: 173px;height: 353px;float: left;display: inline;padding: 3px;
    margin-right: 23px;    border: 1px solid #f5f5f5;
    box-shadow: 1px 1px 1px #f1f1f1;}
  .rank-list-box dd{margin-top: 25px;overflow: hidden;}
  .rank-list-box dt p{line-height: 1.6em;}
  .rank-list-box dt h4{font-size: 18px;margin-bottom: 10px;}
  .rank-list-box dl{margin-bottom: 60px;}
  .rank-list-box dt{border-left: 7px solid #ff6e00;font-size: 16px;color: #333;
    padding-left: 20px;line-height: 1.6em;}
  .rank-list-box{width: 1000px;margin: 0px auto;}
  .rank-list-box .showpages{text-align: center;}
</style>
