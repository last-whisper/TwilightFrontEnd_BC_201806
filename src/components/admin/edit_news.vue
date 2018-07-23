<template>
  <div id="edit_news">
    <!--影片-->
    <input-select
      :options="newscategory"
      :labelname="'新闻栏目：'"
      @select="saveNewsCategory"
    ></input-select>
    <input-select
      :options="newsmodel"
      :labelname="'新闻模板：'"
      :evname="'newsmodel'"
      @newsmodel="saveNewsModel"
    ></input-select>
    <input-text
      :evname="'tag'"
      :labelname="'标签：'"
      :checkout="false"
      @tag="saveTag"
    ></input-text>
    <!--关联影片-->
    <input-text-search
      :labelname="'所属影片：'"
      :range="'movie'"
      :limit="6"
      @inputsearch="saveMovie"
    >
    </input-text-search>
    <input-text
      :evname="'title'"
      :labelname="'主标题：'"
      @title="saveTitle"
    ></input-text>
    <input-text
      :evname="'subtitle'"
      :labelname="'副标题：'"
      @subtitle="saveSubTitle"
    ></input-text>
    <upload-img
      :multiple="false"
      :evname="'previewimg'"
      :labelname="'缩略图'"
      :uploadsarr="[{value:'点击上传',filename:'previewimg',id:'upload-new-previewimg'}]"
      @previewimg="savePreviewimg"
    >
    </upload-img>
    <input-text
      :evname="'author'"
      :labelname="'来源：'"
      @author="saveAuthor"
      :checkout="false"
    ></input-text>
    <!--markdown-->
    <li class="markdown-side">
      <span>正文：</span>
      <div class="float-right editside">
        <mavon-editor @change="saveNewsCon"  @save="saveNewsCon"/>
      </div>
    </li>
    <upload-img
      v-show="currentnewsmodel === 'photos'"
      :maxfiles="9"
      :evname="'photolist'"
      @photolist="savePhotoList"
    >
    </upload-img>
    <!--视频上传-->
    <upload-video
      v-show="currentnewsmodel === 'movie'"
      :accept="'video/mp4'"
      @uploadvideofiles="saveVideoList"
      :multiple="false"
    >
    </upload-video>
    <input-text
      :evname="'keyword'"
      :labelname="'关键字：'"
      @keyword="saveKeyWord"
    ></input-text>
    <button id="edit-news-senddata" @click="senddata()">{{tip}}</button>

  </div>
</template>
<script>
  import tools from '@/assets/js/tools.js'
  import {get,post} from '@/server/'
  import inputSelect from '@/components/form/select'
  import inputText from '@/components/form/input_text'
  import inputTextSearch from '@/components/form/input_text_search'
  import selectDate from '@/components/form/date'
  import uploadImg from '@/components/form/upload'
  import uploadVideo from '@/components/form/upload_video'
  export default {
    data(){
      return{
        tip:'确定',
        newscategory:[],//新闻栏目数据
        data:new FormData(),
        newsmodel:[],//新闻模板
        currentnewsmodel:'',//当前选择的新闻模板

        //检查输入信息
        check:{
          title:false,
          subtitle:false,
          movie:false,
          newscon:false,
          keyword:false,
        },
      }
    },
    methods:{
      saveNewsCategory(_id){
        this.data.set('currentCategory',_id);
      },
      saveNewsModel(_id){
        this.currentnewsmodel = _id;
        this.data.set('model',_id);
      },
      saveTag(value){
        this.data.set('tag',value.trim());
      },
      saveTitle(value){
        value ? this.check.title = true : this.check.title = false;
        this.data.set('title',value.trim());
      },
      saveSubTitle(value){
        value ? this.check.subtitle = true : this.check.subtitle = false;
        this.data.set('subtitle',value.trim());
      },
      saveMovie(_id){
        _id ? this.check.movie = true : this.check.movie = false;
        this.data.set('movie',_id);
      },
      saveAuthor(value){
        if(value.trim()){
          this.data.set('author',value.trim());
        }else {
          this.data.set('author','时光网');
        }
      },
      saveNewsCon(value,render){
        render ? this.check.newscon = true : this.check.newscon = false;
        this.data.set('newscon',render);
      },
      //缩略图
      savePreviewimg(formdata){
        this.data.delete('previewimg');
        this.data.set('previewimg',formdata.get('previewimg'))
      },
      //图集
      savePhotoList(formdata){
        this.data.delete('avatar');
        formdata.getAll('avatar').forEach(item=>{
          this.data.append('avatar',item)
        })
      },
      //预告片集
      saveVideoList(formdata){
        this.data.delete('videos');
        formdata.getAll('videos').forEach(item=>{
          this.data.append('videos',item)
        })
      },
      saveKeyWord(value){
        value ? this.check.keyword = true : this.check.keyword = false;
        this.data.set('keyword',value.trim());
      },
      senddata(){
        //本地检查数据信息
        let send = true;
        for(let attr in this.check){
          if(!this.check[attr]){
            this.tip = '请检查输入信息，再试一次';
            send = false
            return
          }
        }
        //过滤与选择模板无关的数据
        if(this.currentnewsmodel === 'text'){
          this.data.delete('video');//删除视频
          this.data.delete('avatar');//删除图集
        }else if(this.currentnewsmodel === 'photos'){
          this.data.delete('video');//删除视频
        }else {
          this.data.delete('avatar');//删除图集
        }
        //发送请求
        if(send){
          this.tip='上传中，请稍等...'
          post('/admin/addnews',this.data).then(r=>{
            this.tip = r.message;
            if(!r.code){
              window.location.reload()
            }
          })
        }
      },

    },
    created(){

      get('/admin/newslist').then(({data})=>{
        data.forEach(i=>{
          this.newscategory.push({kind:i.category,_id:i._id})
        })
        this.currentnewsmodel = data[0]._id;
        this.newsmodel = [{
          kind:'文章',
          _id:'text'
        },
          {
            kind:'图集',
            _id:'photos'
          },
          {
            kind:'视频',
            _id:'movie'
          }]
      })
    },
    components:{
      inputSelect,
      inputText,
      inputTextSearch,
      selectDate,
      uploadImg,
      uploadVideo,
    },
  }
</script>
<style>
  #edit-news-senddata{
    display: ;
    width: 340px;
    height: 65px;
    background: #ededed;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    margin: 10px auto;
    display: block;
  }
  #edit-news-senddata:hover{
    background: #f9bd02;color: #fff;cursor: pointer;
  }
</style>
