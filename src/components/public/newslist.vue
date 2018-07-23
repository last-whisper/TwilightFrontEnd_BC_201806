<template>
  <div class="newslist-component">
    <dl v-if="newsdata.length">
      <dd  v-for="(item,index) in newsdata">
        <router-link v-if="item.model" :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
          <img v-if="item.img" v-lazy="$store.state.userinfo.port+item.img" :alt="item.title">
          <h3>{{item.title}}</h3>
          <p>{{item.subtitle}}</p>
          <span v-if="timeinfo">{{item.editdate | localtime}}</span>
          <em :class="item.model"></em>
          <i>{{item.tag}}</i>
        </router-link>
      </dd>
    </dl>
    <p class="tip" v-show="loading">
      {{tip}}
      <img :src="loadingsrc">
    </p>
    <button v-if="loadmore" @click="addmore(false)">加载更多</button>
  </div>
</template>
<script>
  import {post} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        newsdata:[],
        loading:true,
        loadingsrc:'../../static/images/twilight.gif',
        tip:'',
      }
    },
    methods:{
      addmore(b){
        this.loading = true;
        let skip = null;
        if(b){
          skip = 0;
        }else {
          skip = this.skip;
        }
        post('/api/getnews',{
          category:this.category,
          limit:this.limit,
          skip
        }).then(({data})=>{
          if(data.code){
            this.tip = data.message;
          }else {
            if(b){//替换数据
              this.newsdata = data.data;
            }else {//追加数据
              this.newsdata = this.newsdata.concat(data.data);
            }
            if(data.data.length % 4 != 0){//添加空数据，让flex-box调整正确的布局
              for(let i=0;i<(4-data.data.length % 4);i++){
                this.newsdata.push({});
              }
            };
            this.loading = false;
          }

        })
      }
    },
    watch:{
      category(newvalue,oldvalue){
        this.addmore(true)
      }
    },
    computed:{
      skip(){
        return this.newsdata.length
      }
    },
    created(){

      this.addmore()
    },
    props:{
      //新闻分类
      category:{
        type:String,
        default:''
      },
      //显示时间信息
      timeinfo:{
        type:Boolean,
        default:true
      },
      //加载更多
      loadmore:{
        type:Boolean,
        default:true
      },
      limit:{
        type:Number,
        default:12
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
  .newslist-component p.tip img{width: 60px;height: 60px;background: none;}
  .newslist-component p.tip{margin: 30px auto;text-align: center;}
  .newslist-component button{width: 160px;cursor: pointer;
    border: none;
    height: 36px;
    font-size: 16px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    border-radius: 20px;
    background: #1e7dd7;
    display: block;
    margin: 0 auto;}
  .newslist-component dd span{
    font-size: 14px;
    color: #888;
    padding-bottom: 6px;
    display: block;
  }

  .newslist-component dd p{padding-bottom: 3px;color: #888;font-size: 14px;overflow: hidden;
    text-overflow: ellipsis;white-space: nowrap;}
  .newslist-component dd h3{font-size: 16px;font-weight: bold;
    padding-bottom: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .newslist-component dd i{position: absolute;top:3px;left: 3px;
    background: red;color: #fff;line-height: 22px;font-style: normal;padding: 0 10px;}
  .newslist-component dd em{opacity: .7; top:110px;left:10px; position: absolute;width: 40px;height: 40px;}
  .newslist-component dd em.photos{top:126px;background: url(../../assets/images/newspic.png) 0 -159px no-repeat;height: 24px;}
  .newslist-component dd em.movie{background: url(../../assets/images/ui.png) 0px -47px no-repeat;}
  .newslist-component dl{display: flex;justify-content: space-between;align-content: left;
    flex-wrap: wrap;}
  .newslist-component dd{width: 285px;
    margin-bottom: 20px;
  }
  .newslist-component dd a{display: block;position: relative;}
  .newslist-component dd img{width: 285px;height: 160px;
    margin-bottom: 14px;}
  .newslist-component dd:hover em{opacity: 1;}
</style>
