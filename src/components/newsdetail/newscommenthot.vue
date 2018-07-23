<template>
  <div id="news-comment-hot">
    <div class="con hidden">
      <div class="news-comment float-left">
        <h3>会员评论</h3>
        <div class="comment-input">
          <comment-input @successed="reflashcomment" :model="'news'"></comment-input>
        </div>
        <div class="show-news-comment">
          <short-comments :key="key"></short-comments>
        </div>
      </div>

      <div class="hot-news float-right">
        <hot-news :beforedays="60"></hot-news>
      </div>
    </div>
  </div>
</template>
<script>
  import commentInput from '@/components/public/commentinput'
  import shortComments from '@/components/public/shortcomments'
  import advertisementSection from '@/components/public/advertisement'
  import hotNews from '@/components/public/hot_news'
  export default {
    data(){
      return {
        key:1,

      }
    },
    components:{
      commentInput,
      shortComments,
      advertisementSection,
      hotNews
    },
    methods:{
      reflashcomment(){
        this.key+=1
      }
    }
  }
</script>
<style>
  #news-comment-hot .hot-news{width: 300px;margin-top: 45px;}
  #news-comment-hot .comment-input{padding: 35px 30px;background: #efefef;margin-bottom: 10px;}
  #news-comment-hot h3{font-size: 24px;
    color: #999;
    font-weight: normal;
    line-height: 1.2em;
    height: 45px;}
  #news-comment-hot .news-comment{width: 690px;}
  #news-comment-hot .con{width: 1000px;margin: auto;}
  #news-comment-hot{
    padding-bottom: 30px;
    padding-top: 55px;background: #dddddd;
  }
</style>
