<template>
  <div id="edit-banner">
    <ul :key="key">
      <li>
        <h4>第一页</h4>
        <input-text
          :labelname="'新闻连接地址：'"
          :evname="'firstLink'"
          @firstLink="firstLink"
        >
        </input-text>
        <upload-img
          :uploadsarr="[{value:'点击上传',filename:'first',id:'banner-upload-1'}]"
          :labelname="'轮播图：'"
          :multiple="false"
          :evname="'firstPic'"
          @firstPic="firstPic"
        >
        </upload-img>
      </li>
      <li>
        <h4>第二页</h4>
        <input-text
          :labelname="'新闻连接地址：'"
          :evname="'secondLink'"
          @secondLink="secondLink"
        >
        </input-text>
        <upload-img
          :uploadsarr="[{value:'点击上传',filename:'second',id:'banner-upload-2'}]"
          :labelname="'轮播图：'"
          :multiple="false"
          :evname="'secondPic'"
          @secondPic="secondPic"
        >
        </upload-img>
      </li>
      <li>
        <h4>第三页</h4>
        <input-text
          :labelname="'新闻连接地址：'"
          :evname="'thirdLink'"
          @thirdLink="thirdLink"
        >
        </input-text>
        <upload-img
          :uploadsarr="[{value:'点击上传',filename:'third',id:'banner-upload-3'}]"
          :labelname="'轮播图：'"
          :multiple="false"
          :evname="'thirdPic'"
          @thirdPic="thirdPic"
        >
        </upload-img>
      </li>
      <li>
        <h4>第四页</h4>
        <input-text
          :labelname="'新闻连接地址：'"
          :evname="'fourthLink'"
          @fourthLink="fourthLink"
        >
        </input-text>
        <upload-img
          :uploadsarr="[{value:'点击上传',filename:'fourth',id:'banner-upload-4'}]"
          :labelname="'轮播图：'"
          :multiple="false"
          :evname="'fourthPic'"
          @fourthPic="fourthPic"
        >
        </upload-img>
      </li>
      <li>
        <h4>第五页</h4>
        <input-text
          :labelname="'新闻连接地址：'"
          :evname="'fifthLink'"
          @fifthLink="fifthLink"
        >
        </input-text>
        <upload-img
          :uploadsarr="[{value:'点击上传',filename:'fifth',id:'banner-upload-5'}]"
          :labelname="'轮播图：'"
          :multiple="false"
          :evname="'fifthPic'"
          @fifthPic="fifthPic"
        >
        </upload-img>
      </li>
    </ul>
    <p class="bannertip" :class="{'err':err}">{{tip}}</p>
    <button class="sendbanner" @click="senddata">提交</button>
  </div>
</template>
<script>
  import inputText from '@/components/form/input_text'
  import uploadImg from '@/components/form/upload'
  import {get,post} from '@/server/'
  export default {
    data(){
      return {
        uploaddata:new FormData(),
        key:new Date().getTime(),
        tip:'',
        err:true,
      }
    },
    methods:{
      firstLink(value){
        this.uploaddata.set('firstlink',value)
      },
      firstPic(formdata){
        this.uploaddata.set('first',formdata.get('first'))
      },
      secondLink(value){
        this.uploaddata.set('secondlink',value)
      },
      secondPic(formdata){
        this.uploaddata.set('second',formdata.get('second'))
      },
      thirdLink(value){
        this.uploaddata.set('thirdlink',value)
      },
      thirdPic(formdata){
        this.uploaddata.set('third',formdata.get('third'))
      },
      fourthLink(value){
        this.uploaddata.set('fourthlink',value)
      },
      fourthPic(formdata){
        this.uploaddata.set('fourth',formdata.get('fourth'))
      },
      fifthLink(value){
        this.uploaddata.set('fifthlink',value)
      },
      fifthPic(formdata){
        this.uploaddata.set('fifth',formdata.get('fifth'))
      },
      senddata(){
        post('/admin/addbanner',this.uploaddata)
          .then(({data})=>{
            if(data.code){
              this.err = true;
              this.tip = data.message;
            }else {
              this.err = false;
              this.tip = data.message;
              this.key = new Date().getTime();
            }
          })
      }
    },
    components:{
      inputText,
      uploadImg,
    }
  }
</script>
<style>

#edit-banner h4{    font-size: 18px;
  line-height: 44px;}
#edit-banner .bannertip{color: #00b542;}
#edit-banner p.err{color: red;}
  #edit-banner .sendbanner{margin: 60px auto;
    display: block;
    line-height: 60px;
    width: 260px;
    border-radius: 10px;
    background: #f9bd02;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;}
</style>
