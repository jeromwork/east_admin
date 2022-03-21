import _ from 'lodash';
export default {
  namespaced:true,
  state: {
    ids:{},
    items:[
      {
        value:0,
        text: 'fdef',
      }
    ],
    issetValues:[],
    storeName:'',
    serverSettings:{
      storeName:'',
      component:'',
      itemsName:'',
      actionGet:'',

    },
    requestOptions:{fields:['id', 'name']},
    selectItems:[],
  },
//===========================================================

  mutations: {
    SET_STORE_OPTIONS(state, options){
      if(!options.storeName || !options.component || !options.itemsName || !options.actionGet){
        throw new Error('Неправильный массив опций, для настройки модуля MultiTags.js');
      }
      state.serverSettings = { ...options };
      state.storeName = options.storeName;
    },
    SET_IDS(state, ids) {
      _.map(ids, (id) => {
        state.ids[id] = id;
      });

    },
    FILL_ISSET_VALUES(state, data){
      if(!Array.isArray(data) || !data[0]['id']){
        throw new Error('Неправильная структура данных с сервера. Должен быть массив и каждый элемент содержать поле id');
      }
      // _.map(data, (item) => {
      //   if(!state.issetValues[item.id]){
      //     state.issetValues[item.id] = item;
      //   }
      // });

      state.items = {...data, ...state.items};

      // console.log({...state.issetValues})
    },
  },
//=============================================================
  actions:{
    //метод проверяет имеются ли в store ждущие информации ids
    async GET_INFO_ISSET_VALUES({state}){


      if(Object.keys(state.ids).length === 0){
        return;
      }
      let requestData = {
        action:  state.serverSettings.actionGet,
        component:state.serverSettings.component,
        //limit:state.requestOptions.itemsPerPage,
        //offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
        requestOptions:state.requestOptions,
        ids:state.ids
      };
      state.ids = {};
      this.$http.post(this.$http.CONNECTOR_URL, requestData )
          .then(response => {this.info = response
            if(!response.data || !response.data.items || !response.data.count)
            {
              console.log('Проверьте структуру данных Специальностей');
              return;
            }
            //console.log(response.data.items)
             this.commit(state.storeName + '/FILL_ISSET_VALUES', response.data.items);
          });

    },
  },
//==========================================================

  getters: {
    getItems: (state )  => {
      console.log('multigetItems')
      console.log({...state.issetValues})
      return state.items;



      },

  },








}
