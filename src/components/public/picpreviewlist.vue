<template>
  <div class="pic-preview" ref="pic">
    <div v-if="showbutton" class="prev" @click="back()"></div>
    <div v-if="showbutton" class="next" @click="forward()"></div>
    <div class="preview-list">
      <ul ref="ul">
        <router-link
          class="hidden float-left"
          ref="li" tag="li"
          :to="{name:'moviepic',query:{movieid:movieid,index:index}}"
          :class="{cur:current == index}"
          v-for="(item,index) in src" :key="index"
        >
          <img :src="port+item" width="auto" height="100">
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style>
  .pic-preview{position: relative;}
  .pic-preview div.next{right: -24px;
    background: rgba(0, 0, 0, 0.51) url(../../assets/images/newspic.png) 0px -183px;
  }
  .pic-preview .prev{left:-24px;background: rgba(0, 0, 0, 0.51) url(../../assets/images/newspic.png) 0 -228px;}
  .pic-preview .prev,.pic-preview .next{position: absolute;top:32px;width: 20px;height: 46px;
  border-radius:3px;cursor: pointer;}

  .pic-preview .preview-list{position: relative;height: 100px;overflow: hidden;width: 100%;}
  .pic-preview ul{overflow: hidden;position: absolute;left: 0;top: 0;transition:all linear .25s;}

  .pic-preview li{cursor:pointer;width:100px;height:100px; margin-right: 10px;background: #000;box-sizing: border-box;
  }
  .pic-preview li.cur{border: 2px solid #1f7dd7;}

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
      setwidth(arr){
        arr.length > this.num ? this.showbutton = true : this.showbutton = false;
        this.$nextTick(()=>{
          this.$refs.ul.style.width = 110*arr.length+'px';
          this.$refs.ul.style.left = '0px';
          this.maxtarget = 110*arr.length - this.$refs.pic.clientWidth;
        })
      },
      back(){
        this.$refs.ul.style.left = '0px';
      },
      forward(){
        this.$refs.ul.style.left = -(this.maxtarget - 10) + 'px';
      }
    },
    props:{
      src:{
        type:Array,
        required:true
      },
      num:{
        type:Number,
        default:6
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
      this.setwidth(this.src)
    },
    watch:{
      src(newvalue,oldvalue){
        this.setwidth(newvalue)
      }
    }


  }
</script>
<style>

</style>
