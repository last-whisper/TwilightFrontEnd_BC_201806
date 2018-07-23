<template>
  <div id="movie-trailer">
    <div class="movie-screen">
      <div class="middle" v-if="moviedata.trailer">
        <div class="point">
          <router-link
            tag="span"
            :to="{name:'moviedetail',params:{id:moviedata._id}}"
          >{{moviedata.name}}</router-link>><span>预告片</span>
        </div>
        <div class="video-box">
          <div v-show="index" @click="prevmovie()" class="prev btn"></div>
          <div v-show="index < moviedata.trailer.length-1" @click="nextmovie()" class="next btn"></div>
          <video width="1000" height="560" controls
            :src="port+moviedata.trailer[index]"
          ></video>
        </div>
      </div>
      <p class="tip text-center" v-else>
        没有找到相关预告片
      </p>
    </div>

    <!--视频预览组件-->
    <div class="other-trailer">
      <trailer-preview v-if="moviedata.trailer"
        :trailersrc="moviedata.trailer"
        :movieid="moviedata._id"
        :current="index"
      ></trailer-preview>
      <p class="text-center" v-else>没有找到相关预告片</p>
    </div>
  </div>
</template>
<style>
  #movie-trailer .other-trailer{width: 1000px;padding:50px 0;margin: auto; }
  #movie-trailer .video-box:hover .btn{opacity: .5;}
  #movie-trailer .point span{margin: 5px;cursor: pointer;}
  #movie-trailer .point{margin-bottom: 20px;}
  #movie-trailer .next{right: -50px;
  background: rgba(0, 0, 0, 0.75) url(../assets/images/newspic.png) no-repeat 9px -187px;}
  #movie-trailer .prev{cursor: pointer; left: -50px;background: rgba(0, 0, 0, 0.75) url(../assets/images/newspic.png) no-repeat 9px -232px;}
  #movie-trailer .video-box{position: relative;}
  #movie-trailer .btn{position: absolute;width: 40px;height: 40px;top: 265px;
  transition: all ease-in-out .25s;opacity: .2;cursor: pointer;}
  #movie-trailer .point{color: #999999;font-size: 16px;}
  #movie-trailer .middle{width: 1000px;margin:auto;padding:100px 0 30px;position: relative; }
  #movie-trailer .movie-screen{
    background: linear-gradient(#000, #787878);
  }
</style>
<script>
  import trailerPreview from '@/components/public/trailerpreviewlist'
  import advertisementSection from '@/components/public/advertisement'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        moviedata:{},
        port:this.$store.state.userinfo.port,
      }
    },
    computed:{
      index(){
        return Number(this.$route.query.index)
      },
      movieid(){
        return this.$route.query.movieid
      }
    },
    methods:{
      prevmovie(){
        if(this.index){
          this.$router.push({name:'trailer',query:{movieid:this.movieid,index:this.index-1}})
        }
      },
      nextmovie(){
        if(this.index < this.moviedata.trailer.length - 1){
          this.$router.push({name:'trailer',query:{movieid:this.movieid,index:this.index+1}})
        }
      },
    },
    components:{
      trailerPreview,
      advertisementSection
    },
    created(){
      post('/api/singlemovie',{_id:this.movieid})
        .then(({data})=>{
          this.moviedata = data.data;
        })
    }
  }
</script>

