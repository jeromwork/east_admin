//import store from "../../index";

const Access = {
    namespaced:true,
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        accessData:[
            {
                value:0,
                text: '',
            }
        ],
        socketData : {},
    },
//===========================================================

    mutations: {
        SET_ACCESS_DATA(state, accessData) {
            console.log(accessData)
            //if(!Array.isArray(accessData)){console.log('необходимо передать массив');}
            state.accessData = accessData;
        },
        INIT_WEB_SOCKET(state) {
            state.socket = new WebSocket('ws://127.0.0.1:61523');
            state.socket.onmessage = response => {
            console.log(this);
            this.commit('Access/SET_SOCKET_DATA', response);
            }
        },
        SET_SOCKET_DATA(state, response) {
            state.socketData = JSON.parse(response.data);
            console.log(this)
        },
    },
//=============================================================
    actions:{
        async getAccessData({getters, state}){
            console.log(state)
            console.log(getters)


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
        initWebSocket: function(context, message) {
            this.commit('Access/INIT_WEB_SOCKET');
            console.log(message)

        },
        sendToSocket: function(context, data){


            context.state.socket.send(JSON.stringify(data))
        }
    },
//==========================================================

    getters: {
        access: state => (component) =>{
            return state.accessData[component];      },
    },

}

//
// let ws = new WebSocket('ws://127.0.0.1:61523');
// ws.onmessage = response => {
//     let positionData = JSON.parse(response.data);
//     console.log(response);
//     unit.style.top = positionData.top;
//     unit.style.left = positionData.left;
//
// }




//import VueNativeSock from 'vue-native-websocket'

// Vue.use(VueNativeSock, 'ws://127.0.0.1:61523', {Access})









// let ws = new WebSocket('ws://127.0.0.1:61523');
// ws.onmessage = response => {
//     //let positionData = JSON.parse(response.data);
//     console.log(response);
//
//
// }
 export default Access;