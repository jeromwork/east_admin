//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера

import {getTypes, momentSave} from '@/store/api/Reviews'
import storeQuery from '../../queryBuilders/Reviews/store'
import apiQuery from '../../queryBuilders/Reviews/api'

export default {
  namespaced:true,

  state: {
    component:'health', //компонент на сервере
    reviews:[],
    limit: 10,
    offset:0,
    count:10,
    page:1,
    countOfPage:10,
    requestOptions:{page:1, itemsPerPage:10},
    reviewableTypes:[],
    isInit:false,   //true singleton!!
    storyQuery:{},
    apiQuery:{},
  },
  mutations:{
    INIT(state){
      state.isInit = true;
      state.storyQuery = storeQuery;
      state.apiQuery = apiQuery;
    },
    FILL_REVIEWABLE_TYPES(state, types){
      state.reviewableTypes = types;
    },
    FILL(state, reviews){
      console.log(1999000)
      console.log('FILL')
      state.reviews = reviews;
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
    init({state}){
        //однократно инициализируем store Reviews
      if(!state.isInit){
        this.commit('Reviews/INIT');
        this.dispatch('Reviews/getTypes');
        this.dispatch('Reviews/getReviews');

      }
    },
    async momentSave(store, data){
      if(!data.id){
        console.log('Не передан id')
      }
      let id = data.id;
      delete data.id;
      momentSave(this, id, data);
    },

    async getReviews({state}, apiQuery){
      console.log(apiQuery)
      let requestData = {
        action:  'reviews',
        component:state.component,
        limit:state.requestOptions.itemsPerPage,
        offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
        requestOptions:state.requestOptions,
      };


       let response = await this.$http.get('http://127.0.0.1:8000/api/reviews', requestData );

      if(!response.data || !response.data.items || !response.data.count)
      {
        console.log('Проверьте структуру данных Специальностей');
        return;
      }
      console.log(44444)
      this.commit('Reviews/FILL', response.data.items);
      this.commit('SpecialsSettings/SET_TOTAL_COUNT_SPECIALS', response.data.count);

    },
    async getTypes(){
      getTypes(this);
    },

  },
  getters: {
    count :state => {
      return state.count;
    },
    getReviewableTypes : (state) => {
      return state.reviewableTypes;
    },
    getItems : (state) => {
      return state.reviews;
    }

  },






}
