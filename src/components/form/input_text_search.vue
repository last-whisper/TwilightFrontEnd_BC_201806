<template>
  <li class="f-wrap">
    <span class="f-label">{{labelname}}</span>
    <div class="f-input position" :class="{'f-input-focus':onfocus}">
      <!--输入框-->
      <input type="text"
             @blur="blur()"
             @focus="focus()"
             @input="search()"
             v-model="value"
             ref="input"
             spellcheck="false"
      >
      <p class="currentchoose" v-show="choosed">
        {{addlabel}}：<span>{{chooseitem.transliteration || chooseitem.name}}</span>
        <button @click="out()">取消</button>
      </p>

      <!--数据渲染-->
      <div class="f-input search-result" v-show="resultonoff">
        <ul>
          <!--电影渲染结构-->
          <li
            v-for="(item,index) in result.movies"
            :key="item._id"
            v-show="showmovielist"
            @click="choose(item)"
          >
            <img ref="movieimgs">
            <div>
              <h2>{{item.name}}({{item.showtime | localtime}})</h2>
              <dl>
                <dd>{{item.englishname}}</dd>
                <dd>导演：{{item.director.transliteration}}</dd>
              </dl>
            </div>
            <span class="category">电影</span>
          </li>
          <!--导演渲染结构-->
          <li
            v-for="(item,index) in result.directors"
            :key="item._id"
            v-show="showdirectorlist"
            @click="choose(item)"
          >
            <img ref="directorimgs">
            <div>
              <h2>{{item.transliteration}}({{item.name}})</h2>
            </div>
            <span class="category">导演</span>
          </li>
        </ul>

        <button class="add" v-show="addonoff" @click="add()">
          还没有收录该导演，点击新增
        </button>
      </div>
      <!--新增数据-->
      <dl class="adddirector" v-show="addedit">
        <dt>
          <input v-model="directorchinesename" type="text" placeholder="中文名">
          <input v-model="directorname" type="text" placeholder="英文名">
        </dt>
        <dd @mouseover="addeditonoff=true" @mouseout="hiddenlabel()">
          <img :src="directorpreview"  alt="">
          <label v-show="addeditonoff" for="director-photo">{{directorlabel}}</label>
          <input type="file" accept="image/*" id="director-photo" ref="directorphoto" @change="directorphoto()">
        </dd>
        <div>
          <button @click="sendinfo()">确定</button>
          <button @click="cancel()">取消</button>
        </div>

      </dl>
    </div>

    <!--错误提示-->
    <span class="f-tip" :class="{'pass':!err}">{{tip}}</span>
  </li>
</template>
<script>
  import tools from '@/assets/js/tools.js'
  import {post} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return{
        value:'',
        tip:'',
        addlabel:'已选择',
        onfocus:false,
        err:true,
        resultonoff:false,//控制搜索预览
        addonoff:false,//控制搜索结果提示
        showmovielist:false,
        showdirectorlist:false,
        choosed:false,
        addedit:false,//添加新导演编辑区
        result:{//搜索返回数据
          movies:[{name:'',showtime:'',englishname:'',director:{},img:{},_id:'0'}],
          directors:[{transliteration:'',name:'',_id:'1'}]
        },
        chooseitem:{},
        //添加新导演相关数据
        addeditonoff:true,
        directorlabel:'上传照片',
        directorchinesename:'',
        directorname:'',
        directorfile:{},
        directorpreview:'',
        timer:null,//定时器

      }
    },
    methods:{
      //选择导演图片
      directorphoto(){
        let file = this.$refs.directorphoto.files[0];
        this.directorfile = file
        this.directorpreview = tools.getObjectURL(file);
        this.directorlabel = '替换照片';
        this.addeditonoff = false;
      },
      //隐藏导演图片上传按钮（已选择图片的情况下）
      hiddenlabel(){
        if(this.directorpreview ) {
          this.addeditonoff=false
        }
      },
      //emit新增导演数据
      sendinfo(){
        if((this.directorchinesename || this.directorname) && this.directorfile){

            this.addedit = false;
            //提示待新增
            this.tip = '';
            this.choosed = true;
            this.chooseitem = {name:this.directorchinesename || this.directorname};
            this.addlabel = '待添加';
            this.$emit(this.evname,{
              file:this.directorfile,//图片file
              transliteration:this.directorchinesename,
              name:this.directorname
            });
            this.addonoff = false;

        }else {
            this.tip = '请核对新增导演信息'
        }
      },
      //取消新增导演
      cancel(){
        this.addedit = false;
      },
      search(){
        clearTimeout(this.timer);//当用户输入间隔超过700毫秒才发送请求，减少请求次数
        let params = {range:this.range,key:this.value,limit:this.limit};
        this.timer = setTimeout(()=>{
          if(!params.key.trim()){
            //没有key值当作没有返回数据处理
            this.result = {
              movies:[{name:'',showtime:'',englishname:'',director:{},_id:'0',img:{}}],
              directors:[{transliteration:'',name:'',_id:'1'}]
            }
            this.showmovielist = this.showdirectorlist = false;
            return
          }
          this.resultonoff=true;
          post('/api/searchdata',params)
            .then(({data})=>{
              if(data.data.movies.length || data.data.directors.length){

                this.addonoff=false;//搜索结果有数据存在
                this.result = data.data//返回的数据赋值给this.result
                this.showmovielist = this.showdirectorlist = true;

              }else {

                if(this.range === 'director'){
                  this.addonoff=true;//检索导演数据不存在则显示新增导演按钮
                }
                this.result = {
                  movies:[{name:'',showtime:'',englishname:'',director:{},_id:'0',img:{}}],
                  directors:[{transliteration:'',name:'',_id:'1'}]
                }
                this.showmovielist = this.showdirectorlist = false;

              }
            })
        },700)
      },
      choose(item){
        this.tip = '';
        this.choosed = true;
        this.chooseitem = item;
        this.addlabel = '已选择';
        this.$emit(this.evname,this.chooseitem._id)
      },
      out(){
        this.choosed=false;
        this.$emit(this.evname,'');
        this.tip = '请重新选择';
        this.$refs.input.focus()
      },
      focus(){
        this.onfocus=true;
        //有数据存在
        if((this.result.movies[0] && this.result.movies[0].name)
          || (this.result.directors[0] && this.result.directors[0].name)){
          this.resultonoff = true;
          this.addedit = false;
        }else {
          //没数据存在
          if(this.value){
            //输入框有输入内容
            this.resultonoff = true;
            this.addedit = false;
            if(this.range === 'director'){
              //检索导演数据不存在则显示新增导演按钮
              this.addonoff = true;
            }
          }else {
            //输入框没有输入内容
            this.resultonoff = false;
            this.addonoff = false;
            this.addedit = false;
          }
        }
      },
      blur(){
        setTimeout(()=>{//onblur事件先于choose事件，需要延迟触发
          this.onfocus=false;
          this.resultonoff = false;

        },200)
      },
      add(){
        this.addedit = true;
        this.directorchinesename = this.value;
        this.directorname = this.value;
      }
    },
    props:{
      //数据检索范围，'director'检索导演、'movie'检索影片
      range:{
        type:String,
        default:'all'
      },
      labelname:{//表单名
        type:String,
        default:'文本表单：'
      },
      maxlength:{//输入文本最大字节长度
        type:Number,
        default:20
      },
      evname:{//emit事件名
        type:String,
        default:'inputsearch'
      },
      checkout:{//默认对输入文本进行检测
        type:Boolean,
        default:true
      },
      limit:{//渲染条数
        type:Number,
        default:10
      }
    },
    watch:{
      result(newvalue){
        if(newvalue){
          this.$nextTick(function () {
            // 搜索预览列表图片预加载
            let movieimgarr = this.$refs.movieimgs;
            let directorimgarr = this.$refs.directorimgs;

            if(movieimgarr){
              movieimgarr.forEach((item,index)=>{
                let img = new Image();
                img.onload=()=>{
                  img.onload = null;
                  item.src = img.src
                };
                img.src = this.$store.state.userinfo.port+this.result.movies[index].vertical
              });
            }

            if(directorimgarr){
              directorimgarr.forEach((item,index)=>{
                let img = new Image();
                img.onload=()=>{
                  img.onload = null;
                  item.src = img.src
                };
                img.src = this.$store.state.userinfo.port+this.result.directors[index].src;

              })
            }
          })
        }
      }
    },
    filters:{
      //处理UTC时间格式
      localtime(utc,str='YYYY'){
        return moment(utc).format(str)
      }
    },

  }
</script>
<style>
  dl.adddirector label{    width: 90px;
    cursor: pointer;
    height: 90px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background: rgba(19,19,19,0.75);
    line-height: 90px;
    text-align: center;}
  dl.adddirector button{
    display: inline-block;
    clear: both;
    background: #ebebeb;
    border: navajowhite;
    width: 45%;
    line-height: 40px;
    border-radius: 4px;
    font-size: 14px;
    position: relative;
    top: 10px;
    cursor: pointer;

  }
  dl.adddirector button:nth-of-type(2){
    margin-left: 8%;}
  dl.adddirector button:hover{background: #f9bd02;color: #fff;}

  dl.adddirector input[type='text']{    width: 100%;
    margin: 5px 0;
    border: 1px solid #ccc;
    font-size: 12px;

    text-indent: 10px;
    border-radius: 4px;
    padding: 5px 0;}
  dl.adddirector dd{float: right;
    width: 90px;
    height: 90px;
    position: relative;
    margin-top: 5px;}
  dl.adddirector dd img{width: 90px;height: 90px;background: none}
  dl.adddirector dt{float: left;width: 190px;}
  dl.adddirector{
    overflow: hidden;
    width: 300px;
    position: absolute;
    box-shadow: 0 0 5px #ccc;
    padding: 10px 20px;
    left: 0;
    background: #fff;
    height: 160px;
    top: 55px;
    border-radius: 4px;}
  .f-input.position .currentchoose span{color: #636363;}
  .f-input.position .currentchoose button{    float: right;cursor: pointer;
    border: none;
    border-radius: 10px;
    color: #747474;
    line-height: 21px;
    font-size: 12px;
    background: #fff;
    padding: 0 10px;}
  .f-input.position .currentchoose button:hover{background: #f9bd02;color: #fff;
  }
  .f-input.position .currentchoose{
    color: #929292;
    position: absolute;
    top: 8px;
    padding: 6px 10px;
    background: #ededed;
    border-radius: 20px;
    width: 280px;}
  .f-input.position{position: relative;}
  .f-input.search-result{position: absolute;top:55px;left: 0;padding: 0;width: 100%;z-index:11;}
  .f-input.search-result li{
    line-height: 20px;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    zoom: 1;
    cursor: pointer;
    position: relative;
  }
  .f-input.search-result li:last-child{border-bottom: none}
  .f-input.search-result li img{
  width: 45px;
  height: 60px;
  float: left;}
  .f-input.search-result li div{
    float: left;
    min-height: 60px;
    margin-left: 15px;
  }
  .f-input.search-result li span.category{
    font-size: 13px;
  color: #999;
  height: 20px;
  line-height: 20px;
  position: absolute;
  top: 50%;
  right: 20px;
  margin-top: -10px;}
  .f-input.search-result li h2{
  font-size: 16px;
  line-height: 1.5;
  font-weight: normal;}
  .f-input.search-result li dd{
    font-size: 12px;
    line-height: 21px;
    color: #999;
  }
  .f-input.search-result .add{

    border-radius: 40px;
    background: #f2f2f2;
    border: none;
    box-shadow: 0 0 5px #ccc;
    width: 300px;
    line-height: 2.4;
    margin: 15px 0 15px 20px;
    cursor: pointer;

  }
  .f-input.search-result{background: #fff;}
  .f-input.search-result .add:hover{background: #f9bd02;color: #fff;}
  .f-input.search-result li:hover{background: #e5f2fc;cursor: pointer;}

</style>
