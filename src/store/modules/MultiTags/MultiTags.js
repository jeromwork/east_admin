
export default {
  namespaced:true,
  state: {
    ids:{},
    items:[
      {
        value:0,
        text: '',
      }
    ],
    selectItems:[],
  },
//===========================================================

  mutations: {
    SET_IDS(state, issetIdsObject) {
      if(!issetIdsObject.itemType){
        throw new Error('Неправильная структура ids для multiTags')
      }
      //state.ids = this._.intersection(state.ids, ids);
      console.log(issetIdsObject)
      if(!this.ids[issetIdsObject.itemType]){
        this.ids[issetIdsObject.itemType] = {};
      }else{
        this.ids[issetIdsObject.itemType] = {};
      }
      //state.ids.push(ids);
    },
  },
//=============================================================
  actions:{


  },
//==========================================================

  getters: {
    getList: state => {        return state.items;      },

  },








}
