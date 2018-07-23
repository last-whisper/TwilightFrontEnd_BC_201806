<template>
  <div class="pagesinfo">

    <div class="showpages" v-if="totalpages">
      <li :class="{'disable':currentpage==1}" class="prevpage" @click="prev()">上一页</li>
      <li
        v-for="(item,index) in pagenumber"
        :key="index"
        :class="{'current':item == currentpage}"
      >
        <span class="blink" @click="blink(index)" v-if="item==='...'">
          {{item}}
        </span>
        <span v-else @click="choose(item)">
          {{item}}
        </span>
      </li>
      <li :class="{'disable':currentpage==totalpages}" class="nextpage" @click="next()">下一页</li>
    </div>

    <div class="tip" v-else>
      <p>抱歉，没有相关数据</p>
    </div>

  </div>
</template>
<script>
  import tools from '@/assets/js/tools'
  export default {
    data(){
      return {
        currentpage:1,//当前页
      }
    },
    methods:{
      //切换页码
      choose(item){
        this.currentpage = Number(item);
      },
      //上一页
      prev(){
        if(this.currentpage === 1){
          return
        }
        this.currentpage--
      },
      //下一页
      next(){
        if(this.currentpage === this.totalpages){
          return
        }
        this.currentpage++
      },
      //跃进页码，向前跳5页或者向后跳跃5页
      blink(index){
        if(index==1){
          //页码向前跳5格
          if(this.currentpage-5<1){
            this.currentpage = 1
          }else {
            this.currentpage -= 5
          }
        }else {
          //页码向后跳5格
          if(this.currentpage+5>this.totalpages){
            this.currentpage = this.totalpages
          }else {
            this.currentpage += 5
          }
        }
      }
    },
    created(){
      this.$emit(this.evname,this.currentpage);
    },
    props:{
      totalpages:{
        type:Number,
        default:0
      },
      evname:{
        type:String,
        default:'changepage'
      }
    },
    watch:{
      currentpage(n){
        this.$emit(this.evname,this.currentpage);
      }
    },
    computed:{
      pagenumber(){
        let arr = [];
        // 两端折叠
        if(this.currentpage-1>=4 && this.totalpages-this.currentpage>=4){
          arr = [1,'...',this.currentpage-2,this.currentpage-1,this.currentpage,
            this.currentpage+1,this.currentpage+2,'...',this.totalpages]
        }else if(this.currentpage-1>=4 && this.totalpages-this.currentpage<4){
        //左边折叠
          arr = [1,'...',...tools.createPageNumber(this.currentpage,this.totalpages),this.totalpages]
        }else if(this.currentpage-1<4 && this.totalpages-this.currentpage>=4){
        //右边折叠
          arr = [1,...tools.createPageNumber(this.currentpage),'...',this.totalpages]
        }else {
        //没有折叠
          for(let i = 1;i<=this.totalpages;i++){
            arr.push(i)
          }
        }
        return arr

      }
    }
  }
</script>
<style>
  .pagesinfo .showpages li span{display: block;width: 34px;height: 34px;cursor: pointer;
    user-select:none;}
  .pagesinfo .current{
    background: #f9bd02;color: #fff;}
  .pagesinfo{
    width: 100%;
    overflow: hidden;
    margin: 30px auto ;
    padding: 10px;
  }
  .pagesinfo li{display: inline-block;width: 34px;margin:0 5px;border-radius: 4px;
    box-shadow: 0 0 10px #d8d8d8;;text-align: center;line-height: 34px;
  }
  .pagesinfo .disable{color: #999;background: #f5f5f5;}
  .pagesinfo .prevpage,.pagesinfo .nextpage{width: 80px;cursor: pointer;user-select:none;}
  .pagesinfo .prevpage:hover{background: #f2f2f2;}
  .pagesinfo .nextpage:hover{background: #f2f2f2;}
  .pagesinfo .showpages li span:hover{background: #f2f2f2;}
  .pagesinfo .showpages li.current span:hover{background: none;}
</style>
