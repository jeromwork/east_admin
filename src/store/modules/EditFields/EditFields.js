//import store from "../../index";

export default  {
  namespaced:true,
  state: {

    editFieldsData : {},
  },
//===========================================================

  mutations: {
    SET_EDIT_FIELDS_DATA(state, accessData) {
      state.editFieldsData = accessData;
    },

  },
//=============================================================
  actions:{
    async getAccessData(){
      this.$http
        .get('api/edit-fields', )
        .then(response => {
          console.log(response)
          if( response?.data?.data ){
            return;
          }

          this.commit('Access/SET_ACCESS_DATA', response.data.data);
          //
        }).catch(error => console.log(error+'error'));
    },
  },
//==========================================================

  getters: {

    getFields : state => (name) =>{
      return state.editFieldsData[name];
    },

  },

}
