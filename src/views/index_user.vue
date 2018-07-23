<template>
  <div class="user-page">
    <div class="headtop">
      <img width="100%" height="300" :src="src" alt="">
    </div>
    <div class="userinfo">
      <div class="info">
        <img width="200" :src="src" height="200" alt="">
        <div class="uppic" :class="{on:onoff || show && $store.state.userinfo.userinfo._id === data._id}"
          @mouseover="show = true"
          @mouseout="show = false"
        >
          <img v-show="onoff" ref="imgprev" width="200" height="200" >
          <input ref="input" type="file" id="uploadpic" accept="image/*" @change="upload">
          <label for="uploadpic" v-if="!onoff && $store.state.userinfo.userinfo._id === data._id">更换头像</label>
          <div v-if="onoff" class="tip" @click="sure">确定</div>
          <div v-if="onoff" class="exit" @click="cancel">取消</div>
        </div>
        <h2>{{data.nickname}}<span> 个人主页</span></h2>
      </div>
    </div>
    <div class="user-info item">
      <h3>基本信息</h3>
      <p>账号：{{data.username}}</p>
      <p>昵称：{{data.nickname}}
        <span
          v-if="$store.state.userinfo.userinfo._id === data._id"
          v-show="!edit" @click="edit=true" class="editnickname">编辑</span>
        <span v-show="edit">
          <input type="text" v-model="nickname" placeholder="不超过12个字符">
          <input @click="surenickname" type="button" value="确定">
          <input @click="edit=false" type="button" value="取消">
        </span>
      </p>
      <p>经验值：{{data.exp}}</p>
    </div>

    <div class="other-info item">
      <h3>其他信息</h3>
      <p>感兴趣的影片类型：
        <span v-for="(item,index) in data.tags" :key="index">{{item.kind}}
          <i v-if="$store.state.userinfo.userinfo._id === data._id" @click="removetag(item._id,index)">x</i>
        </span>
        <input-select
          v-if="$store.state.userinfo.userinfo._id === data._id"
          @select="addtags" :options="tags" :labelname="'添加'"></input-select>
      </p>
      <p>注册日期：{{data.registerdata | localtime}}</p>
      <p>最后登陆日期：{{data.lastloading | localtime}}</p>
    </div>

    <div class="like item">
      <h3>喜欢的影片</h3>
      <ul class="hidden" v-if="data.like">
        <li class="float-left"
            v-if="index<5"
          v-for="(item,index) in data.like" :key="index"
        >
          <router-link :to="{name:'moviedetail',params:{id:item._id}}">
            <img width="170" height="256" :src="port+item.vertical"  >
            <div class="ellipsis">{{item.name}}</div>
          </router-link>

        </li>
      </ul>
    </div>

    <div class="wantsee item">
      <h3>期待的影片</h3>
      <ul class="hidden" v-if="data.wish">
        <li class="float-left"
            v-if="index<5"
            v-for="(item,index) in data.wish" :key="index"
        >
          <router-link :to="{name:'moviedetail',params:{id:item._id}}">
            <img width="170" height="256" :src="port+item.vertical"  >
            <div class="ellipsis">{{item.name}}</div>
          </router-link>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import tools from '@/assets/js/tools.js'
  import defaultheadimg from '@/assets/images/defaulthead.gif'
  import inputSelect from '@/components/form/select'
  import moment from 'moment'
  import {post,get} from '@/server/'

  export default {
    data(){
      return {
        src:defaultheadimg,
        data:{},
        port:this.$store.state.userinfo.port,
        tags:[{kind:'',_id:1}],
        onoff:false,
        show:false,
        uploadfile:new FormData(),
        nickname:'',
        edit:false,
      }
    },
    methods:{
      upload(){
        this.onoff = true;
        this.$refs.imgprev.setAttribute('src',tools.getObjectURL(this.$refs.input.files[0])) ;
        this.uploadfile.set('avatar',this.$refs.input.files[0]);
      },
      surenickname(){
        post('/admin/usernickname',{user:this.$store.state.userinfo.userinfo._id
        ,nickname:this.nickname})
          .then(({data})=>{
            if(!data.code){
              this.data.nickname = this.nickname;
              this.edit = false
            }
          })
      },
      cancel(){
        this.onoff = false;
        this.$refs.imgprev.removeAttribute('src') ;
        this.uploadfile = new FormData();
      },
      sure(){
        this.uploadfile.set('id',this.$store.state.userinfo.userinfo._id);
        post('/admin/userpic',this.uploadfile).then(({data})=>{
          if(!data.code){
            window.location.reload()
          }
        })
      },
      addtags(_id,kind,b){
        if(b) return;
        post('/admin/useraddtag',{user:this.$store.state.userinfo.userinfo._id,_id})
          .then(({data})=>{
            if(!data.code){
              this.data.tags.push({_id,kind})
            }
          })
      },
      removetag(_id,index){
        post('/admin/userremovetag',{user:this.$store.state.userinfo.userinfo._id,_id})
          .then(({data})=>{
            if(!data.code){
              this.data.tags.splice(index,1)
            }
          })
      },
      getData(id=this.id){
        post('/api/userallinfo',{id}).then(({data})=>{
          this.data = data.data;
          if(data.data.img){
            this.src = this.port + data.data.img;
          }

        });
        get('/admin/moviecategorylist').then(({data})=>{
          this.tags = data;
        })
      }
    },
    components:{
      inputSelect,
    },
    props:{
      id:{
        type:String,
        required:true
      }
    },
    created(){
      this.getData()
    },
    beforeRouteUpdate(to,from,next){
      this.getData(to.params.id);
      next()
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>
<style>
  .user-page .item>ul>li div{line-height: 40px;}
  .user-page .item>ul>li:last-of-type{margin-right: 0;}
  .user-page .item>ul>li{width: 170px;margin-right: 37px;}
  .user-page .other-info span:hover i{opacity: 1;}
  .user-page .other-info span i:hover{background: #d6c705
  }
  .user-page .other-info span i{    color: #ffffff;cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    opacity: 0;
    width: 14px;
    height: 14px;
    line-height: 14px;
    font-style: normal;
    background: #ccc;}
  .user-page .other-info span.f-label{min-width: 0;}
  .user-page .other-info p>span{display: inline-block;padding: 0px 30px;margin-right: 20px;
  border-radius: 3px;box-shadow: 0 0 5px #ccc;text-align: center;position: relative;}
  .user-page .item{width: 1000px;margin: 50px auto;padding-bottom: 20px; border-bottom: 1px solid #ccc;}
  .user-page .item p{line-height: 40px;padding-left: 35px}
  .user-page .item h3{line-height: 30px;padding-left: 20px;border-left: 11px solid #1f7dd7;
    font-size: 20px;color: #333333;margin-bottom:20px;}
  .user-page .user-info{width: 1000px;margin: -100px auto 0;padding-bottom: 30px;
    border-bottom: 1px solid #ccc;}
  .user-page .info p{line-height: 50px;color: #333333;}
  .user-page .uppic input{display: none;}
  .user-page .uppic label{display: block; width: 200px;height: 200px;position: absolute;text-align: center;line-height: 200px;
  color: #e0e0e0;cursor: pointer;
    font-weight: bold;font-size: 20px;}
  .user-page .uppic {position: absolute;top:0px;width: 200px;height: 200px;
    background: rgba(0, 0, 0, 0.48);opacity: 0;cursor: pointer;
  }
  .user-page .uppic .tip{    position: absolute;
    bottom: 20px;
    width: 60px;
    line-height: 30px;
    left: 25px;
    text-align: center;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #cacaca;}
  .user-page .uppic .exit{    position: absolute;
    bottom: 20px;
    width: 60px;
    line-height: 30px;
    right: 25px;
    text-align: center;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #cacaca;}
  .user-page .info h2 span{font-size: 26px;font-weight: normal;}
  .user-page .info h2{position: absolute;font-size: 45px;left: 250px;top: 90px;}
  .user-page .info{position: relative;top:-150px;}
  .user-page .info img{background: #fff;}
  .user-page .user-info input{border-radius: 5px;box-shadow: 0 0 5px #ccc;padding: 0px 25px;
    margin-left: 5px;line-height: 40px;}
  .user-page .user-info .editnickname{ cursor: pointer;display: inline-block;
    margin-left: 15px;padding: 0px 25px;border-radius: 5px;box-shadow: 0 0 5px #ccc;}
  .user-page .userinfo .uppic.on{opacity: 1;}
  .user-page .userinfo{width: 1000px;position: relative;margin: auto;height: 200px;}
  .user-page .headtop img{filter: blur(125px);}
  .user-page .headtop{height: 300px;background: #b0b0b0;overflow: hidden;}
</style>
