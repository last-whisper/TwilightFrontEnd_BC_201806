<template>
  <li class="f-wrap">
    <span class="f-label">{{labelname}}</span>
    <p class="f-input" :class="{'f-input-focus':onfocus}">
      <input
        spellcheck="false"
        @focus="onfocus=true"
        @blur="check"
        type="text"
        v-model="value"
      >
    </p>
    <span class="f-tip" :class="{'pass':!err}">{{tip}}</span>
  </li>
</template>
<script>
  export default {
    data(){
      return{
        value:'',
        tip:'',
        onfocus:false,
        err:true,
      }
    },
    methods:{
      check(){
        this.onfocus = false;
        if(!this.value.trim() && this.checkout){
          this.tip = '内容不能为空';
          this.err = true;
          this.$emit(this.evname,'')
        }else if(this.value.length>this.maxlength){
          this.tip = '内容不能超过'+this.maxlength+'个字符';
          this.err = true;
          this.$emit(this.evname,'')
        }else {
          this.$emit(this.evname,this.value)
          if(this.checkout){
            this.tip = '正确'
            this.err = false;
          }else {
            if(this.value.trim()){
              this.tip = '正确';
            } else {
              this.tip = '选填';
            }
            this.err = false;
          }
        }
      }
    },
    props:{
      labelname:{
        type:String,
        default:'文本表单：'
      },
      maxlength:{
        type:Number,
        default:35
      },
      evname:{
        type:String,
        default:'text'
      },
      checkout:{
        type:Boolean,
        default:true
      }
    }
  }
</script>
<style>

</style>
