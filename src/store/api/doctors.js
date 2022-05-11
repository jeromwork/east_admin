export async function initStoreData(store){

  store.$http.get('api/doctors')
    .then(response => {
      console.log(response.data);
      if(response.data.data){
        store.commit('Doctors/FILL_ITEMS', response.data.data);
      }

    }).catch(error => console.log(error+'error'));
}
