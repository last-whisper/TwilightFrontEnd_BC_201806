<template>
  <div id="admin">
    <div class="banner">
      <p>欢迎您</p>
      进入时光网后台管理系统，您可以在这里对整站的导航、新闻、影片、排行榜、广告等内容进行新增、修改、删除操作。
    </div>
    <div class="con">

      <!--侧边栏-->
      <div class="sidebar">
        <ul>

          <router-link
            v-for="(item,index) in menulist"
            :key="index"
            :to="{name:item.name}"
            tag="li"
          >
            {{item.func}}
          </router-link>
        </ul>
      </div>

      <!--操作区-->
      <div class="controlside">

        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return {
        //组件信息
        menulist:[

          {
            name:'addnav',
            func:'编辑导航'
          },
          {
            name:'addbanner',
            func:'编辑轮播图'
          },
          {
            name:'addmovie',
            func:'编辑影片'
          },
          {
            name:'addnews',
            func:'编辑新闻'
          },
          {
            name:'addrank',
            func:'编辑排行榜'
          },
          {
            name:'addad',
            func:'编辑广告位'
          },
        ],


      }
    },
    // methods:{
    //   tab(index,i){
    //     this.currentitle=index;
    //     this.currentlist=i;
    //   }
    // },
    // components:{
    //   editNews,
    //   editMovie,
    // }

  }
</script>
<style>

  #admin .sidebar  li{cursor: pointer;border-radius: 5px;}
  #admin .sidebar li:hover{color: #1f7dd7;}
  #admin .sidebar li.router-link-exact-active{background: #ededed;}
  #admin .sidebar div{background:  #344766;color:#fff;font-size:20px;text-align: center; }
  #admin .sidebar{width: 230px;line-height: 50px;text-align: center;float: left}
  #admin .con{width: 1280px;margin: 0px auto;overflow: hidden;}
  #admin .banner{
    background: #ededed;

    font-size: 20px;
    text-align: center;

    width: 1080px;
    margin: 100px auto 50px;
    color: #272727;
    border-radius: 20px;
    font-weight: normal;

    height: 250px;
    padding: 50px 100px;
    text-align: left;}
  #admin .banner p{font-size: 60px;line-height: 125px;
    }
  #admin{width: 1280px;margin: auto;}
  #admin .controlside{width: 960px;
    border-left: 1px solid #f2f2f2;min-height: 1000px;float: right;padding-left: 50px;}
  .markdown-side .editside{width: 845px;}
  .markdown-side{padding: 20px 10px;
    overflow: hidden;
  }
  #edit_movie{
    padding-bottom:300px; }
  #edit-movie-senddata{    width: 340px;
    height: 65px;
    background: #ededed;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    margin: 10px auto;
    display: block;}
  #edit-movie-senddata:hover{background: #f9bd02;color: #fff;cursor: pointer;}
</style>



