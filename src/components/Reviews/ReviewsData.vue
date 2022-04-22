<template>
  <div>
<!--Компоненту e-table передается только url а дальше он уже сам работает с сервером-->
    <e-table
      urlApi="reviews"
      dense
      item-key="id"
      @editItem="editItem"
      :fields="eTableFields"
      :refreshItems="refreshItems"
      @refreshedItems="refreshItems=[]"
    ></e-table>

      <e-edit :toogle="showEditDialog"
              @close="showEditDialog=false"
              @save="savedItemUpdateDataTable"
              :fields="eEditFields"
              :item="currentEditItem"
              urlApi="reviews"
      >
      </e-edit>

  </div>
</template>

<script>
  import ETable from "../../widgets/ETable/ETable";
  import EEdit from "../../widgets/EEdit/EEdit";

  export default {
        name: "ReviewsData",
        components: {
          'e-edit' : EEdit,
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
            // let editFields = this.$store.getters['Access/getAllowedFields']('ReviewsEdit');
            // console.log(editFields)
            return  this.$store.getters['Access/getAllowedFields']('ReviewsEdit');
          },
        },
      },
      methods:{
        editItem(e, item){
          this.showEditDialog = true
          this.currentEditItem = item;
        },
        savedItemUpdateDataTable(e, id){
          //this.showEditDialog=false;
           console.log(id)
          //после сохранения сущности, обновляем с сервера только одну эту сущность
          this.refreshItems = [id];
        },
      },


    }
</script>

<style scoped>

</style>
