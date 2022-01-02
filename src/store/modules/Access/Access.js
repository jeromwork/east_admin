import store from "../../index";

const Access = {
    namespaced:true,
    state: {
        accessData:[
            {
                value:0,
                text: '',
            }
        ],
    },
//===========================================================

    mutations: {
        SET_ACCESS_DATA(state, accessData) {
            console.log(accessData)
            //if(!Array.isArray(accessData)){console.log('необходимо передать массив');}
            state.accessData = accessData;
        },
    },
//=============================================================
    actions:{
        async getAccessData(){
            this.$http
                .post('remote/connector.php', { action:  'getAccessRules', component:'Access'  })
                .then(response => {this.info = response
                    //console.log(response.data);
                    if(response.data && response.data.ok === false){
                        return;
                    }

                    this.commit('Access/SET_ACCESS_DATA', response.data.data);
                    //
                }).catch(error => console.log(error+'error'));
        },
    },
//==========================================================

    getters: {
        access: state => (component) =>{
            return state.accessData[component];      },
    },

}




import Vue from 'vue'

import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://127.0.0.1:61523', {store})











// let ws = new WebSocket('ws://127.0.0.1:61523');
// ws.onmessage = response => {
//     //let positionData = JSON.parse(response.data);
//     console.log(response);
//
//
// }
 export default Access;