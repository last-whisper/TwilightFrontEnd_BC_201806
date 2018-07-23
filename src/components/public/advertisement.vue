<template>
  <div class="advertisement" :class="[shape?'rectangle':'square',alignCenter?'center':'']">
    <img v-lazy="port+src[position]" alt="时光网广告位">
  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  export default {
    props:{
      shape:{
        type:Boolean,
        default:true
      },
      position:{
        type:String,
        required:true
      },
      //默认相对父级元素水平居中
      alignCenter:{
        type:Boolean,
        default:true
      }
    },
    computed:{
      ...mapState({
        src:state=>state.advertisement.src,
        port:state=>state.userinfo.port,
      })
    },
    methods:{
      ...mapActions(['fillSrc'])
    },
    created(){
      this.fillSrc()
    }
  }
</script>
<style>
  .advertisement img{background: none;}
  .advertisement.rectangle,.advertisement.rectangle img{display:block;width: 1200px;height: 90px;}
  .advertisement.square,.advertisement.square img{display:block;width: 300px;height: 250px;}
  .advertisement.center{margin: auto;}
</style>
