<template>
  <div id="foot">
    <span class="topline"></span>
    <div class="foot hidden">
      <div class="footlogo item">
        <dl>
          <dt><a href=""></a></dt>
          <dd><span>加入我们</span><span>联系我们</span></dd>
          <dd><span>站务论坛</span><span>问题反馈</span></dd>
          <dd><span>社区准则</span><span>网站地图</span></dd>
          <dd><span>隐私政策</span><span>English</span></dd>
        </dl>
        <i class="line"></i>
      </div>
      <div class="footmap item">
        <dl>
          <dt>栏目</dt>
          <dd><a href="">新闻</a></dd>
          <dd><a href="">影院</a></dd>
          <dd><a href="">评论</a></dd>
          <dd><a href="">社区</a></dd>
        </dl>
        <dl>
          <dt>推荐</dt>
          <dd><a href="">观影指南</a><a href="">电影票房</a></dd>
          <dd><a href="">暮光对话</a><a href="">新片预告</a></dd>
          <dd><a href="">特色榜单</a><a href="">电影猜猜猜</a></dd>
          <dd><a href="">全球拾趣</a><a href="">卡片大富翁</a></dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><a class="sina" href=""></a></dd>
          <dd><a class="wechat" href=""></a></dd>
          <dd><a class="rss" href=""></a></dd>
        </dl>
        <i class="line"></i>
      </div>
      <div class="footweek item">
        <dl>
          <dt class="fix hidden">
            <span class="float-right">第211期</span><strong>暮光周刊</strong>
          </dt>
          <dd>
            <a href="http://www.mtime.com/weekly" target="_blank" title="暮光周刊">
              <img src="../../assets/images/week.jpg" alt="暮光周刊">
            </a>
          </dd>
          <dd class="input">
            <input id="iptEMail" type="text" value="邮箱地址" class="c_a5">
            <a  href="javascript:void(0)">订阅</a>
          </dd>
        </dl>
      </div>
      <div class="foothr item">
        <dl>
          <dt>
            <strong>手机购票</strong> 方便 实惠
          </dt>
          <dd>
            <a target="_blank"><i></i></a>
          </dd>
          <dd>扫描二维码 下载客户端</dd>
        </dl>
      </div>
    </div>
    <div class="foot-info">
      <p>
        <span>举报中心电话：4001234567   举报中心邮箱：service@twilight.com </span><br>
        <span>北京暮光网络科技有限公司</span>
        Copyright 2006-2018 Twilight.com Inc. All rights reserved.<br>
        <a >京ICP证051234号</a>
        <a target="_blank" class="mr12">网络视听许可证1234567号</a>
        <a class="mr12">网络文化经营许可证</a>
        <a  class="mr12">广播电视节目制作经营许可证(京)字第1435号</a>
        <a  target="_blank" class="beian_container">
        <span class="beian"></span>
        <span>京公网安备：11010502012345号</span>
        </a>
      </p>
      <div class="credible">
        <a href="" class="credibler"></a>
        <a href="" class="szfw_logo"></a>
        <a href="" class="aqLogo"></a>
      </div>
    </div>
  </div>
</template>
<style>
  .credible .aqLogo{    background: url(../../assets/images/aqLogo.png) no-repeat;
    background-size: 100% auto;}
  .credible{padding-top: 12px;}
  .credible .credibler{    background-position: 0 -60px;}
  .credible a{    background: url(../../assets/images/foot.png) no-repeat; display: inline-block;width: 68px;height: 25px;position: relative;zoom: 1;vertical-align: middle;margin-right: 15px;overflow: hidden;}
  .foot-info .beian{background: url(../../assets/images/foot.png) -233px -12px no-repeat;display: inline-block;width: 20px;
    height: 20px;vertical-align: middle;margin-right: 0!important;}
  .foot-info span,.foot-info a{margin: 0 6px;color: #7e7e7f;}
  .foot-info{color: #7e7e7f; background: #fff; text-align: center;font-family: Verdana;padding: 30px 0 20px;line-height: 2em;font-size: 12px;}
  .foothr dd{ text-align: center;   margin-top: 12px;}
  .foothr i{background: url(../../assets/images/foot.png) -795px -9px no-repeat;width: 99px;height: 99px;margin: 0 auto;display: block;}
  .foothr strong{color: #333;line-height: 1em;font-size: 18px;font-weight: 400;}
  .foothr dt{color: #7d7d7d;text-align: center}
  .foothr{width: 205px;}
  .footweek .input a{width: 54px;height: 25px;text-align: center;color: #fff;    display: inline-block;
    line-height: 25px;background: #1f7dd7;border-radius: 30px;position: absolute;
    right: 53px;}
  .footweek input {color:#9c9c9c; border-radius: 30px;background: 0 0;width: 130px;text-indent: 12px;border: none;height: 22px;
    position: relative;box-shadow: inset 5px 5px 5px #e7e7e7;   }
  .footweek img {width: 170px;height: 80px;border: 1px solid #ccc;}
  .footweek dd{margin-top: 10px;}
  .footweek .fix strong{font-size: 18px;font-weight: 400;}
  .footweek .fix  span{    color: #7d7d7d;padding-top: 3px;}
  .footweek dl{width: 172px;margin: auto;}
  .footweek{width: 280px;}
  #foot .footmap dd a.rss{background-position: -200px -9px;}
  #foot .footmap dd a.wechat{    background-position: -170px -9px;}
  .footmap dl:last-of-type dd a{   background: url(../../assets/images/foot.png) -140px -9px no-repeat;
    width: 30px;height: 30px;display: block;line-height: 0;font-size: 0;overflow: hidden;margin-top: 8px;}
  .footmap dl:nth-of-type(2) dd a:last-of-type{margin-left: 30px;}
  .footmap dd{line-height: 2em;font-size: 16px;}
  .footmap dl{float: left;display: inline;margin-left: 55px;line-height: 2em;}
  .footmap dl:nth-of-type(2){width: 185px;}
  .footmap dl:first-of-type{width: 42px;}
  .footmap{width: 500px;}
  .footlogo dd span:last-of-type{margin-left: 30px;}
  .footlogo dd{line-height: 1.8em;}
  .footlogo dt a{ background: url(../../assets/images/head.png) no-repeat;
    width: 136px;height: 44px;display: block;line-height: 0;font-size: 0;overflow: hidden;}
  .footlogo dt{padding-bottom: 10px;}
  .footlogo dl{padding: 0 20px;}
  #foot .footlogo{    width: 200px;}
  #foot i.line{   background: url(../../assets/images/foot.png) -495px -9px no-repeat;
    width: 1px;height: 157px;overflow: hidden;display: block;position: absolute;right: 0;top: 0;}
  #foot .item{position: relative;display: inline;min-height: 157px;float: left;}
  #foot .foot{width: 1200px;margin: 0 auto;padding-top: 40px;font-size: 13px; }
  #foot .topline{background: url(../../assets/images/foot.png) center 0 no-repeat #337fab;height: 4px;display: block;}

</style>
<script>

</script>

