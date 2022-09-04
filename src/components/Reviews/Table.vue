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

      <template v-slot:item.reviewable_id="{ item }" >
        <v-chip
          :color="getColor(item.reviewable_id)"
          dark
        >
          {{ item.reviewable_id }}
        </v-chip>
      </template>


      <template v-slot:tableFields.actions="{ item }" >
        <actions-field
          :id="item.id"
          storeName="Reviews"
          deleteItem
          @removedItem="uploadItems()"
        />
      </template>



    </v-data-table>
    {{tableFields}}
  </div>

</template>

<script>


  // import ECheckbox from "../ECheckbox/ECheckbox";
  // import store from '../../store'
  // import MultiTags from "../../widgets/MultiTags/MultiTags";
  // import TextFieldAutoSave from "../TextFieldAutoSave/TextFieldAutoSave";
  // import Textarea from "@/widgets/Textarea/Textarea"
  import ActionsField from "@/widgets/ETable/ActionsField/ActionsField"
  // import Rating from "@/widgets/Rating/Rating"
  // import ESelect from "@/widgets/ESelect/ESelect";

  export default {
    name: "Table",
    components: {
      ActionsField
    },
    data: ()=>({
      search:'',
      showEditDialog:false,
      currentEditItem : {},
      refreshItems:[],
      storeName: '',
      fields:[],
      loading:false,
    }),

    created() {
      console.log('Reviews/init')
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
        return this.$store.getters["Reviews/getTotalCountItems"];
      },
      getTableHeadItems(){
        return this.fields;
      },
      items(){
        return this.$store.getters["Reviews/getItems"];
      },

    },
    methods:{
      getColor (calories) {
        if (calories > 100) return 'red'
        else if (calories > 50) return 'orange'
        else return 'green'
      },
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
      async getItems(){
        this.loading = true;
        await this.$store.dispatch('Reviews/GET_ITEMS');
        this.loading = false;
      },
      setOptions(options){
        console.log(options)
        // this.$store.commit(this.storeName + 'Reviews/SET_OPTIONS', options);
        // this.getItems();
      },
      uploadItems(){
        this.$store.dispatch('Reviews/GET_ITEMS');
      },
    },


  }
</script>
<style scoped>

</style>
