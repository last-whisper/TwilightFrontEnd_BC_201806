<template>
  <div id="edit_movie">
    <!--影片-->
    <input-select
      :options="moviesCategory"
      :labelname="'影片分类：'"
      @select="saveMoviesCategory"
    ></input-select>
    <input-text
      :evname="'moviename'"
      :labelname="'影片中文名：'"
      @moviename="saveMovieName"
    ></input-text>
    <input-text
      :evname="'movieenglishname'"
      :checkout="false"
      :labelname="'影片英文名：'"
      @movieenglishname="saveMovieEnglishName"
    ></input-text>
    <input-text
      :evname="'moviealias'"
      :checkout="false"
      :labelname="'更多片名：'"
      @moviealias="saveMovieAlias"
    ></input-text>
    <input-text-search
      :labelname="'导演：'"
      :range="'director'"
      :limit="6"
      @inputsearch="saveDirector"
    >
    </input-text-search>
    <input-text
      :evname="'production'"
      :labelname="'制作公司：'"
      @production="saveProduction"
    ></input-text>
    <input-text
      :evname="'price'"
      :labelname="'票价：'"
      @price="savePrice"
    ></input-text>
    <input-text
      :evname="'totalprice'"
      :checkout="false"
      :labelname="'总票房：'"
      @totalprice="saveTotalPrice"
    ></input-text>
    <input-text
      :evname="'score'"
      :checkout="false"
      :labelname="'评分：'"
      @score="saveScore"
    ></input-text>
    <select-date
      :labelname="'上映时间'"
      @choosedate="saveDate"
    >
    </select-date>
    <input-text
      :evname="'min'"
      :labelname="'时长：'"
      @min="saveMin"
    ></input-text>
    <!--markdown-->
    <li class="markdown-side">
      <span>剧情：</span>
      <div class="float-right editside">
        <mavon-editor @change="saveNewsCon"  @save="saveNewsCon"/>
      </div>
    </li>
    <!--多图上传-->
    <upload-img
      :maxfiles="9"
      :evname="'photolist'"
      @photolist="savePhotoList"
    >
    </upload-img>
    <!--单图上传-->
    <upload-img
      :uploadsarr="uploadsarr"
      :multiple="false"
      @uploadfiles="saveFuncPhoto"
    >
    </upload-img>
    <!--视频上传-->
    <upload-video
      :accept="'video/mp4'"
      @uploadvideofiles="saveVideoList"
    ></upload-video>

    <button id="edit-movie-senddata" @click="senddata()">{{tip}}</button>


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
      return {
        tip:'确定',
        moviesCategory:[],//电影分类数据
        data:new FormData(),
        uploadsarr:[
          {value:'竖封面图',filename:'vertical',id:'upload-1'},
          {value:'横封面图',filename:'horizontal',id:'upload-2'},
          {value:'banner图',filename:'banner',id:'upload-3'}
        ],
        //检查输入的信息
        check:{
          moviename:false,
          director:false,
          production:false,
          price:false,
          minute:false,
          newscon:false,
          funcphoto:false,
        }
      }
    },
    methods:{
      saveMoviesCategory(_id){
        this.data.set('currentCategory',_id);
      },
      saveMovieName(value){
        value ? this.check.moviename = true : this.check.moviename = false;
        this.data.set('name',value.trim());
      },
      saveMovieEnglishName(value){
        this.data.set('englishname',value.trim());
      },
      saveMovieAlias(value){
        this.data.set('alias',value.trim());
      },
      saveDirector(value){
        //导演_id
        value ? this.check.director = true : this.check.director = false;
        if(typeof value === 'string'){
          this.data.set('director',value.trim());
        }else if(typeof value === 'object'){
          //新增导演
          this.data.set('transliteration',value.transliteration);
          this.data.set('directorname',value.name);
          this.data.set('directorsrc',value.file)
        }
      },
      saveProduction(value){
        value ? this.check.production = true : this.check.production = false;
        this.data.set('production',value.trim());
      },
      savePrice(value){
        value ? this.check.price = true : this.check.price = false;
        this.data.set('price',value.trim());
      },
      saveTotalPrice(value){
        this.data.set('totalprice',value.trim());
      },
      saveScore(value){
        this.data.set('score',value.trim());
      },
      saveDate(date){
        this.data.set('showtime',date);
      },
      saveMin(value){
        value ? this.check.minute = true : this.check.minute = false;
        this.data.set('min',value.trim());
      },
      saveNewsCon(value,render){
        render ? this.check.newscon = true : this.check.newscon = false;
        this.data.set('plot',render);
      },
      savePhotoList(formdata){
        this.data.delete('avatar');
        formdata.getAll('avatar').forEach(item=>{
          this.data.append('avatar',item)
        })
      },
      saveFuncPhoto(formdata){
        if(formdata.getAll('vertical')[0]
          && formdata.getAll('horizontal')[0]
          && formdata.getAll('banner')[0]
        ){
          this.check.funcphoto = true;
        }else {
          this.check.funcphoto = false;
        }
        this.data.set('vertical',formdata.getAll('vertical')[0]);
        this.data.set('horizontal',formdata.getAll('horizontal')[0]);
        this.data.set('banner',formdata.getAll('banner')[0]);
      },
      saveVideoList(formdata){
        this.data.delete('videos');
        formdata.getAll('videos').forEach(item=>{
          this.data.append('videos',item)
        })
      },
      senddata(){
        let send = true;
        for(let attr in this.check){
          if(!this.check[attr]){
            this.tip = '请检查输入信息，再试一次';
            send = false
            return
          }
        }
        if(send){
          this.tip='上传中，请稍等...'
          post('/admin/addmovie',this.data).then(r=>{
            this.tip = r.message;
            if(!r.code){
              window.location.reload()
            }
          })
        }
      },
    },
    created(){
      get('/admin/moviecategorylist').then(({data})=>{
        this.moviesCategory = data;
      })
    },

    components:{
      inputSelect,
      inputText,
      inputTextSearch,
      selectDate,
      uploadImg,
      uploadVideo,
    }
  }
</script>
<style>


</style>
