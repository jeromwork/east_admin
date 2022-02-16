<template>
  <div >

    <v-data-table
      dense
      :headers="headers"
      :items="items"
      item-key="name"
      @pagination ="pagination"
      :server-items-length="total"
      @update:items-per-page="setItemsPerPage"
    >
      <slot name="item.iid='{ item }'"></slot>

    </v-data-table>

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
          handlers:Object,
        },
        data: function () {return {


        };},
      created() {

      },
      methods: {
        pagination(pagination){
          this.$emit('pagination', pagination)
        },
        setItemsPerPage(data){
          this.$emit('update:items-per-page', data)
        },
      },


    }
</script>

<style scoped>

</style>
