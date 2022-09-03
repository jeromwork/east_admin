<template>
  <div>
    <v-data-table
      dense
      :headers="tableFields"
      :items="items"
      item-key="id"
      :multi-sort="true"
      :server-items-length="totalCountItems"
      @update:options="setOptions"
      @dblclick:row="dblclickRow"
      :loading="loading"
    >
      <template v-for="slotName in Object.keys($scopedSlots)"
                v-slot:[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope"></slot>
      </template>

    </v-data-table>
    <e-table
      urlApi="reviews"
      dense
      item-key="id"
      @editItem="editItem"
      :fields="eTableFields"
      :refreshItems="refreshItems"
      @refreshedItems="refreshItems=[]"

    >
      <template v-slot:top>
        <!--          В top нужно добавить кнопку создания сущности и панель фильтрации-->
        <v-btn
          elevation="2"
          raised
          @click="editItem($event, {})"
        >Новый отзыв</v-btn>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>

    </e-table>
  </div>

</template>

<script>
  import ETable from "../../widgets/ETable/ETable";

  // import ECheckbox from "../ECheckbox/ECheckbox";
  // import store from '../../store'
  // import MultiTags from "../../widgets/MultiTags/MultiTags";
  // import TextFieldAutoSave from "../TextFieldAutoSave/TextFieldAutoSave";
  // import Textarea from "@/widgets/Textarea/Textarea"
  // import ActionsField from "@/widgets/ETable/ActionsField/ActionsField"
  // import Rating from "@/widgets/Rating/Rating"
  // import ESelect from "@/widgets/ESelect/ESelect";

  export default {
    name: "Table",
    components: {
      'e-table' : ETable,
    },
    data: ()=>({
      items:[],
      search:'',
      showEditDialog:false,
      currentEditItem : {},
      refreshItems:[],
      storeName: '',
      fields:[],
      loading:false,
    }),

    created() {
      this.$store.dispatch('Reviews/init');//инициализируем reviews из store
      this.$store.dispatch('Doctors/init');//инициализируем doctors из store
    },
    computed:{
      eTableFields(){
        return  this.$store.getters['Access/getAllowedFields']('ReviewsTable');
      },
      eEditFields(){
        return  this.$store.getters['Access/accessRules']('ReviewsEdit');
      },
      tableFields(){
        return  this.$store.getters['Access/getAllowedFields']('ReviewsTable');
      },
      totalCountItems() {
        return this.$store.getters[this.storeName + "/getTotalCountItems"];
      },
      getTableHeadItems(){
        return this.fields;
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
      dblclickRow(e,row){
        this.$emit('editItem', e, row.item)
      },
      getItems(){
        this.loading = true;
        this.$store.dispatch(this.storeName + '/GET_ITEMS').then(() => {
          this.loading = false;
        });
      },
      setOptions(options){
        this.$store.commit(this.storeName + '/SET_OPTIONS', options);
        this.getItems();
      },

    },


  }
</script>
<style scoped>

</style>
