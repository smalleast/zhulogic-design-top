import Vue from 'vue'
import ZhulogicDesignTop from './components/zhulogic-design-top.vue'


Vue.config.debug = true
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `<div>
  <ZhulogicDesignTop/>
  </div>`,
  components: { ZhulogicDesignTop}
})
