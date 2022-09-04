//Для таблицы нужны headers и items
//для получения хедеров, нужно выбрать только разрешенные поля из acess
//так же еще будут настройки какие поля отображать (потом можно будет вынести эти настройки в одтельный компонент)
//items нужно получать с сервера

import apiReviews from '@/store/api/Reviews'
import storeQuery from '../../queryBuilders/Reviews/store'
import getReviewsQuery from '../../queryBuilders/Reviews/api'

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
    getReviewsQuery:{},
  },
  mutations:{
    INIT(state){
      state.isInit = true;
      state.storyQuery = storeQuery;
      state.getReviewsQuery = getReviewsQuery;
    },
    FILL_REVIEWABLE_TYPES(state, types){
      state.reviewableTypes = types;
    },
    FILL(state, reviews){
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
      console.log('momentSave')
      if(!data.id){
        console.log('Не передан id')
      }
      let id = data.id;
      delete data.id;
      let response = await apiReviews.momentSave(this, id, data);
      if(response.data.data){
        store.commit('Reviews/FILL_REVIEWABLE_TYPES', response.data.data);
      }
    },

    async getReviews(store, getReviewsQuery){
      let response = await apiReviews.getReviews(this, getReviewsQuery);

      if(!response.data || !response.data.items || !response.data.count)
      {
        console.log('Проверьте структуру данных отзывов');
        return;
      }
      console.log(44444)
      this.commit('Reviews/FILL', response.data.items);
      this.commit('SpecialsSettings/SET_TOTAL_COUNT_SPECIALS', response.data.count);

    },

    async getTypes(store){
      let response = await apiReviews.getTypes(this);
      if(response.data.data){
        store.commit('Reviews/FILL_REVIEWABLE_TYPES', response.data.data);
      }
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
    },
    getTotalCountItems : state => {
      return state.count;
    }

  },






}
