//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера
//import AccessMap from './acess/healthSpecialsETable'

//import AccessMap from "../HealthSettings/acess/healthSpecialsETable";

export default {
    namespaced:true,

    state: {
        component:'', //компонент на сервере
        id:'',
        itemsName:'',
        Items:[],
        limit: 10,
        offset:0,
        count:10,
        page:1,
        countOfPage:10,
        requestOptions:{page:1, itemsPerPage:10},
    },
    mutations:{

        SET_OPTIONS(state, options){
            state.requestOptions = options;
        },
        FILL_ITEMS(state, items){
            console.log('FILL_ITEMSETABLE')
            state.Items = items;
        },
        SET_TOTAL_COUNT_ITEMS(state, count){
            state.count = count;
        },
        SET_ETABLE_OPTIONS(state, options){
            if(!options.id || !options.component || !options.itemsName || !options.action){
                throw new Error('Неправильный массив опций, для настройки модуля ETable.js', 16);
            }
            state.id = options.id;
            state.component = options.component;
            state.itemsName = options.itemsName;
            state.action = options.action;
            console.log(state.id)
        },

    },
    actions:{
        async GET_ITEMS({state}){

            let requestData = {
                action:  state.itemsName + '/getVue',
                component:state.component,
                limit:state.requestOptions.itemsPerPage,
                offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
                requestOptions:state.requestOptions,
            };


            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                .then(response => {this.info = response
                    if(!response.data || !response.data.items || !response.data.count)
                    {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                    }

                    this.commit(state.id + '/FILL_ITEMS', response.data.items);
                    this.commit(state.id + '/SET_TOTAL_COUNT_ITEMS', response.data.count);
                });
        },
    },
    getters: {
        getItems : state => {
            console.log('etablegetItems')
            return state.Items;
        },
        getTotalCountItems :state => {
            return state.count;
        }
    },






}
