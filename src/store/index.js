import Vue from 'vue'
import Vuex from 'vuex'


import Login from './modules/Login/Login'
import doctorSettings from './modules/doctorSettings/doctorSettings'
import FilialSettings from './modules/FilialSettings/FilialSettings'
import DocSelect from './modules/DocSelect/DocSelect'
import Menu from './modules/Menu/Menu'
import JWT from './modules/JWT/JWT'
import HealthSettings from "./modules/HealthSettings/HealthSettings";
import SpecialsSettings from "./modules/HealthSettings/SpecialsSettings";
import Reviews from "./modules/Reviews/Reviews";
import Access from './modules/Access/Access'
import Doctors from './modules/Doctors/Doctors'
//import AccessSocketPlugin from "./plugins/webSockets/Access";


Vue.use(Vuex)

//const APlugin = AccessSocketPlugin( new WebSocket('ws://127.0.0.1:61523'));

 const _store = new Vuex.Store({
  modules: {
      Login,
      doctorSettings,
      FilialSettings,
      JWT,
      Menu,
      DocSelect,
    SpecialsSettings,
      HealthSettings,
    Reviews,
      Access,
    Doctors,
  },
    //plugins:[APlugin]

});


export default _store;

// window._ = require('lodash');



