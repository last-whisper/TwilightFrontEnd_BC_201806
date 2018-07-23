<template>
  <div class="side-movie-recommend">
    <div class="title"><h4>同类影片</h4></div>
    <ul>
      <li
        v-if="recommendmovie.length"
        v-for="(item,index) in recommendmovie"
        :key="index"
        :class="{odd:index % 2 === 0}"
      >
        <router-link
          :to="{name:'moviedetail',params:{id:item._id}}">
          <img :src="port+item.vertical" width="142" height="213"  :alt="item.name">
          <p class="ellipsis">{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import {post} from '@/server/'
  export default {
    data(){
      return {
        recommendmovie:[],
        port:this.$store.state.userinfo.port,
      }
    },
    props:{
      searchdata:{
        type:Object,
        default(){
          return {}
        }
      },
      limit:{
        type:Number,
        default:4
      },

    },
    methods:{
      getdata() {
        if (!this.searchdata.currentid) return;
        post('/api/samemovietag', {
          tag: this.searchdata.tag,
          limit:this.limit,
          currentid: this.searchdata.currentid
        }).then(({data})=>{
          this.recommendmovie = data.data;
        })
      }
    },
    created(){
      this.getdata()
    },
    watch:{
      searchdata(){
        this.getdata()
      }
    }
  }
</script>
<style>
  .side-movie-recommend li.odd{margin-right: 10px;}
  .side-movie-recommend li p{width: 130px;}
  .side-movie-recommend ul{overflow: hidden;margin: 20px 0;}
  .side-movie-recommend li{margin-bottom:20px;height:245px;float: left;text-align: center;line-height: 30px;}
  .side-movie-recommend .title{margin-top: 40px;line-height: 40px;border-bottom: 1px solid #ccc;font-size: 16px;}
</style>
