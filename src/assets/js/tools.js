//项目需要用到的方法

const tools = {
  //正则方法
  regexp(str,{
    sure=0,
    symbol=false,//默认不允许使用下划线
    min=6,//最小位数
    max=12,//最大位数
    simple=false,
    //组合形式：
    // false=>必须以字母开头，搭配数字的方式
    // true=>可以是纯数字或纯字母
    // number=>只可以是纯数字
    // letter=>只可以是纯字母
  }){

      str = str.trim();

      let chinese = /[\u4e00-\u9fa5]/;
      let exp = /[-+?%#@!^(){}=$&*|\\/<>,.。，；’‘';:“”"：《》—、（）【】【·~`\[\]]/;
      let tip={code:0,message:''};

      if (str===''){
        tip.code = 1;
        tip.message = '不能为空';
        return tip
      }else if (symbol==false && new RegExp(/_/).test(str)){
        tip.code = 1;
        tip.message = '中出现非法字符：_';
        return tip
      }else if (simple==false){//必须以字母开头,并且是字母和数字的组合，可以出现_
        if (new RegExp(/^[^a-zA-Z]/).test(str)){
          tip.code = 1;
          tip.message = '必须以字母开头';
          return tip
        }else if (!new RegExp(/[0-9]/).test(str)){
          tip.code = 1;
          tip.message = '必须是字母和数字的组合，可以包含\'_\'';
          return tip
        }
      }else if (simple==true){
        if (new RegExp(/[a-zA-Z][0-9]|[0-9][a-zA-Z]/).test(str)){
          tip.code = 1;
          tip.message = '必须是纯数字或纯字母';
          return tip
        }
      }else if (simple=='number'){
        if (new RegExp(/[^0-9]/).test(str)){
          tip.code = 1;
          tip.message = '必须是纯数字';
          return tip
        }
      }else if (simple=='letter'){
        if (new RegExp(/[^a-zA-Z]/).test(str)){
          tip.code = 1;
          tip.message = '必须是纯字母';
          return tip
        }
      }

      if (chinese.test(str)){//判断是否出现中文
        tip.code = 1;
        tip.message = '不能出现中文字符';
        return tip
      }
      if (exp.test(str)){//判断是否出现非法字符
        let s =str.match(exp);
        tip.code = 1;
        tip.message = '中\''+ s +'\' 是非法字符';
        return tip
      }

      if (sure){//如果设置了具体的字符长度
        if(str.length!=sure){
          tip.code = 1;
          tip.message = `字符长度必须为${sure}位`;
          return tip
        }
      }else {
        if (str.length<min || str.length>max){//判断字符长度
          tip.code = 1;
          tip.message = `不能小于${min}个或大于${max}个字符`;
          return tip
        }
      }
      return tip
  },

  //获取上传图片的url
  getObjectURL(file) {
    let url = null ;
    if (window.createObjectURL!=undefined) { // basic
      url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
  },

  //获取视频第一帧src
  captureImage(videoel){
    let src='';
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 560;
    canvas.getContext('2d').drawImage(videoel, 0, 0, 1000,560);
    src=canvas.toDataURL("image/png");
    return src
  },

  //生成页码下标
  createPageNumber(current,num=1) {
    let arr = [current-2,current-1,current,current+1,current+2];
    if(num==1){
      arr = arr.filter((i)=>i>num)
    }else {
      arr = arr.filter((i)=>i<num)
    }
    return arr
  }

}


export default tools
