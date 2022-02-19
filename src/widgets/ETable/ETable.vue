<template>
  <div >

    <v-data-table
      dense
      :headers="getTableHeadItems"
      :items="items"
      item-key="id"
      :server-items-length="getTotalCountItems"
      @update:options="setOptions"
    >
      <template
              v-for="header in getTableHeadItemsRenderCheckbox"
              v-slot:[`item.${header.value}`]="{ item }"
      >
        <e-checkbox
                :key="header.value"
                :item="item"
                :field="header.value"
                :saveSettings="header.renderCheckbox"
        >

        </e-checkbox>
      </template>

    </v-data-table>

  </div>

</template>

<script>
    import ECheckbox from "../ECheckbox/ECheckbox";
    import store from '../../store'
    import ETable from '../../store/modules/ETable/ETable'
    //const {state:  stateModule,getters, mutations} = ETable

    export default {
      components: {
        'e-checkbox' : ECheckbox,
      },
        name: "ETable",
        props: {
          saveSettings:{
            component : String,
            item: String,
          },
          options:{
            items:String,
            action:String,

          },
        },
        data: function () {return {
          storeName: '',

        };},
      created() {
        console.log('created')
        this.initStoreModule();
      },
      methods: {

        initStoreModule(){
          //при запуске компонента, создается новый vuex модуль, с уникальным именем
          //соответственно мутации и комиты будут через это уникальное имя модуля
          this.storeName = `ETable_${this.options.items}`;
          store.registerModule(this.storeName, {
            ...ETable,
            component:'specials',
            namespaced: true,
          });
          this.$store.commit(this.storeName + '/SET_ETABLE_OPTIONS', {
            itemsName:this.options.items,
            id:this.storeName,
            action:this.options.action,
            component:this.options.component,
          });

        },
        getItems(){
          this.$store.dispatch(this.storeName + '/GET_ITEMS');
        },
        setOptions(options){
          this.$store.commit(this.storeName + '/SET_OPTIONS', options);
          this.getItems();
        },


      },
      computed:{
        items:{
          get(){
            return this.$store.getters[this.storeName + "/getItems"];
          },
        },
        getTableHeadItems:{
          get(){
            return this.$store.getters[this.storeName + "/getTableHeadItems"];
          },
        },
        getTableHeadItemsRenderCheckbox:{
          get(){
            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.renderCheckbox; });
            return headers;
          },
        },
        getTotalCountItems:{
          get(){
            return this.$store.getters[this.storeName + "/getTotalCountItems"];
          },
        },




      },


    }
</script>

<style scoped>

</style>
