import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify' // path to vuetify export
//import VueRouter from 'vue-router'
import router from './router'
import Axios from 'axios'
import _ from 'lodash';
Object.defineProperty(Vue.prototype, '_', { value: _ });


Vue.config.productionTip = false
const $axios = Axios.create({
  //baseURL: (window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/login/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/remote/connector.php',
  // data: {
  //   firstName: 'Fred',
  //   jwt: localStorage.getItem('jwt')
  // }
});
if (localStorage.getItem('jwt')) {
  $axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt');
}
$axios.defaults.baseURL =  (window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/': 'http://dev.eastclinic.local/assets/components/eastclinic/';
$axios.defaults.method ="POST";
$axios.CONNECTOR_URL = 'remote/connector.php';

store.$http = $axios;

Vue.prototype.$http = $axios;

new Vue({
  store,
  //VueRouter,
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')


