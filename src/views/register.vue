<template>
  <div id="registerpage">
    <register-login></register-login>
  </div>
</template>
<script>
  import registerLogin from '@/components/public/registerlogin'
  import {post} from '@/server/'
  export default {
    components:{
      registerLogin
    },
    methods:{

    }
  }
</script>
<style>

</style>
