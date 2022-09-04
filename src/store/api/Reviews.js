export default {
  async getTypes(store){
    return store.$http.get('api/reviews/reviewable-type');
  },


  async momentSave(store, id, data){
    return await store.$http.put('api/reviews/'+id, data);
  },


  async getReviews(store, getReviewsQuery){

    console.log(30)
    console.log(getReviewsQuery)
    console.log(store)
    let requestData = {};
    if(getReviewsQuery){
      requestData = {};
    }
    // let requestData = {
    //   component:state.component,
    //   limit:state.requestOptions.itemsPerPage,
    //   offset: (state.requestOptions.page * state.requestOptions.itemsPerPage) - state.requestOptions.itemsPerPage,
    //   requestOptions:state.requestOptions,
    // };


    return await store.$http.get('api/reviews', requestData );

  },

}
