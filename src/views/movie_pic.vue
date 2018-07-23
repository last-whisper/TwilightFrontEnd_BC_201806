<template>
  <div id="movie-pic">
    <div class="movie-screen">
      <div class="middle" v-if="moviedata.src">
        <div class="point">
          <router-link
            tag="span"
            :to="{name:'moviedetail',params:{id:moviedata._id}}"
          >{{moviedata.name}}</router-link>><span>图片</span>
        </div>
        <div class="video-box" ref="box">
          <div v-show="index" @click="prevmovie()" class="prev btn" ref="prev"></div>
          <div v-show="index < moviedata.src.length-1" @click="nextmovie()" ref="next" class="next btn"></div>
          <img :src="port+moviedata.src[index]" :alt="moviedata.name"/>
        </div>
      </div>
      <p class="tip text-center" v-else>
        没有找到相关图片
      </p>
    </div>

    <!--图片列表-->
    <div class="other-pic">
      <pic-preview
        v-if="moviedata.src"
        :src="moviedata.src"
        :movieid="moviedata._id"
        :current="index"
        :num="9"
      ></pic-preview>
      <p class="text-center" v-else>没有相关图</p>
    </div>
  </div>
</template>
<style>
  #movie-pic .other-pic{width: 1000px;padding:50px 0;margin: auto; }
  #movie-pic .video-box:hover .btn{opacity: .7;}
  #movie-pic .point span{margin: 5px;cursor: pointer;}
  #movie-pic .point{margin-bottom: 20px;}
  #movie-pic .next{right: -50px;background: rgba(0, 0, 0, 0.75) url(../assets/images/newspic.png) no-repeat 9px -187px;}
  #movie-pic .prev{cursor: pointer; left: -50px;background: rgba(0, 0, 0, 0.75) url(../assets/images/newspic.png) no-repeat 9px -232px;}
  #movie-pic .video-box{position: relative;text-align: center;}
  #movie-pic .btn{position: absolute;width: 40px;height: 40px;bottom:40px;
  transition: all ease-in-out .25s;opacity: .4;cursor: pointer;}
  #movie-pic .point{color: #999999;font-size: 16px;}
  #movie-pic .middle{width: 1000px;margin:auto;padding:100px 0 30px;position: relative; }
  #movie-pic .movie-screen{background:#000;}
</style>
<script>
  import advertisementSection from '@/components/public/advertisement'
  import picPreview from '@/components/public/picpreviewlist'
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
          this.$router.push({name:'moviepic',query:{movieid:this.movieid,index:this.index-1}})
        }
      },
      nextmovie(){
        if(this.index < this.moviedata.src.length - 1){
          this.$router.push({name:'moviepic',query:{movieid:this.movieid,index:this.index+1}})
        }
      }
    },
    components:{
      advertisementSection,
      picPreview
    },
    created(){
      post('/api/singlemovie',{_id:this.movieid})
        .then(({data})=>{
          this.moviedata = data.data;
        })
    }
  }
</script>

