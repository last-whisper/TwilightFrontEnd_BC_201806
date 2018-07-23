<template>
  <div class="samenews">
    <h4>{{title}}</h4>
    <ul v-if="newslist.length">
      <li v-for="(item,index) in newslist" :key="index">
        <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
          {{item.title}}
        </router-link>
      </li>
    </ul>
    <p v-else class="text-center">抱歉，暂时还没有相关新闻</p>
  </div>
</template>
<style>
  .samenews a:hover{color: #08c;}
  .samenews a{color: #666;font-size: 16px;line-height: 1.5em;}
  .samenews li{list-style: outside;font-size: 16px;line-height: 1.5em;margin-top: 8px;}
  .samenews ul{margin-left: 20px;}
  .samenews{    border-top: 1px solid #e5e5e5;margin-top: 15px;padding: 25px 0;}
  .samenews h4{    font-size: 16px;line-height: 1em;padding-bottom: 3px;}
</style>
<script>
  import {post} from '@/server/'
  export default {
    data(){
      return {
        newslist:[]
      }
    },
    props:{
      title:{
        type:String,
        default:'相关文章'
      },
      movieid:{
        type:String,
        default:''
      },
      limit:{
        type:Number,
        default:5
      }
    },
    methods:{
      getdata(){
        if(!this.movieid) return;
        post('/api/getnewsbymovieid',{limit:this.limit,id:this.movieid})
          .then(({data})=>{
            if(data.data.length < 2) return;
            let currentid = this.$route.params.id;
            let index = data.data.findIndex((i)=>i._id == currentid);
            data.data.splice(index,1)
            this.newslist = data.data;
          })
      }
    },
    created(){
      this.getdata()
    },
    watch:{
      movieid(){
        this.getdata()
      }
    }
  }
</script>
