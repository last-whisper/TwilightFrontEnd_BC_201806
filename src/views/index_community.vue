<template>
  <div id="community">
    <div class="hotest-comment" v-if="commentdata.length">
      <img width="1903" height="560" :src="port+commentdata[0].ascription.banner">
      <div class="comment">
        <div class="comment-con hidden">
          <div class="userinfo">
            <router-link :to="{name:'user',params:{id:commentdata[0].user._id}}">
              <img width="80" height="80"
                   :alt="commentdata[0].user.nickname"
                   :src="port+commentdata[0].user.img"
              >
            </router-link>
          </div>
          <div class="comment-detail">
            <h2>{{commentdata[0].user.nickname}} 评论 《{{commentdata[0].ascription.name}}》</h2>
            <p><i class="quete"></i>{{commentdata[0].comment}}</p>
            <div class="float-right count">
              这条长影片共获得<em>{{commentdata[0].ups}}个赞</em>
            </div>
          </div>
          <div class="movie-pic">
            <router-link :to="{name:'moviedetail',params:{id:commentdata[0].ascription._id}}">
              <img width="80" height="105"
                   :alt="commentdata[0].ascription.name"
                   :src="port+commentdata[0].ascription.vertical"
              >
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="i_comcont">
      <div class="main float-left">
        <h2>热门影评</h2>
        <div class="ad">
          <img src="../assets/images/commentcode.jpg" >
        </div>
        <ul v-if="commentdata.length" class="list">
          <li v-for="(item,index) in commentdata" v-if="index>0" :key="index">
            <dl>
              <dt>
                <router-link :to="{name:'user',params:{id:item.user._id}}">
                  <img width="64" height="64" :src="port+item.user.img">
                </router-link>
                <div class="info">
                  <div class="title"><i>{{item.user.nickname}}</i> 评论 <span>《{{item.ascription.name}}》</span></div>
                  <p>这条评论获得 <i><strong>{{item.ups}}</strong>个赞</i></p>
                  <div class="comment"><i class="quete"></i>{{item.comment}}</div>
                </div>
              </dt>
              <dd class="float-right">
                <router-link :to="{name:'moviedetail',params:{id:item.ascription._id}}">
                  <img width="98" height="130" :src="port+item.ascription.vertical">
                  <p class="score">{{item.ascription.score}}</p>
                </router-link>
              </dd>
            </dl>
          </li>
        </ul>
        <pages-info :totalpages="totalpages" @changepage="pagesgo"></pages-info>
      </div>
      <div class="side float-right">
        <!--广告位-->
        <div class="advertisement">
          <advertisement-section
            :shape="false"
            :position="'detail_second'"
          >
          </advertisement-section>
        </div>

        <!--热门会员-->
        <div class="vip">
          <h2>热门会员</h2>
          <ul>
            <li v-for="(item,index) in userdata" :key="index">
              <router-link :to="{name:'user',params:{id:item._id}}">
                <img width="50" height="50" :src="port+item.img">
              </router-link>

              <div class="userinfo">
                <p class="name">{{item.nickname}}</p>
                <p class="like">
                  兴趣：<span :key="j" v-for="(i,j) in item.tags">{{i.kind}}</span>
                </p>
                <p class="exp">积分：{{item.exp}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!--网友热评电影-->
        <div class="hot-comment-movie">
          <h2>网友热评</h2>
          <ul v-if="hotmovie.length">
            <li v-for="(item,index) in hotmovie" :key="index">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                <img width="62" height="85" :src="port+item.vertical" />
                <span>{{item.name}}</span>
              </router-link>
              <i>{{item.commentnum}}条</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<style>
  .i_comcont .hot-comment-movie{
    margin-top: 20px;}
  .i_comcont .hot-comment-movie li{line-height: 85px;font-weight: bold;padding-bottom: 20px;
    border-bottom: dotted 1px #e6e6e6;margin-top: -1px;}
  .i_comcont .hot-comment-movie i{float: right;color: #679c21;
    }
  .i_comcont .hot-comment-movie span{margin: 0 20px;}
  .i_comcont .side .vip p.exp{color:#679c21; }
  .i_comcont .side .vip p.like{color: #ff6a11;font-weight: bold;}
  .i_comcont .side .vip p span{
     margin-right: 10px;}
  .i_comcont .side .vip p{.i_comcont .side .vip p
    margin-bottom: 6px;}
  .i_comcont .side .vip .name{color: #08c;
    }
  .i_comcont .side .vip li img{position: absolute;top:10px;left: 0;}
  .i_comcont .side .vip li{margin-top: -1px;
    position: relative;border-bottom: 1px dotted #e6e6e6;padding: 10px 0 10px 65px;}
  .i_comcont .side h2{font-size: 18px;line-height: 40px;
    margin-bottom: 10px;}
  .i_comcont .side .advertisement{margin-bottom: 20px;}
  .i_comcont .side{width: 300px;padding-left: 20px;border-left:1px solid #ccc; }
  .i_comcont .main li .score{width: 34px;background: #679c21;color: #fff;
    font-weight: bold;text-align: center;    margin-top: -21px;
    position: relative;
    left: 64px;}
  .i_comcont .main li dt img{border-radius: 6px;}
  .i_comcont .main li .info .comment{font-size: 16px;line-height: 1.7em;text-align: justify;
    word-break: break-all;color: #666;
    word-wrap: break-word;}
  #community i.quete{    background: url(../assets/images/com_icon.png) no-repeat -210px 0px;
    width: 34px;
    height: 28px;
    display: inline-block;
    position: relative;
    zoom: 1;
    overflow: hidden;
    vertical-align: middle;
    margin-right: 20px;}
  .i_comcont .main .list li{    position: relative;overflow: hidden;
    border-top: 1px solid #e1e1e1;
    margin-top: -1px;
    padding: 35px 0;}
  .i_comcont .main dt{width: 485px;float: left;}
  .i_comcont .main li .info{width: 400px;float: right;}
  .i_comcont .main li .title{font-size: 22px;line-height: 1.2em;}
  .i_comcont .main li .info p strong{font-size: 16px;}
  .i_comcont .main li .info p i{color:#faa1a7 }
  .i_comcont .main li .info p{line-height: 40px;color: #a8a8a8;}
  .i_comcont .main li .title span{color: #08c;}
  .i_comcont .main li .title i{
    color: #F44336;
    margin-right: 12px;
    font-size: 18px;}
  .i_comcont .main{width: 620px;}
  .i_comcont .main .ad{margin: 20px auto;}
  .i_comcont .main h2{font-size: 18px;line-height: 40px;border-bottom: 3px solid #000;}
  .i_comcont{width: 960px;margin: -35px auto 60px;box-shadow: 0 0 15px #a3a3a3;background: #fff;
    position: relative;z-index: 3;padding: 40px 20px 150px;}
  .hotest-comment .comment-con .userinfo img{border-radius: 10px;}
  .hotest-comment .comment-detail .count em{color: #faa1a7;margin-left: 4px;font-size: 16px;}
  .hotest-comment .comment-con .comment-detail .count{color: #aaaaaa;margin-top: 20px}
  .hotest-comment .comment-con .comment-detail p{color: #606060;
    margin-top: 12px;font-size: 16px;line-height: 1.6em;text-align: justify;}
  .hotest-comment .comment-con .comment-detail h2{font-size: 34px;font-weight: normal;line-height: 1.4em;
    margin-right: -120px;}
  .hotest-comment .comment-con .movie-pic{position: absolute;bottom: 20px;right: 30px;}
  .hotest-comment .comment-con .userinfo{position: absolute;top:25px;left: 25px;}
  .hotest-comment .comment .comment-con{width: 380px;padding: 25px 160px 50px 130px;background: #fff;
    position: relative;
  }
  .hotest-comment .comment{width: 1000px;position: absolute;left: 50%;margin-left: -500px;
  bottom: 35px;}
  .hotest-comment{position: relative;}
</style>
<script>
  import advertisementSection from '@/components/public/advertisement'
  import pagesInfo from '@/components/public/pagesinfo'
  import {post,get} from '@/server/'
  export default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        commentdata:[],//影评数据
        totalpages:0,//影评页数
        userdata:[],//会员排行榜数据
        hotmovie:[],//热评电影
      }
    },
    methods:{
      pagesgo(index){
        post('/api/showmoviecomment',{page:index}).then(({data})=>{
          this.commentdata = data.data;
          this.totalpages = data.totalpages;
          window.scrollTo(0,0)
        })
      }
    },
    created(){
      post('/api/showmoviecomment').then(({data})=>{
        this.commentdata = data.data;
        this.totalpages = data.totalpages;
      });
      get('/api/usersrank').then(({data})=>{
        this.userdata = data.data
      });
      get('/api/moviecommentrank').then(({data})=>{
        this.hotmovie = data.data
      });
    },
    components:{
      pagesInfo,
      advertisementSection
    }
  }
</script>
