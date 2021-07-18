
export default {
    namespaced:true,
    state: {
        menuItems:{clinic_admin : [//этот массив настроек должен приходить с сервера
                //а настраивать его может суперадминистратор здесь же в east_admin
                {id: 1, title:'Настройки докторов', href:'/doctor-settings', icon : 'mdi-file-account'},
                {id: 2,title:'Настройки филиалов', href:'/filial-settings', icon : 'mdi-file-account'},
                {id: 3,title:'Настройка поиска докторов', href:'/doc-select-settings', icon : 'mdi-file-account'},
                {id: 4, title:'Подбор доктора', href:'/doc-select-use', icon : 'mdi-file-account'},],
            clinic_manager : [
                {id: 1, title:'Подбор доктора', href:'/doc-select-use', icon : 'mdi-file-account'},]
            },
        iservices_connector_url:(window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/login/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/login/connector.php',

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
            //console.log(rootGetters);
            if(!state.menuItems[rootGetters['Login/currentUserGroup']]){

                console.log('Нет настроек меню для группы пользователей' + rootGetters['Login/currentUserGroup']);
                return {};
            }
            return state.menuItems[rootGetters['Login/currentUserGroup']];
        },


    },








}
