import Vue from 'vue'
import Vuex from 'vuex'


import Login from './modules/Login/Login'
import doctorSettings from './modules/doctorSettings/doctorSettings'
import FilialSettings from './modules/FilialSettings/FilialSettings'
import DocSelect from './modules/DocSelect/DocSelect'
import Menu from './modules/Menu/Menu'
import JWT from './modules/JWT/JWT'
import Access from './modules/Access/Access'
//import AccessSocketPlugin from "./plugins/webSockets/Access";

Vue.use(Vuex)

//const APlugin = AccessSocketPlugin( new WebSocket('ws://127.0.0.1:61523'));

export default new Vuex.Store({
  modules: {
      Login,
      doctorSettings,
      FilialSettings,
      JWT,
      Menu,
      DocSelect,
      Access,
  },
    //plugins:[APlugin]

})
// window._ = require('lodash');



