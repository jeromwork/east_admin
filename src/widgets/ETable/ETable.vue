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
      <template
              v-for="header in getTableHeadItemsRenderCheckbox"
              v-slot:[`item.${header.value}`]="{ item }"
      >
        <e-checkbox
                :key="header.value"
                :item="item"
                :field="header.value"
                :saveSettings="saveSettings"
        >

        </e-checkbox>
      </template>

    </v-data-table>

  </div>

</template>

<script>
    import ECheckbox from "../ECheckbox/ECheckbox";

    export default {
      components: {
        'e-checkbox' : ECheckbox,
      },
        name: "ETable",
        props: {
          headers:{
            type: Array,
          },
          saveSettings:{
            component : String,
            item: String,
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
      computed:{
        getTableHeadItemsRenderCheckbox:{
          get(){
            console.log(this.headers)
            let headers = this._.filter(this.headers, function(h) {
              return h.renderCheckbox; });
            console.log(headers)
            return headers;
          },
        },
      },


    }
</script>

<style scoped>

</style>
