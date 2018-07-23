<template>
  <div id="adv">
    <div :key="key">
      <div class="index-adv adv" >
        <h4>首页广告位编辑</h4>
        <upload-img
          :uploadsarr="indexAdvUploadsarr"
          :multiple="false"
          :evname="'indexadv'"
          @indexadv="saveIndexAdv"
        >
        </upload-img>
      </div>
      <div class="news-adv adv">
        <h4>新闻页广告位编辑</h4>
        <upload-img
          :uploadsarr="newsAdvUploadsarr"
          :multiple="false"
          :evname="'newsadv'"
          @newsadv="saveNewsAdv"
        >
        </upload-img>
      </div>
      <div class="detail-adv adv">
        <h4>详情页广告位编辑</h4>
        <upload-img
          :uploadsarr="detailAdvUploadsarr"
          :multiple="false"
          :evname="'detailadv'"
          @detailadv="saveDetailAdv"
        >
        </upload-img>
      </div>
      <div class="community-adv adv">
        <h4>社区页广告位编辑</h4>
        <upload-img
          :uploadsarr="communityAdvUploadsarr"
          :multiple="false"
          :evname="'communityadv'"
          @communityadv="saveCommunityAdv"
        >
        </upload-img>
      </div>
    </div>

    <p class="adv-tip" :class="{'err':err}">{{tip}}</p>
    <button class="adv-send" @click="senddata()">提交</button>
  </div>
</template>
<script>
  import uploadImg from '@/components/form/upload'
  import {get,post} from '@/server/'
  export default {
    data(){
      return {
        indexAdvUploadsarr:[
          {value:'1号广告位',filename:'index_first',id:'index-first'},
          {value:'2号广告位',filename:'index_second',id:'index-second'},
          {value:'3号广告位',filename:'index_third',id:'index-third'},
          {value:'4号广告位',filename:'index_fourth',id:'index-fourth'},
          {value:'5号广告位',filename:'index_fifth',id:'index-fifth'},

        ],
        newsAdvUploadsarr:[
          {value:'1号广告位',filename:'news_first',id:'news-first'},
          {value:'2号广告位',filename:'news_second',id:'news-second'},
        ],
        detailAdvUploadsarr:[
          {value:'长方形广告位',filename:'detail_first',id:'detail-first'},
          {value:'正方形广告位',filename:'detail_second',id:'detail-second'},
        ],
        communityAdvUploadsarr:[
          {value:'长方形广告位',filename:'community_first',id:'community-first'},
          {value:'正方形广告位',filename:'community_second',id:'community-second'},
        ],
        tip:'',
        err:true,
        uploaddata:new FormData(),
        key:new Date().getTime(),
      }
    },
    methods:{
      senddata(){
        post('/admin/setadv',this.uploaddata).then(({data})=>{
          if(data.code){
            this.err = true;
            this.tip = data.message;
          }else {
            this.err = false;
            this.tip = data.message;
            this.key = new Date().getTime();
          }
        })
      },
      saveIndexAdv(formdata){
        this.uploaddata.set('index_first',formdata.get('index_first'));
        this.uploaddata.set('index_second',formdata.get('index_second'));
        this.uploaddata.set('index_third',formdata.get('index_third'));
        this.uploaddata.set('index_fourth',formdata.get('index_fourth'));
        this.uploaddata.set('index_fifth',formdata.get('index_fifth'));

      },
      saveNewsAdv(formdata){
        this.uploaddata.set('news_first',formdata.get('news_first'));
        this.uploaddata.set('news_second',formdata.get('news_second'));
      },
      saveDetailAdv(formdata){
        this.uploaddata.set('detail_first',formdata.get('detail_first'));
        this.uploaddata.set('detail_second',formdata.get('detail_second'));
      },
      saveCommunityAdv(formdata){
        this.uploaddata.set('community_first',formdata.get('community_first'));
        this.uploaddata.set('community_second',formdata.get('community_second'));
      },
    },
    components:{
      uploadImg,
    }
  }
</script>
<style>
  #adv .adv{
    margin-bottom: 40px;
  }
  #adv h4{
    font-size: 18px;line-height: 44px;}
  #adv .adv-tip{color: #00b542;}
  #adv .adv-tip.err{color: red;}
  #adv .adv-send{    margin: 60px auto;
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
