import {initStoreData} from '@/store/api/Doctors.js'
//для сущностей store можно завести списки доступа, и отдавать доступные данные
export default {
  namespaced:true,
  state: () => ({
    doctors: {},
  }),
  mutations: {

    FILL_ITEMS(state, items) {
      items.forEach(function(item) {
        state.doctors[item.id*1] = item;
      });
    },
  },
  actions:{
    async init(){
      initStoreData(this, {itemsPerPage:1000});
    },
  },

  getters: {
  },








}
