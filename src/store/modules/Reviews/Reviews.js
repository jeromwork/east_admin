//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера

export default {
  namespaced:true,

  state: {
    component:'health', //компонент на сервере
    specials:[],
    limit: 10,
    offset:0,
    count:10,
    page:1,
    countOfPage:10,
    requestOptions:{page:1, itemsPerPage:10},
    reviews:[],
  },
  mutations:{
    FILL_REVIEWS(state, reviews){
      state.reviews = {...reviews};
    },
    SET_OPTIONS(state, options){
      console.log(options)
      state.requestOptions = options;
    },

    SET_TOTAL_COUNT_REVIEWS(state, count){
      state.count = count;
    },
    SET_PAGINATION_PAGE(state, page){
      state.page = page;
    },
    SET_OFFSET(state, offset){
      state.offset = offset;
    },
    SET_COUNT_OF_PAGE(state, count){
      state.limit = count;
    },
  },
  actions:{
    async getReviews({state}){

      let requestData = {
        action:  'specials/getVue',
        component:state.component,
        limit:state.requestOptions.itemsPerPage,
        offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
        requestOptions:state.requestOptions,
      };


      this.$http.get('api/reviews', requestData )
        .then(response => {this.info = response
          if(!response.data || !response.data.items || !response.data.count)
          {
            console.log('Проверьте структуру данных Специальностей');
            return;
          }

          this.commit('SpecialsSettings/FILL_REVIEWS', response.data.items);
          this.commit('SpecialsSettings/SET_TOTAL_COUNT_REVIEWS', response.data.count);
        });
    },
  },
  getters: {
    // getSpecials : state => {
    //   console.log('getSpecials')
    //   return state.specials;
    // },
    //
    getTableHeadItems: (state, getters,rootState, rootGetters) =>  {
      let headerItems = [];
      let accessItems = rootGetters['EditFields/access']('ReviewsSettings');
      if(accessItems && ETableFieldsSettings && ETableFieldsSettings['healthSpecialsSettings']){
        let healthSpecialsETable = ETableFieldsSettings['healthSpecialsSettings'];
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
    // getEditFields: (state, getters,rootState, rootGetters) => {
    //   let headerItems = [];
    //   let Access = rootGetters['Access/access'];//ссылка на метод выдающий объект доступа
    //   let accessItems = Access('healthSpecialsSettings');
    //   if(accessItems && EditFieldsSettings && EditFieldsSettings['healthSpecialsEditFields']){
    //     let healthSpecialsETable = EditFieldsSettings['healthSpecialsEditFields'];
    //     for (let id in healthSpecialsETable ){
    //       if(accessItems[id] &&  healthSpecialsETable[id]['data']){
    //         headerItems.push(healthSpecialsETable[id]['data'])
    //       }
    //
    //     }
    //
    //     if(headerItems.length === 0){
    //       //console.log('Проверить, почему нет доступных пунктов меню для данного пользователя')
    //     }
    //   }
    //   return headerItems;
    // },
    //
    // getTotalCountSpecials :state => {
    //   return state.count;
    // }

  },






}
