<template>
  <div id="app">
    <main-menu></main-menu>
    <router-view></router-view>
    <!--底部-->
    <foot-section></foot-section>
    <float-login v-show="$store.state.userinfo.floatloginbar"></float-login>
  </div>
</template>

<script>
  import {get,post} from '@/server/'
  import footSection from '@/components/public/foot'
  import mainMenu from '@/components/public/mainmenu'
  import floatLogin from '@/components/public/floatlogin'
export default {
  name: 'App',

  components:{
    mainMenu,
    footSection,
    floatLogin,
  }
}
</script>

<style>
  #app {overflow-x: hidden;
    margin-top: 60px;}
</style>
