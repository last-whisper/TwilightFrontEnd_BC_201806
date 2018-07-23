<template>
  <li class="f-wrap upload-wrap">
    <span class="f-label f-label-upload">{{labelname}}</span>
    <!--视频渲染图-->
    <div class="previewvideo">
      <div ref="previews" class="upload-part" v-for="(item,index) in previewarr" :key="index">
        <img  alt="">
        <span class="remove" >
          <i>大小：{{item.size}}mb</i>
          <button @click="remove(item.name)">删除</button>
        </span>
        <video class="none" ref="videos" :src="item.src" @loadeddata="captureImage(index)">
          <!--mp4需采用H264的编码格式方能播放-->
        </video>
      </div>
      <label for="upload-video">上传预告片</label>
      <input
        ref="input"
        id="upload-video"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="appendfiles()"
      >
    </div>



  </li>
</template>
<script>
  import tools from '@/assets/js/tools.js'
  export default {
    data(){
      return {
        tip:'',
        err:true,
        uploadvideos:new FormData(),
        previewarr:[],
        filesarr:[],
      }
    },
    methods:{
      appendfiles(){
        if(this.filesarr.length+this.$refs.input.files.length>this.maxfiles && this.multiple){
          //表单选择的数量+已添加的数量大于预定的数量，则提示，并不予添加进上传列队
          this.tip='最多上传'+this.maxfiles+'个预告视频';
          return
        }
        let files = this.$refs.input.files;
        [...files].forEach(i=>{
          //过滤重复选择的视频
          if(!this.uploadvideos.getAll(this.filename).find(j=>j.name===i.name)){
            this.filesarr.push(i)
            this.uploadvideos.append(this.filename,i);
            this.previewarr.push({
              src:tools.getObjectURL(i),
              name:i.name,
              size:Math.ceil(parseFloat(i.size/1000000))
            })
          }
        })

        this.$emit(this.evname,this.uploadvideos)
      },
      remove(name){

        let index = this.previewarr.findIndex((i)=>i.name === name)
        this.previewarr.splice(index,1);
        //删除filesarr对应的file
        this.filesarr.splice(index,1);
        //使用filesarr重新生成FormData
        this.uploadvideos.delete(this.filename);
        this.filesarr.forEach(i=>{
          this.uploadvideos.append(this.filename,i)
        });

        this.$emit(this.evname,this.uploadvideos)
      },
      captureImage(index){
        let el = this.$refs.videos[index];
        let src = tools.captureImage(el);
        this.$refs.previews[index].firstElementChild.src=src;
      },
    },
    props:{
      filename:{
        type:String,
        default:'videos'
      },
      labelname:{
        type:String,
        default:'上传视频'
      },
      multiple:{
        type:Boolean,
        default:true
      },
      maxfiles:{
        type:Number,
        default:100
      },
      accept:{
        type:String,
        default:'video/*'
      },
      evname:{
        type:String,
        default:'uploadvideofiles'
      }
    }
  }
</script>
<style>
  .previewvideo label{font-weight: bold;
    cursor: pointer;
    display: block;
    width: 150px;
    height: 50px;
    line-height: 50px;
    clear: both;
    text-align: center;
    -webkit-box-shadow: 0 0 10px #dadada;
    box-shadow: 0 0 10px #dadada;
    background: #fff;
    border-radius: 4px;
    clear: both;
  }
  .previewvideo label:hover{background: #f9bd02;color: #fff;}
  .previewvideo{display:inline-block;width: 845px;}
.previewvideo .upload-part{width: 200px;height: 150px;float: left;line-height: 150px;
position: relative;
  margin-bottom: 20px;
  margin-right: 10px;background: #000;}
  .previewvideo .upload-part span button{ cursor: pointer;   background: #fff;
    display: block;
    width: 115px;
    line-height: 40px;
    border-radius: 4px;
    border: none;
    margin: auto;
    position: relative;
    top: 65px;}
  .previewvideo .upload-part span button:hover{
    background: #f9bd02;color: #fff;
  }
  .previewvideo .upload-part span i{font-size: 16px;position: relative;top:45px;font-style: normal;}
  .previewvideo .upload-part span{line-height: 0px; position: absolute;width:200px;height: 150px;display: block;
    display: none;text-align: center;
    top: 0;left: 0;    background: rgba(109, 109, 109, 0.45);
    color: #d4d4d4;font-size: 20px;}
.previewvideo img{max-width: 200px;max-height: 150px;}
  .previewvideo .upload-part:hover span{display: block;}
</style>
