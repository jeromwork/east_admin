import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify' // path to vuetify export
//import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false

//Vue.use(Vuetify)


new Vue({
  store,
  //VueRouter,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')


