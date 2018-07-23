<template>
  <div class="trailer-preview" ref="trailer">
    <div v-if="showbutton" class="c-prev" @click="back()"></div>
    <div v-if="showbutton" class="c-next" @click="forward()"></div>
    <div class="preview-list">
      <ul ref="ul">
        <router-link
          tag="li"
          :class="{cur:current == index}"
          class="hidden float-left" ref="li"
          v-for="(item,index) in trailersrc" :key="index"
          :to="{name:'trailer',query:{movieid:movieid,index:index}}"
        >
          <video @loadeddata="gettime(index)" ref="video" :src="port+item" width="205" height="110" >您的浏览器不支持video标签</video>
          <span ref="span"></span>
          <i></i>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style>
  .trailer-preview li.cur{   border: 2px solid #03A9F4;box-sizing: border-box;}
  .trailer-preview div.c-next{right: -24px;
    background: rgba(0, 0, 0, 0.51) url(../../assets/images/newspic.png) 0px -183px;}
  .trailer-preview .c-prev{left:-24px;
    background: rgba(0, 0, 0, 0.51) url(../../assets/images/newspic.png) 0 -228px;}
  .trailer-preview .c-prev,.trailer-preview .c-next{position: absolute;top:32px;width: 20px;height: 46px;
  border-radius:3px;cursor: pointer;}
  .trailer-preview{position: relative;}
  .trailer-preview .preview-list{position: relative;height: 110px;overflow: hidden;width: 100%;}
  .trailer-preview ul{overflow: hidden;position: absolute;left: 0;top: 0;transition:all linear .25s;}
  .trailer-preview li i{display: block;width: 32px;height: 32px;position: absolute;
    left: 10px;bottom: 10px;background: url(../../assets/images/ui.png) no-repeat 0 -103px;}
  .trailer-preview li span{position: absolute;display: block;bottom: 0;width: 193px;text-align: right;
    line-height: 30px;background: rgba(0, 0, 0, 0.65);height: 30px;color: #fff;font-size: 12px;padding-right: 12px;}
  .trailer-preview li{cursor: pointer; position: relative;width: 205px;height:110px; margin-right: 15px;}
  .trailer-preview video{background: #000;}
</style>
<script>
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        showbutton:false,
        maxtarget:0,
      }
    },
    methods:{
      gettime(index){
        let duration = null;
        if(this.$refs.video[index].duration){
          duration = this.$refs.video[index].duration
        }else {
          duration = 600
        }
        let time =Math.floor(duration)
        let s = time%60;
        if(s<10){
          s = '0'+ s
        }else {
          s+=''
        };
        let m ='0' + Math.floor(time/60);
        this.$refs.span[index].innerText = m+':'+s
      },
      setwidth(arr){
        arr.length > this.num ? this.showbutton = true : this.showbutton = false;
        this.$nextTick(()=>{
          this.$refs.ul.style.width = 220*arr.length+'px';
          this.$refs.ul.style.left = '0px';
          this.maxtarget = 220*arr.length - this.$refs.trailer.clientWidth;
        })
      },
      back(){
        this.$refs.ul.style.left = '0px';
      },
      forward(){
        this.$refs.ul.style.left = -(this.maxtarget - 15) + 'px';
      }
    },
    props:{
      trailersrc:{
        type:Array,
        required:true
      },
      num:{
        type:Number,
        default:3
      },
      movieid:{
        type:String,
        required:true
      },
      current:{
        type:Number
      }
    },
    computed:{
      ...mapState({
        port:state=>state.userinfo.port
      }),
    },
    created(){
      this.setwidth(this.trailersrc)
    },
    watch:{
      trailersrc(newvalue,oldvalue){
        this.setwidth(newvalue)
      }
    }


  }
</script>
<style>

</style>
