import Vue from 'vue'
import Vuex from 'vuex'


import Login from './modules/Login/Login'
import doctorSettings from './modules/doctorSettings/doctorSettings'
import FilialSettings from './modules/FilialSettings/FilialSettings'
import DocSelect from './modules/DocSelect/DocSelect'
import Menu from './modules/Menu/Menu'
import JWT from './modules/JWT/JWT'
Vue.use(Vuex)



export default new Vuex.Store({
  modules: {
      Login,
      doctorSettings,
      FilialSettings,
      JWT,
      Menu,
      DocSelect,
  }
})
// window._ = require('lodash');
