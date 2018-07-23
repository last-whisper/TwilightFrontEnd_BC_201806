<template>
  <div id="rank">
    <!--选项卡导航-->
    <div class="rank-tools">
      <h4 :class="{'cur':currenttool === 'add'}" @click="currenttool='add'">添加</h4>
      <h4 :class="{'cur':currenttool === 'remove'}" @click="currenttool='remove'">删除</h4>
    </div>
    <!--新增榜单-->
    <div class="add" v-show="currenttool==='add'">

      <!--新增榜单编辑区域-->
      <div :key="key">
        <input-text
          :labelname="'榜单名：'"
          @text="saveRankTitle"
        ></input-text>
        <input-textarea
          :labelname="'榜单介绍'"
          @textarea="saveRankIntroduce"
        ></input-textarea>
        <input-text-search
          :labelname="'第1名：'"
          :range="'movie'"
          :evname="'first'"
          :limit="6"
          @first="saveRankFirst"
        >
        </input-text-search>
        <input-text-search
          :labelname="'第2名：'"
          :range="'movie'"
          :evname="'second'"
          :limit="6"
          @second="saveRankSecond"
        >
        </input-text-search>
        <input-text-search
          :labelname="'第3名：'"
          :range="'movie'"
          :evname="'third'"
          :limit="6"
          @third="saveRankThird"
        >
        </input-text-search>
        <input-text-search
          :labelname="'第4名：'"
          :range="'movie'"
          :evname="'fourth'"
          :limit="6"
          @fourth="saveRankFourth"
        >
        </input-text-search>
        <input-text-search
          :labelname="'第5名：'"
          :range="'movie'"
          :evname="'fifth'"
          :limit="6"
          @fifth="saveRankFifth"
        >
        </input-text-search>
      </div>
      <!--新增榜单操作区域-->
      <div class="add-control">
        <span :class="{'err':adderr}">{{addtip}}</span>
        <button @click="add()">添加榜单</button>

      </div>
      <!--新增榜单渲染区域-->
      <div class="title">
        <span>新增榜单</span><span>操作</span>
      </div>
      <ul v-show="addrank.length" class="rank-edit">
        <li v-for="(item,index) in addrank">
          <span>{{item.title}}</span><button @click="canceladd(index)">取消</button>
        </li>
      </ul>
      <button class="sendnewrank" @click="sendnewrank()">提交</button>
    </div>

    <!--删除榜单-->
    <div class="delete-rank" v-show="currenttool==='remove'">
      <div class="title">
        <span>排行榜名称</span><span>操作</span>
      </div>
      <div class="edit">
        <ul v-show="ranklist.length" class="rank-edit">
          <li v-for="(item,index) in ranklist" :key="index">
            <span>{{item.title}}</span>
            <button @click="remove(index,item)">删除</button>
          </li>
        </ul>
        <pages-info
          :key="pagekey"
          :totalpages="totalpages"
          @changepage="saveCurrentPage"
        ></pages-info>

        <div class="title">
          <span>待删除的榜单</span><span>操作</span>
        </div>
        <ul class="rank-edit">
          <li v-for="(item,index) in removelist" :key="index">
            <span>{{item.title}}</span>
            <button @click="cancel(item,index)">取消</button>
          </li>
        </ul>
        <button class="rank-send" @click="sendremove()">{{removetip}}</button>
      </div>
    </div>

  </div>
</template>
<script>
  import inputText from '@/components/form/input_text'
  import inputTextarea from '@/components/form/input_text_area'
  import inputTextSearch from '@/components/form/input_text_search'
  import pagesInfo from '@/components/public/pagesinfo'
  import {get,post} from '@/server/'
  export default {
    data(){
      return {
        totalpages:0,//总页数
        currenttool:'add',
        ranklist:[],//原数据

        adderr:true,//新增榜单错误判断
        addtip:'',//新增榜单提示信息
        newrank:{title:'',introduce:'',list:[]},//新增榜单数据载体
        addrank:[],//新增榜单数据集合
        key:new Date().getTime(),//用于手动重新渲染组件

        removeerr:true,//删除榜单错误判断
        removetip:'提交',//删除榜单提示信息
        removerank:[],//要从数据库删除的榜单_id集合
        removelist:[],//渲染删除榜单列表的数据
        pagekey:new Date().getTime(),//删除榜单让页码组件重新渲染以获得更新后的榜单
      }
    },
    methods:{
      //取消添加表单
      canceladd(index){
        this.addrank.splice(index,1);
      },
      //取消删除榜单
      cancel(item,index){
        this.removelist.splice(index,1);//待删除列队中移除当前项
        this.ranklist.unshift(item);//并将该项还原至原始数据中
        this.removerank.splice(index,1)
      },
      //删除榜单
      remove(index,item){
        this.ranklist.splice(index,1);//视图删除榜单
        this.removerank.push(item._id);//数据库将删除的榜单_id
        this.removelist.push(item);
      },
      //提交删除榜单
      sendremove(){
        post('/admin/removerank',{data:this.removerank})
          .then(({data})=>{
            if(data.code){
              this.removetip = '删除失败，再试一次'
            }else {
              this.removerank = [];
              this.removelist = []
              this.pagekey = new Date().getTime();
              this.removetip = '提交'
            }
          })
      },
      //添加榜单
      add(){
        //检测是否有重复选择的影片
        let r = null;
        if(!this.newrank.title.trim()){
          this.addtip = '请填写榜单名';
          this.adderr = true;
          return
        }else if(!this.newrank.introduce.trim()){
          this.addtip = '请填写榜单介绍';
          this.adderr = true;
          return
        }else if(this.newrank.list.length != 5){
          this.addtip = '榜单提名必须选择5部不同的影片';
          this.adderr = true;
          return
        }
        for(let i=0;i<this.newrank.list.length;i++){
          r = this.newrank.list.find((item,index)=>{
            return item == this.newrank.list[i] && index != i
          })
          if(r) break
        }
        if(r){
          this.addtip = '榜单提名存在重复影片';
          this.adderr = true;
          return
        }else {
          this.addrank.push(this.newrank);
          this.newrank = {title:'',introduce:'',list:[]};
          this.key = new Date().getTime();
          this.addtip = '';
        }
      },
      //发送新增榜单请求
      sendnewrank(){
        if(!this.addrank.length){
          this.adderr = true;
          this.addtip = '您还没有添加新的榜单'
        }else {
          this.adderr = false;
          this.addtip = '正在提交请稍等...'
          let data = {length:this.addrank.length};//将数组转成类数组发送给后端
          this.addrank.forEach((i,n)=>{
            i.list = i.list.join('-');
            data[n] = i
          })
          post('admin/addrank',data)
            .then(({data})=>{
              if(data.code){
                this.adderr = true;
                this.addtip = data.message;
              }else {
                this.addrank = [];
                this.adderr = false;
                this.addtip = data.message;
                this.pagekey = new Date().getTime();//让榜单列表重新渲染最新数据
              }
            })
        }
      },
      saveRankFirst(_id){
        this.newrank.list[0] = _id
      },
      saveRankSecond(_id){
        this.newrank.list[1] = _id
      },
      saveRankThird(_id){
        this.newrank.list[2] = _id
      },
      saveRankFourth(_id){
        this.newrank.list[3] = _id
      },
      saveRankFifth(_id){
        this.newrank.list[4] = _id
      },
      //根据页码请求排行榜数据
      saveCurrentPage(num){
        post('/api/ranklist',{page:Number(num),count:10}).then(({data})=>{
          if(this.removerank.length){
            let newdata = [];
            //如果用户已选择了删除项， 那么该项在删除列队中渲染，不在榜单列表中渲染
            data.data.forEach((item)=>{
              if(!this.removerank.find(i=>item._id == i)){
                newdata.push(item)
              }
            });
            this.ranklist = newdata;
          }else {
            this.ranklist = data.data;
          }
          this.totalpages = data.totalpages;
        })
      },
      saveRankTitle(value){
        this.newrank.title = value
      },
      saveRankIntroduce(value){
        this.newrank.introduce = value
      }
    },
    components:{
      inputTextSearch,
      pagesInfo,
      inputText,
      inputTextarea,
    },
  }
</script>
<style>
  #rank .add .sendnewrank{
    margin-right: 120px;
    margin-top: 30px;}
  #rank .add ul li{line-height: 44px;}
  #rank .add-control{ padding-right: 120px;
    margin-bottom: 40px;line-height: 30px;overflow: hidden;}
  #rank .add-control span.err{color: red;}
  #rank .add-control span{color: #00b542;}
  #rank .add-control button,#rank .add .sendnewrank{    float: right;
    background: #FFC107;
    padding: 15px 0px;
    width: 125px;
    margin-left: 20px;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;}
  #rank{padding-bottom: 350px;}
  #rank .delete-rank{line-height: 44px;
   }
  #rank .title{line-height: 54px;}
  #rank .title span{text-indent: 40px;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;}
  #rank .rank-edit{height: auto;overflow: hidden;}

  #rank .title span:first-child{width: 80%;}
  #rank .title span:last-child{width: 20%;}
  #rank .rank-edit li{overflow: hidden}
  #rank .rank-edit li:nth-of-type(odd){    background: #f5f5f5;}
  #rank .rank-edit span{text-indent: 40px;float: left;}
  #rank .rank-edit button{    background: #fff;float: right;
    border: none;
    line-height: 30px;
    width: 60px;
    padding: 0;
    margin-right: 105px;
    margin-top: 7px;
    cursor: pointer;
    border-radius: 4px;}
  #rank .rank-edit button:hover{background: #f9bd02;color: #fff;}
  #rank .rank-tools{height: 44px; padding: 0px 50px;border-bottom:1px solid #dadada;
    margin-bottom: 20px;}
  #rank .rank-tools h4{float: left;width: 120px;line-height: 44px;text-align: center;background: #fff;
    border-top-left-radius: 10px;border-top-right-radius:10px;
    margin-right: 10px;border-bottom: 1px solid #dadada;cursor: pointer;}
  #rank .rank-tools h4.cur{border:1px solid #dadada;border-bottom: none;}
  #rank button.rank-send{
    margin: 60px auto;
    display: block;
    line-height: 60px;
    width: 260px;
    border-radius: 10px;
    background: #f9bd02;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 18px;
  }
</style>
