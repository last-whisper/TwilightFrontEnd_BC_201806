<template>
  <div id="edit_nav">
    <div class="title">
      <span>导航</span><span>路由</span><span>标签</span><span>操作</span>
    </div>
    <div class="edit">
      <ul v-show="menulist.length">
        <li v-for="(item,index) in menulist" :key="index">
          <input type="text" v-model="item.navname">
          <input type="text" v-model="item.link">
          <input type="text" v-model="item.tag">
          <button @click="remove(index)">删除</button>
        </li>

      </ul>
    </div>
    <div class="add">
      <li>
        <input type="text" v-model="newnav.navname">
        <input type="text" v-model="newnav.link">
        <input type="text" v-model="newnav.tag">
        <button @click="add()">新增</button>
      </li>
    </div>
    <div class="control">
      <button @click="senddata()">{{tip}}</button>
    </div>
  </div>
</template>
<script>
  import {get,post} from '@/server/'
  export default {
    data(){
      return {
        tip:'提交',
        menulist:[],
        newnav:{
          navname:'',
          link:'',
          tag:''
        },
      }
    },
    methods:{
      remove(index){
        this.menulist.splice(index,1);
      },
      add(){
        if(this.newnav.navname.trim() && this.newnav.link.trim()){
          this.menulist.push(this.newnav);
          this.newnav = {navname:'',link:'',tag:''};
        }
      },
      senddata(){
        let data = {};
        this.menulist.forEach((item,index)=>{
          data[index] = item;
        })
        data.length=this.menulist.length;
        //将data变成类数组提交到后台
        post('/admin/changemainmenu',data)
          .then(({data})=>{
            this.tip = data.message;
            setTimeout(()=>{this.tip = '提交'},1000)
          })
      }
    },
    created(){
      get('/api/mainmenulist').then(({data})=>{
        this.menulist = data.list;
      })
    },

  }
</script>
<style>
  #edit_nav .control button{margin:60px auto;display: block; line-height: 60px;width: 260px;border-radius: 10px;
    background: #f9bd02;border:none;color: #fff;cursor: pointer;font-size: 18px;}
  #edit_nav .add{
    margin: 10px 0 20px;}
  #edit_nav .add li input[type='text']{    box-shadow: 0 0 10px #d8d8d8;
    width: 20%;
    margin-right: 5%;
    border-radius: 5px;}
  #edit_nav li button{background: #fff;
    border: none;
    line-height: 30px;
    width: 60px;
    padding: 0;
    margin-left: 15px;
    cursor: pointer;
    border-radius: 4px;}
  #edit_nav li button:hover{background: #f9bd02;color: #fff;}
  #edit_nav li input{width: 25%;line-height: 44px;font-size: 14px;padding: 0; }
  #edit_nav input[type='text']{background: none;text-indent: 40px;}
  #edit_nav .edit li:nth-of-type(odd){background: #f5f5f5;}

  #edit_nav .title span{text-indent: 40px;display: inline-block;width: 25%;font-size: 16px;font-weight: bold;}
  #edit_nav .title{line-height: 54px;}
#edit_nav{line-height: 44px;}
</style>
