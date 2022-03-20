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
      console.log(options)
      if(!options.storeName || !options.component || !options.itemsName || !options.actionGet){
        throw new Error('Неправильный массив опций, для настройки модуля MultiTags.js');
      }

      state.serverSettings = { ...options };
      state.storeName = options.storeName;
    },
    SET_IDS(state, ids) {

      console.log('SET_IDS')
      console.log(ids)
      _.map(ids, (id) => {
        state.ids[id] = id;
      });

    },
    FILL_ISSET_VALUES(state, data){
      state.issetValues = data;

      console.log(state.issetValues)
    },
  },
//=============================================================
  actions:{
    //метод проверяет имеются ли в store ждущие информации ids
    async GET_INFO_ISSET_VALUES({state}){

      console.log(state)
      if(state.ids.length === 0){
        return;
      }



      // if(!state.ids[issetIdsObject.itemType] || !state.ids[issetIdsObject.itemType]['values']){
      //   throw new Error('Не заполнены values. Прежде чем запрашивать info для values, нужно задать уже имеющиеся ids в values');
      // }
      // _.map(issetIdsObject.values, (id) => {
      //   if(!state.ids[issetIdsObject.itemType]['values'][id]){
      //     throw new Error('Не заполнены values. Прежде чем запрашивать info для values, нужно задать уже имеющиеся ids в values');
      //   }
      // });

      let requestData = {
        action:  state.serverSettings.actionGet,
        component:state.serverSettings.component,
        //limit:state.requestOptions.itemsPerPage,
        //offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
        requestOptions:state.requestOptions,
        ids:state.ids
      };
      state.ids = [];
      console.log(requestData)

      this.$http.post(this.$http.CONNECTOR_URL, requestData )
          .then(response => {this.info = response
            if(!response.data || !response.data.items || !response.data.count)
            {
              console.log('Проверьте структуру данных Специальностей');
              return;
            }

             this.commit(state.storeName + '/FILL_ISSET_VALUES', response.data.items);
            // this.commit(state.id + '/SET_TOTAL_COUNT_ITEMS', response.data.count);
          });



    },
  },
//==========================================================

  getters: {
    getItems: (state ) => (values) => {
      // if(state.ids[issetIdsObject.itemType]['values']){
      //
      // }
      console.log('getItems')
      console.log(values)
      console.log(state.ids)

      return state.items;


      },

  },








}
