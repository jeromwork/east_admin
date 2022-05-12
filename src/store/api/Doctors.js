export async function initStoreData(store, requestData){

  store.$http.get('api/doctors', requestData)
    .then(response => {
      console.log(response.data);
      if(response.data.data){
        store.commit('Doctors/FILL_ITEMS', response.data.data);
      }

    }).catch(error => console.log(error+'error'));
}
