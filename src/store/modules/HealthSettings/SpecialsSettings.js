//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера
import AccessMap from './acess/healthSpecialsETable'

export default {
    namespaced:true,

    state: {
        component:'health', //компонент на сервере
        specials:[],
        limit: 10,
        count:10,
    },
    mutations:{
        FILL_SPECIALS(state, specials){
            console.log(specials)
            state.specials = specials;

        },


        SET_TOTAL_COUNT_SPECIALS(state, count){
            state.count = count;

        },
    },
    actions:{
        async GET_SPECIALS({state}){


            let requestData = {
                action:  'specials/getVue',
                component:state.component,
                limit:state.limit,
            };


            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                .then(response => {this.info = response
                    if(!response.data || !response.data.items || !response.data.count)
                    {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                    }

                    this.commit('SpecialsSettings/FILL_SPECIALS', response.data.items);
                    this.commit('SpecialsSettings/SET_TOTAL_COUNT_SPECIALS', response.data.count);
                });
        },
    },
    getters: {
        getSpecials : state => {
            return state.specials;
        },

        getTableHeadItems: (state, getters,rootState, rootGetters) =>  {
            let headerItems = [];
            let accessItems = rootGetters['Access/access']('healthSpecialsETable');
            if(accessItems && AccessMap && AccessMap['healthSpecialsETable']){
                let healthSpecialsETable = AccessMap['healthSpecialsETable'];
                for (let id in healthSpecialsETable ){
                    if(accessItems[id] && healthSpecialsETable[id]['data']){
                        headerItems.push(healthSpecialsETable[id]['data'])
                    }

                }

                if(headerItems.length === 0){
                    //console.log('Проверить, почему нет доступных пунктов меню для данного пользователя')
                }
            }
            return headerItems;
        },
        getTotalCountSpecials :state => {
            return state.count;
        }

    },






}
