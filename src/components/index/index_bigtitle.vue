<template>
  <div class="big-title">
    <h4>{{title}}</h4>
    <dl>
      <dd v-for="(item,index) in subtitle">
        <router-link
          :to="item.link"
        >
          {{item.name}}
        </router-link>
      </dd>
    </dl>
    <i></i>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        menu:[]
      }
    },
    props:{
      title:{
        type:String,
        default:'栏目标题'
      },
      subtitle:{
        type:Array,
        default(){
          return [{
            name:'二级标题',
            link:'/'
          }]
        }
      }
    }
  }
</script>
<style>
  .big-title h4{
    font-weight: 400;
    font-size: 28px;
    line-height: 1;
    text-align: center;
    padding-bottom: 15px;
  }
  .big-title a{
    position: relative;}
  .big-title dd{    padding: 0 25px;
    display: inline-block;
    position: relative;
    zoom: 1;
    vertical-align: middle;
    font-size: 16px;
    line-height: 1.1;
    border-left: 1px solid #e5e5e5;
    margin-left: -1px;}
  .big-title dl{    background: #fff;
    display: inline-block;
    position: relative;
    zoom: 1;
    vertical-align: middle;
    z-index: 2;
    overflow: hidden;}
  .big-title i{background: #e5e5e5;
    width: 100%;
    height: 1px;
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 10px}
  .big-title{    width: 1200px;
    margin: 0 auto 19px;
    position: relative;
    text-align: center;}
</style>
