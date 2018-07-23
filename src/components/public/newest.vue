<template>
  <div class="float-newest">
    <h4>最新资讯</h4>
    <ul v-if="newsdata.length">
      <li class="first" v-if="index === 0" v-for="(item,index) in newsdata" :key="index">
        <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
          <img width="260" :src="port+item.img" height="150" :alt="item.title">
        </router-link>
        <div class="title"><a>{{item.title}}</a></div>
        <div class="summary">
          <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
            {{item.newscon | filterhtml}}
          </router-link>
        </div>
      </li>
      <li class="item"
          v-if="index != 0" v-for="(item,index) in newsdata" :key="index"
      ><router-link
        :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}"
        class="ellipsis"
      >{{item.title}}</router-link>
      </li>


    </ul>
    <p v-else class="text-center tip">抱歉啦~本片还没有相关新闻</p>
    <a v-if="newsdata.length > shownum" class="viewmore">更多新闻资讯</a>
  </div>
</template>
<script>
  import {post} from '@/server/'
  import {mapState} from 'vuex'
  export default {
    data(){
      return {
        newsdata:[],
        shownum:4
      }
    },
    computed:{
      ...mapState({
        port:state=>state.userinfo.port,
      })
    },
    methods:{
      getdata(id){
        post('/api/getnewsbymovieid',{id:id,limit:this.limit}).then(({data})=>{
          this.newsdata = data.data;
        })
      }
    },
    props:{
      limit:{
        type:Number,
        default:5
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
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,50)+'...'
      }
    }
  }
</script>
<style>
  .float-newest a.viewmore{padding: 0 20px;display: block;text-align: right;font-style: italic;}
  .float-newest p.tip{line-height: 100px;color: #999999;}
  .float-newest li.item a:hover{text-decoration: underline;}
  .float-newest li.item a{color: #08c;line-height: 24px;font-size: 12px;}
  .float-newest li.first .summary{    font-size: 12px;color: #666;margin-top: 5px;line-height: 1.6em;}
  .float-newest li.first .title{    padding: 5px 10px;
    box-sizing: border-box;position: absolute;background: rgba(255, 255, 255, 0.76);height: 45px;
  font-size: 14px;font-weight: bold; line-height: 1.4em;overflow: hidden;top:85px;left: 0;width: 100%;}
  .float-newest li.first{position: relative;margin-bottom: 5px;padding-bottom: 6px;border-bottom: 1px dotted #dfdfdf;
  }
  .float-newest ul{padding: 20px;}
  .float-newest h4{    background: #999;
    width: 110px;font-size: 16px;
    height: 32px;color: #fff;
    line-height: 32px;
    text-align: center;}
  .float-newest{background: #fff;padding-bottom: 20px;}
</style>
