<template>
  <div >
    <v-data-table
      dense
      :headers="headers"
      :items="items"
      item-key="name"
      @pagination ="pagination"
      :server-items-length="total"
    ></v-data-table>
  </div>

</template>

<script>
    export default {
        name: "ETable",
        props: {
          headers:{
            type: Array,
          },
          items:Array,
          settings:Object,
          total:Number,

        },
        data: function () {return {


        };},
      created() {

      },
      methods: {
        pagination(pagination){
          this.$emit('pagination', pagination)
        },
      },


    }
</script>

<style scoped>

</style>
