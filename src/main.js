// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import moment from 'moment'
import store from '@/store/'
import mavonEditor from 'mavon-editor'//markdown
import '@/assets/css/common.css'
import 'mavon-editor/dist/css/index.css'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false;
Vue.use(mavonEditor);
Vue.use(VueLazyload);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


