<template>
  <div id="rank-price">
    <div class="rank-price">
      <!--特色榜单-->
      <div class="rank-list float-left">
        <div class="t-head">
          <h4>特色榜单</h4>
          <router-link :to="{name:'discovery'}" class="float-right">更多<i class="gt"></i></router-link>
        </div>
        <ul v-if="movielist.length">
          <li v-for="(item,index) in movielist" :key="index">
            <dl>
              <dt>
                <router-link :to="{name:'rankdetail',params:{id:item._id}}">
                  <img v-lazy="port+item.list[0].horizontal"  :alt="port+item.list[0].name">
                </router-link>
              </dt>
              <dd>
                <router-link :to="{name:'rankdetail',params:{id:item._id}}">
                  <img v-lazy="port+item.list[1].horizontal"  :alt="port+item.list[1].name">
                </router-link>
              </dd>
              <dd class="statistics">
                <router-link :to="{name:'rankdetail',params:{id:item._id}}">
                  <img v-lazy="port+item.list[0].horizontal"  :alt="port+item.list[0].name">
                  <span><strong>{{item.list.length}}</strong>部电影></span>
                </router-link>
              </dd>
            </dl>
            <h3><router-link :to="{name:'rankdetail',params:{id:item._id}}">{{item.title}}</router-link></h3>
            <p class="ellipsis summary">{{item.introduce}}</p>
          </li>
        </ul>
        <div class="loadingimg" v-else>
          <img :src="loadingsrc" alt="">
        </div>
      </div>

      <!--电影票房-->
      <div class="total-price float-right">
        <div class="t-head">
          <h4>电影票房</h4>

        </div>
        <dl class="time">
          <dd :class="{cur:currentshow === 'show'}" @mouseover="currentshow='show'"><span>热映</span></dd>
          <dd :class="{cur:currentshow === 'year'}" @mouseover="currentshow='year'"><span>{{thisyear}}</span></dd>
          <dd :class="{cur:currentshow === 'history'}" @mouseover="currentshow='history'"><span>历史</span></dd>
        </dl>
        <div class="box-list">
          <ul v-show="currentshow === 'show'">
            <li v-if="hotshowdata.length" v-for="(item,index) in hotshowdata" :key="index">
              <dl>
                <dt>0{{index+1}}</dt>
                <dd class="pic">
                  <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                    <img v-lazy="port+item.vertical"  :alt="item.name">
                  </router-link>
                  <i>{{item.score}}</i>
                </dd>
                <dd class="text">
                  <h3 class="ellipsis">
                    <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
                  </h3>
                  <p>总票房：{{item.totalprice | moneyFormat}}</p>
                  <p>票价：{{item.price}}元起</p>
                  <p>单位：元</p>
                </dd>
              </dl>
            </li>
          </ul>
          <ul v-show="currentshow === 'year'">
            <li v-if="thisyeardata.length" v-for="(item,index) in thisyeardata" :key="index">
              <dl>
                <dt>0{{index+1}}</dt>
                <dd class="pic">
                  <router-link  :to="{name:'moviedetail',params:{id:item._id}}">
                    <img v-lazy="port+item.vertical"  :alt="item.name">
                  </router-link>
                  <i>{{item.score}}</i>
                </dd>
                <dd class="text">
                  <h3 class="ellipsis">
                    <router-link  :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
                  </h3>
                  <p>总票房：{{item.totalprice | moneyFormat}}</p>
                  <p>票价：{{item.price}}元起</p>
                  <p>单位：元</p>
                </dd>
              </dl>
            </li>
          </ul>
          <ul v-show="currentshow === 'history'">
            <li v-if="historydata.length" v-for="(item,index) in historydata" :key="index">
              <dl>
                <dt>0{{index+1}}</dt>
                <dd class="pic">
                  <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                    <img v-lazy="port+item.vertical"  :alt="item.name">
                  </router-link>
                  <i>{{item.score}}</i>
                </dd>
                <dd class="text">
                  <h3 class="ellipsis">
                    <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
                  </h3>
                  <p>总票房：{{item.totalprice | moneyFormat}}</p>
                  <p>票价：{{item.price}}元起</p>
                  <p>单位：元</p>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {post,get} from '@/server/'
  import moment from 'moment'
  import {mapActions,mapState} from 'vuex'
  export default {
    data(){
      return {
        currentshow:'show',
        hotshowdata:[],//热映排行数据
        thisyeardata:[],//今年票房排行数据
        historydata:[],//历史总票房排行数据
        port:this.$store.state.userinfo.port,
        thisyear:moment().format('YYYY'),
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    created(){
      this.fillranklist(4);//派发请求排行榜数据的action，只要4条进行首页展示
      post('/rank/totalprice-show',{limit:3}).then(({data})=>{
        this.hotshowdata = data.data;
      });
      post('/rank/totalprice-year',{limit:3}).then(({data})=>{
        this.thisyeardata = data.data;
      });
      post('/rank/totalprice',{limit:3}).then(({data})=>{
        this.historydata = data.data;
      });
    },
    computed:{
      ...mapState({
        movielist:state=>state.publicdata.rankdata.ranklist,//排行榜数据
      })
    },
    methods:{
      ...mapActions(['fillranklist']),
    },
    filters:{
      //处理UTC时间格式
      localtime(utc,boolean){
        if(boolean){
          return moment(utc).format('MM-DD')
        }
        return moment(utc).format('YYYY.MM.DD')
      },
      //处理金额
      moneyFormat(str) {
        str = str.toString();
        if(typeof str !== 'string' || !str) return '格式错误';
        if(str.length<=5){ //万
          return str
        }else if(str.length>5 && str.length <= 8){//千万
          let n = str.length-4;
          return str.substr(0,n)+'.'+str.substr(n,2)+'万'
        }else {//亿
          let  n= str.length-8;
          return str.substr(0,n)+'.'+str.substr(n,2)+'亿'
        }
      }
    }
  }
</script>
<style>
  #rank-price .loadingimg img{background: none;width: 60px;height: 60px;vertical-align: middle;}
  #rank-price .loadingimg{width: 878px;height: 490px;line-height: 490px;text-align: center;}
  #rank-price .rank-list p.summary{width: 420px;    color: #7c7c7c;
    line-height: 36px;}
  .total-price .view-more{margin-top: 5px;}
  .total-price img{width: 80px;height: 120px;}
  .total-price .text p{color: #888;}
  .total-price .text h3{font-size: 16px;
    font-weight: 400;
    padding: 3px 0 8px;}
  .total-price li dd.text{
    width: 170px;
    margin-left: 9px;float: left;}
  .total-price li dd.pic i{position: absolute;
    right: 0;margin-top: 5px;display: inline-block;zoom: 1;background: #74ab34;width: 32px;font-style: normal;
    height: 20px;text-align: center;line-height: 20px;color: #fff;font-size: 13px;vertical-align: middle;bottom: 0;}
  .total-price li dd.pic{float: left;    width: 80px;margin-left: 9px;height: 120px;position: relative;}
  .total-price li dt{font-size: 28px;color: #d2d2d2;font-weight: 400;float: left;}
  .total-price li{margin-top: 20px;padding-bottom: 2px;overflow: hidden;}
  .total-price .time .cur span{border-bottom: 3px solid #1e7dd7;}
  .total-price .time .cur{    color: #1e7dd7;font-weight: 700;}
  .total-price .time dd span{  display: inline-block;  padding-bottom: 12px;margin-bottom: -2px;}
  .total-price .time dd{margin-bottom: 2px; display: block;   float: left;width: 33%;text-align: center;cursor: pointer;}
  .total-price dl.time{margin-top: 25px;overflow: hidden; border-bottom: 1px solid #e5e5e5;font-size: 16px;}
  #rank-price .rank-list li dl{overflow: hidden;}
  #rank-price .rank-list ul{margin-top: 25px;}
  #rank-price .rank-list li h3 {font-size: 16px;line-height: 1.6;padding-top: 6px;}
  #rank-price .rank-list dd.statistics span strong{font-size: 30px;font-weight: 400;}
  #rank-price .rank-list dd.statistics span{color: #e6e6e6; display: block;position: absolute;background: rgba(0, 0, 0, 0.71);
  width: 138px;height: 79px;line-height: 85px;top:0;text-align: center;}
  #rank-price .rank-list dd.statistics{position: relative}
  #rank-price .rank-list dd {width: 138px;margin:  0 0 2px 2px;float: left;}
  #rank-price .rank-list dt{width: 280px;float: left}
  #rank-price .rank-list li{width: 439px;height: 245px;overflow: hidden;float: left}
  #rank-price .rank-list dd img{width: 138px;height: 79px;display: block}
  #rank-price .rank-list dt img{width: 280px;height: 160px;}
  #rank-price i.gt{display: inline-block;position: relative;
    zoom: 1;vertical-align: middle;    background: url(../../assets/images/ui.png) -126px -21px no-repeat;
    width: 6px;height: 10px;line-height: 0;font-size: 0;top: -1px;}
  #rank-price .t-head{width: 860px;}
  #rank-price .total-price .t-head{width: 303px;}
  #rank-price .t-head a{float: right;position: relative;padding-top: 4px;top: -25px;}
  #rank-price h4{font-size: 22px;font-weight: 400;line-height: 1;}
  #rank-price .total-price{width: 303px;}
  #rank-price .rank-list{width: 878px;}
  #rank-price{width: 1200px;margin: 60px auto 30px;overflow: hidden;}
</style>
