<template>
  <li class="f-wrap">
    <span class="f-label">{{labelname}}</span>

    <!--选择年份-->
    <div class="inline-block select-choosedate year" @click="yearlist = true">
      <span>{{getYear}}</span>
      <span class="caret"></span>
      <ul v-show="yearlist" @mouseleave="yearlist=false">
        <li
          v-for="(item,index) in makeyearlist"
          :key="index"
          @click="chooseYear(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>

    <!--选择月份-->
    <div class="inline-block select-choosedate month" @click="monthlist = true">
      <span>{{getMonth}}</span>
      <span class="caret"></span>
      <ul v-show="monthlist" @mouseleave="monthlist=false">
        <li
          v-for="(item,index) in makemonthlist"
          :key="index"
          @click="chooseMonth(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>

    <!--选择日期-->
    <div class="inline-block select-choosedate date" @click="datelist = true">
      <span>{{getDate}}</span>
      <span class="caret"></span>
      <ul class="date" v-show="datelist" @mouseleave="datelist=false">
        <li
          :class="{'on':parseInt(item) === parseInt(getDate)}"
          v-for="(item,index) in makedatelist"
          :key="index"
          @click="chooseDate(item)"
        >
          {{item}}
        </li>
      </ul>
    </div>


  </li>
</template>
<script>
  export default {
    data(){
      return {
        yearlist:false,
        monthlist:false,
        datelist:false,
        getYear:new Date().getFullYear()+'年',
        getMonth:'--',
        getDate:'--',
      }
    },
    methods:{
      chooseYear(year){
        this.getYear = year;
        this.yearlist = false
      },
      chooseMonth(month){
        if(parseInt(month)<10){
          this.getMonth = 0+month;
        }else {
          this.getMonth = month;
        }
        this.monthlist = false
      },
      chooseDate(date){
        if(parseInt(date)<10){
          this.getDate = '0'+date+'日';
        }else {
          this.getDate = date+'日';
        }
        this.datelist = false;

      }
    },
    computed:{
      makeyearlist(){
        let arr = [];
        let currentyear = new Date().getFullYear()
        for(let i = 1980;i<=currentyear+2;i++){
          arr.unshift(i+'年')
        }
        return arr
      },
      makemonthlist(){
        return ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
      },
      makedatelist(){
        let year = parseInt(this.getYear);
        let month =parseInt(this.getMonth);
        let date = new Date(year,month,0).getDate();
        let arr = [];
        for(let i = 1;i<=date;i++){
          if(i<10){
            arr.push(0+(i))
          }else {
            arr.push(i)
          }
        }
        return arr
      },
      createdate(){
        return new Date(parseInt(this.getYear),parseInt(this.getMonth)-1,parseInt(this.getDate))
      }
    },
    props:{
      labelname:{
        type:String,
        default:'选择时间'
      },
      evname:{
        type:String,
        default:'choosedate'
      },
    },
    created(){
      let month=(new Date().getMonth()+1)+'月';
      let date=new Date().getDate()+'日';
      if(parseInt(month)<10){
        this.getMonth = '0'+month
      }else {
        this.getMonth = month
      }
      if(parseInt(date)<10){
        this.getDate = '0'+date
      }else {
        this.getDate = date
      }
      this.$emit(this.evname,this.createdate)
    },
    watch:{
      getYear(newvalue){
        if(this.makedatelist.length<parseInt(this.getDate)){
          this.getDate = '28日'
        }
        this.$emit(this.evname,this.createdate)
      },
      getMonth(newvalue){
        if(this.makedatelist.length<parseInt(this.getDate)){
          this.getDate = '28日'
        }
        this.$emit(this.evname,this.createdate)
      },
      getDate(){
        this.$emit(this.evname,this.createdate)
      }
    }
  }
</script>
<style>
  .select-choosedate.date,.select-choosedate.month{width: 44px;}
  .select-choosedate ul li:hover{background-color:#f5f5f5;}
  .select-choosedate ul.date{
    width:240%;
  }
  .select-choosedate ul.date li{
    width:20%;float: left;line-height: 2.5;
  }
  .select-choosedate ul.date li.on{
    background: #f9bd02;
  }
  .select-choosedate ul.date li:hover{
    background: #eeeeee;
  }
  .select-choosedate ul{

    z-index: 10;
    background: #fff;
    font-size: 16px;
    letter-spacing: 2px;
    position: absolute;
    cursor: pointer;
    clear: both;
    text-align: center;
    font-weight: 400;
    line-height: 2.0;
    color: #333;
    white-space: nowrap;
    box-shadow: 0 0 10px #dadada;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;
    left: 0;
    top:53px;
  }
  .select-choosedate.year ul{
    width: 350px;
  }
  .select-choosedate.year ul li{
    float: left;
    width: 33.33333%;
  }
  .select-choosedate{
    cursor: pointer;
    line-height: 48px;
    padding: 0 26px;
    box-shadow: 0 0 10px #dadada;
    border-radius: 4px;
    margin-right: 20px;
    position: relative;
  }
</style>
