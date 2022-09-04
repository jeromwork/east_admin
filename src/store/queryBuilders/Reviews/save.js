export default {
  data:{},
  id : 0,
  forItemWithId(id){
    if(!id || !Number.isInteger(id)){
      throw new Error('id должен быть целым положительным числом')
    }
    this.id = id;
    return this;
  },
  setField(field, val){
    if(!field){
      throw new Error('необходимо передать какие данные нужно сохранить')
    }
    let data = {}
    data[field] = val
    this.data = {...this.data, ...data}
    return this;
  },


}
