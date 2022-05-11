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
          required:false,
        },
      },
      data : () => ({

      }),
      methods:{
        setRating(val){
          console.log(val)
        },
      },
    }
</script>

<style scoped>

</style>
