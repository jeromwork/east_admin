export async function getTypes(store){

  store.$http.get('api/reviews/reviewable-type')
    .then(response => {
      console.log(response.data);
      if(response.data.data){
        store.commit('Reviews/FILL_REVIEWABLE_TYPES', response.data.data);
      }

    }).catch(error => console.log(error+'error'));
}
