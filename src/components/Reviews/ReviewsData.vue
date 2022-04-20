<template>
  <div>

    <e-table
      urlApi="reviews"
      dense
      item-key="id"
      @editItem="editItem"
      :fields="eTableFields"

      :refreshItems="refreshItems"
      @refreshedItems="refreshItems=[]"
    ></e-table>


    <div>
    </div>
  </div>
</template>

<script>
  import ETable from "../../widgets/ETable/ETable";
  //import EEdit from "../../widgets/EEdit/EEdit";

  export default {
        name: "ReviewsData",
        components: {
          //'e-edit' : EEdit,
          'e-table' : ETable,
        },
        data: ()=>({
            items:{},
            showEditDialog:false,
            currentEditItem : {},
          refreshItems:[],
        }),

      created() {

      },
      computed:{
        eTableFields:{
          get(){
            return  this.$store.getters['Access/getAllowedFields']('ReviewsTable');
          },
        },
        eEditFields:{
          get(){
            return  this.$store.getters['Access/getAllowedFields']('ReviewsEdit');
          },
        },
      },
      methods:{
        editItem(e, item){
          this.showEditDialog = true
          this.currentEditItem = item;
        },
      },


    }
</script>

<style scoped>

</style>
