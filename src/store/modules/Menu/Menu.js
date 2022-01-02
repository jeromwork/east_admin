
export default {
    namespaced:true,
    state: {
        menuItems: {//этот массив настроек должен приходить с сервера
            //а настраивать его может суперадминистратор здесь же в east_admin
            1: {    id: 1, title: 'Настройки докторов', href: '/doctor-settings', icon: 'mdi-file-account'},
            2: {    id: 2, title:    'Настройки филиалов', href:    '/filial-settings', icon:    'mdi-file-account'},
            3: {    id: 3, title:    'Настройка поиска докторов', href:    '/doc-select-settings', icon:    'mdi-file-account'},
            4: {    id: 4, title:    'Подбор доктора', href:    '/doc-select-use', icon:    'mdi-file-account'},
},


    },
//===========================================================

    mutations: {

    },
//=============================================================
    actions:{

    },
//==========================================================

    getters: {
        menu_items: (state, getters,rootState, rootGetters) =>  {
            let menuItems = [];
            let accessMenuItems = rootGetters['Access/access']('mainMenuItems');
            for (let id in accessMenuItems ){
                menuItems.push(state.menuItems[accessMenuItems[id]])
            }
            if(menuItems.length === 0){
                //console.log('Проверить, почему нет доступных пунктов меню для данного пользователя')
            }
            return menuItems;
        },


    },








}
