<template>
  <v-rating
    @input="setRating"
    :value="value"
    hover
    length="5"
    half-increments
  ></v-rating>
</template>

<script>
    export default {
        name: "Rating",
      props:{
        value:{
          type:Number
        },
        momentSave:{
          type:Boolean,
          required:false,
        },
        dispatchStore:{
          type:Object
        },
        disabled:{
          type:Boolean
        },
        itemId:{
          type:Number
        },
        field:{
          type:String
        },
      },
      data : () => ({

      }),
      methods:{
        setRating(val){
          if(this.momentSave && this.dispatchStore.momentSave && this.itemId && this.field && this.dispatchStore.saveQuery){

            let saveQuery = this.$store.getters[this.dispatchStore.saveQuery];
            console.log(saveQuery.forItemWithId(this.itemId).setField(this.field, val))
            this.$store.dispatch(this.dispatchStore.momentSave, saveQuery);
          }
        },
      },
    }
</script>

<style scoped>

</style>
