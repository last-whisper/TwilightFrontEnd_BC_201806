<template>
  <li class="f-wrap upload-wrap">
    <span class="f-label f-label-upload">{{labelname}}</span>
    <div
      class="upload-apart"
      v-for="(item,index) in uploadsarr"
      :key='index'
      :class="[multiple?'multiple-upload':'single-upload']"
    >
      <!--多图上传模式图片预览渲染-->
      <div v-if="multiple" class="preview-img" v-for="(item,index) in previewarr" :key='index'>
        <img :src="item.src" alt="">
        <span class="remove" @click="multiple_remove(item.name)">删除</span>
      </div>
      <!--单图上传模式图片预览渲染-->
      <div ref="previewimg" v-if="!multiple" class="preview-img">
        <img alt="">
        <span class="remove" @click="single_remove(index,item.filename)">删除</span>
      </div>
      <!--上传表单-->
      <label :for="item.id">{{item.value}}</label>
      <input
        ref="inputs"
        :id="item.id"
        type="file"
        :multiple="multiple"
        :accept="accept"
        @change="appendfiles(item.filename,index)"
      >
    </div>

    <span class="f-tip f-tip-upload" :class="{'pass':!err}">{{tip}}</span>
  </li>
</template>
<script>
  import tools from '@/assets/js/tools.js'
  export default {
    data(){
      return {
        tip:'',
        err:true,
        uploadfiles:new FormData(),//待上传的图片集合
        filesarr:[],//原始files集合，多图上传模式用来生成删除预选图片后新的FormData(FormData.delete无法删除filename数组中的某一张图片)
        previewarr:[],//多图模式本地预览图片集合
      }
    },
    methods:{
      multiple_remove(name){
        //删除预览图
        let index = this.previewarr.findIndex((i)=>i.name === name)
        this.previewarr.splice(index,1);
        //删除filesarr对应的file
        this.filesarr.splice(index,1);
        //使用filesarr重新生成FormData
        this.uploadfiles.delete(this.uploadsarr[0].filename);
        this.filesarr.forEach(i=>{
          this.uploadfiles.append(this.uploadsarr[0].filename,i)
        });
        this.$emit(this.evname,this.uploadfiles)
      },
      single_remove(index,filename){
        this.$refs.previewimg[index].firstElementChild.removeAttribute('src');
        this.uploadfiles.delete(filename);
        this.$emit(this.evname,this.uploadfiles)

      },
      appendfiles(filename,index){
        //多图上传模式判断是否超过定义的图片的数量
        if(this.multiple){
          if(this.$refs.inputs[index].files.length+this.filesarr.length>this.maxfiles){
            //表单选择的数量+已添加的数量大于预定的数量，则提示，并不予添加进上传列队
            this.tip='最多上传'+this.maxfiles+'张图片';
            return
          }else {
            this.tip='';
            [...this.$refs.inputs[index].files].forEach(item=>{
              //过滤掉重选的图片
              if(!this.uploadfiles.getAll(filename).find(i=>i.name===item.name)){
                //将选择的图片放进uploadfiles队列中
                this.uploadfiles.append(filename,item);
                //添加预览图片地址
                this.previewarr.push({src:tools.getObjectURL(item),name:item.name});
                //原始files值
                this.filesarr.push(item)
              }
            });
            this.$emit(this.evname,this.uploadfiles)

          }
        }else{
        //单张图片上传模式
          let file = this.$refs.inputs[index].files[0];
          this.uploadfiles.set(filename,file);
          this.$refs.previewimg[index].firstElementChild.src = tools.getObjectURL(file)
        }
        this.$refs.inputs[index].value='';//清除表单value值防止表单在特殊情况下onchange事件不触发
        this.$emit(this.evname,this.uploadfiles)

      },

    },
    props:{
      uploadsarr:{
        type:Array,
        default(){ return [{value:'点击上传',filename:'avatar',id:'upload'}]}
      },
      labelname:{
        type:String,
        default:'上传图片'
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
        default:'image/*'
      },
      evname:{
        type:String,
        default:'uploadfiles'
      }

    }
  }
</script>
<style>
  .f-tip-upload{display: block;
    clear: both;}
  .preview-img:hover .remove{display: block}
  .preview-img .remove{position: absolute;width:211px;height: 210px;display: block;
    top: 0;left: 0;    background: rgba(109, 109, 109, 0.45);
color: #d4d4d4;font-size: 20px;display: none;cursor: pointer;
  }
  .upload-apart label:hover{background: #f9bd02;color: #fff;}
  .upload-apart label{font-weight: bold; cursor: pointer; display: block;width: 150px;height: 50px;line-height: 50px;
    clear: both;text-align: center;    box-shadow: 0 0 10px #dadada;background: #fff;border-radius: 4px;}
  .preview-img{width: 211px;float: left;overflow:hidden;position: relative;height: 210px;line-height: 210px;
    margin-bottom: 20px;text-align: center;border: 1px solid #ccc;box-sizing: border-box}
  .multiple-upload .preview-img:nth-of-type(4n-2){border-right: 0}
  .multiple-upload .preview-img:nth-of-type(4n-1){border-right: 0}
  .multiple-upload .preview-img:nth-of-type(4n-3){border-right: 0}
  .multiple-upload .preview-img:last-of-type{border-right:1px solid #ccc;}
  .f-label-upload{float: left}
  .upload-apart{display: inline-block;width: 845px;}
  .upload-apart .preview-img img{max-width: 211px;max-height: 210px;display: inline-block}
  .upload-apart input{height: 0; width: 0;padding: 0;opacity: 0;}
  .single-upload{float: left;width: 211px;}
  .single-upload:nth-of-type(4n-3) .preview-img{border-right: 0}
  .single-upload:nth-of-type(4n-2) .preview-img{border-right: 0}
  .single-upload:nth-of-type(4n-1) .preview-img{border-right: 0}
  .single-upload:last-of-type .preview-img{border-right: 1px solid #ccc;}


</style>
