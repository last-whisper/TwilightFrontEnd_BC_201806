<template>
  <li class="f-wrap select-wrap">
    <span class="f-label">{{labelname}}</span>
    <div class="f-select" @click="itemOnOff=!itemOnOff">
      <span>{{currentItem.kind}}</span>
      <span class="caret"></span>
    </div>
    <transition name="fade">
      <ul v-show="itemOnOff" @mouseleave="itemOnOff=false">
        <li
          v-for="(item,index) in options"
          :key="index"
          @click="onchange(item)"
        >
          {{item.kind}}
        </li>
      </ul>
    </transition>
  </li>
</template>
<script>
  export default {
    data(){
      return {
        itemOnOff:false,
        currentItem:{kind:'选项一', _id:'1'},//当前选中的项
      }
    },
    methods:{
      onchange(item){
        this.itemOnOff = false;
        this.currentItem = item;
        this.$emit(this.evname,this.currentItem._id,this.currentItem.kind)
      }
    },
    props:{
      labelname:{
        type:String,
        default:'下拉菜单：'
      },
      evname:{
        type:String,
        default:'select'
      },
      options:{
        type:Array,
        default(){
          return [{
              kind:'选项一',
              _id:'1'
            },
            {
              kind:'选项二',
              _id:'2'
            },
            {
              kind:'选项三',
              _id:'3'
            }]
        }
      }
    },
    watch:{
      options(newvalue){
        if(newvalue){
          this.currentItem = newvalue[0];
          this.$emit(this.evname,this.currentItem._id,this.currentItem.kind,true)
        }
      }

    }

  }
</script>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
