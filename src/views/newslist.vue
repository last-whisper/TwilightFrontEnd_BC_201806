<template>
  <div class="specialcolumn">
    <div class="submenu hidden">
      <div class="nav float-left">
        <ul>
          <router-link tag="li"
                       :to="{name:'news'}"
          >新闻首页</router-link>
          <router-link tag="li"
                       :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b4'}}">
            时光策划
          </router-link>
          <router-link tag="li"
                       :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b5'}}">
            时光对话
          </router-link>
          <router-link tag="li"
                       :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b6'}}">
            全球拾趣
          </router-link>
        </ul>
      </div>
      <div class="search float-right">

      </div>
    </div>
    <div class="newscon">
      <news-list
        :category="category"
      ></news-list>
    </div>

  </div>
</template>
<script>
  import newsList from '@/components/public/newslist'
  export default {
    data(){
      return {

      }
    },
    props:{
      category:{
        type:String,
        required:true
      }
    },
    components:{
      newsList,

    }
  }
</script>
<style>
  .specialcolumn .newscon{width: 1200px; margin: 30px auto;}
  .specialcolumn .nav li.router-link-active{border-bottom: 3px solid #333;}
  .specialcolumn .nav li{float: left;font-size: 16px;margin-right: 50px;cursor:pointer;
    font-weight: bold;color: #333;line-height: 40px;}
  .specialcolumn .submenu .nav{    margin: 3px 0 0 18px;}
  .specialcolumn .submenu{padding-top: 22px;width: 1200px;margin:0 auto 30px;}
</style>
