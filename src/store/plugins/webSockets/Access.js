// export default  function AccessSocketPlugin(ws) {
//     //let ws = new WebSocket('ws://127.0.0.1:61523');
//     console.log(ws)
//     return store => {
//         ws.onmessage = response => {
//             console.log(response)
//             let positionData = JSON.parse(response.data);
//             console.log(positionData);
//         }
//         store.subscribe(mutation => {
//             console.log(mutation.type)
//             // if (mutation.type === 'UPDATE_DATA') {
//             //     socket.emit('update', mutation.payload);
//             // }
//         });
//     };
// }
//
// export  function webSocketAccess () {
//
//     // let ws = new WebSocket('ws://127.0.0.1:61523');
//     // ws.onmessage = response => {
//     //     console.log(response)
//     //     let positionData = JSON.parse(response.data);
//     //     console.log(positionData);
//     // }
//     return AccessSocketPlugin()
// }