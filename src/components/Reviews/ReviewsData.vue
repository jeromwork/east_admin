<template>
  <v-container fluid>
    <v-card>
      <!--Компоненту e-table передается только url а дальше он уже сам работает с сервером-->
      <reviews-table
        urlApi="reviews"
        item-key="id"
        @editItem="editItem"
      />

      <edit :toogle="showEditDialog"
              @close="showEditDialog=false"
              @save="savedItemUpdateDataTable"
              :fields="eEditFields"
              :item="currentEditItem"
              urlApi="reviews"
      />

    </v-card>
  </v-container>

</template>

<script>
  import ReviewsTable from "./Table";
  import Edit from "./Edit";
  export default {
        name: "ReviewsData",
        components: {
          'edit' : Edit,
          ReviewsTable,
        },
        data: ()=>({
            items:{},
          search:'',
          calories:'',
            showEditDialog:false,
            currentEditItem : {},
          refreshItems:[],
        }),

      created() {

      },
      computed:{
        eEditFields(){
          return  this.$store.getters['Access/accessRules']('ReviewsEdit');
        },
      },
      methods:{
        editItem(e, item){
          this.showEditDialog = true
          this.currentEditItem = item;
        },
        savedItemUpdateDataTable(id){
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
