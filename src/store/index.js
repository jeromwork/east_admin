import Vue from 'vue'
import Vuex from 'vuex'


import Login from './modules/Login/Login'
import doctorSettings from './modules/doctorSettings/doctorSettings'
import FilialSettings from './modules/FilialSettings/FilialSettings'
import DocSelect from './modules/DocSelect/DocSelect'
import Menu from './modules/Menu/Menu'
import JWT from './modules/JWT/JWT'
import Access from './modules/Access/Access'

Vue.use(Vuex)



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
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        }
    },
    mutations:{
        SOCKET_ONOPEN (state, event)  {
            Vue.prototype.$socket = event.currentTarget
            state.socket.isConnected = true
        },
        SOCKET_ONCLOSE (state, event)  {
            state.socket.isConnected = false
            console.log(event)
        },
        SOCKET_ONERROR (state, event)  {
            console.error(state, event)
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE (state, message)  {
            console.log(message)
            state.socket.message = message
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count)
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
    }, actions: {
        sendMessage: function(context, message) {

            Vue.prototype.$socket.send(message)

        }
    }
})
// window._ = require('lodash');
