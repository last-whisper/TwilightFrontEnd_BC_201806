<template>
  <div id="newsdetail">
    <news-text v-if="newstype=='text'"></news-text>
    <news-trailer v-if="newstype=='movie'"></news-trailer>
    <news-photos v-if="newstype=='photos'"></news-photos>
  </div>
</template>
<script>
  import {post,get} from '@/server/'
  import moment from 'moment'
  import newsText from '@/components/newsdetail/newsdetail_text'
  import newsTrailer from '@/components/newsdetail/newsdetail_trailer'
  import newsPhotos from '@/components/newsdetail/newsdetail_photos'

  export default {
    data(){
      return {

      }
    },
    props:{
      id:{
        type:String,
        required:true
      },
      newstype:{
        type:String,
        required:true
      }
    },
    components:{
      newsText,
      newsTrailer,
      newsPhotos,

    },
    methods:{
      addreadcount(){
        post('/api/addnewsreadcount',{id:this.$route.params.id})
          .then(()=>{})
      }
    },
    created(){
      this.addreadcount()
    },
    beforeRouteUpdate(to,from,next){
      this.addreadcount();
      next()
    }
  }
</script>
<style>
  #newsdetail .news-side .side{margin: 10px 0;}
  #newsdetail .news-side{width: 300px;}
  #newsdetail .news-left .key-word span{margin: 0 10px;}
  #newsdetail .news-detail .news-left .key-word{font-size: 16px;
    color: #999;
    margin: 40px 0 20px;}
  #newsdetail .news-detail .news-left p{margin-bottom: 30px;}
  #newsdetail .news-detail .news-left{font-size: 18px;line-height: 1.8em;
    width: 615px;padding: 40px 45px 150px 0;border-right: 1px solid #ccc;}
  #newsdetail .news-detail{width: 1000px;overflow: hidden;margin: auto}
</style>
