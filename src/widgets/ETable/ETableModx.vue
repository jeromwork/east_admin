<template>
  <div >

    <v-data-table
      dense
      :headers="getTableHeadItems"
      :items="items"
      item-key="id"
      :server-items-length="getTotalCountItems"
      @update:options="setOptions"
      @dblclick:row="dblclickRow"
    >


      <template
              v-for="header in getTableHeadItemsNeedRender"
              v-slot:[`item.${header.value}`]="{ item }"
      >
        <multi-tags
                v-if="header.render.type == 'multiTags'"
                v-model="item[header.serverSettings.itemsName]"

                :key="header.value"
                :field="header.value"
                :serverSettings="header.serverSettings"
                :fieldSettins="header"

        ></multi-tags>

        <e-checkbox
                v-if="header.render.type == 'checkbox'"
                :key="header.value"
                :item="item"
                :field="header.value"
                :serverSettings="header.serverSettings"
        ></e-checkbox>

      </template>

    </v-data-table>

  </div>

</template>

<script>
  /*
  *
  *       <template
              v-for="header in getTableHeadItemsRenderMultiTags"
              v-slot:[`item.${header.value}`]="{ item }"
      >

        {{`item.${header.value}`}}
        <multi-tags
                :key="header.value"
                :item="item"
                :field="header.value"
                :serverSettings="header.renderMultiTags"
        >

        </multi-tags>
      </template>
  * */


    import ECheckbox from "../ECheckbox/ECheckbox";
    import store from '../../store'
    import ETable from '../../store/modules/ETable/ETable'
    import MultiTags from "../../widgets/MultiTags/MultiTags";
    //const {state:  stateModule,getters, mutations} = ETable

    export default {
      components: {
        'e-checkbox' : ECheckbox,
        'multi-tags' : MultiTags,
      },
        name: "ETableModx",
        props: {
          saveSettings:{
            component : String,
            item: String,
          },
          serverSettings:{
            items:String,
            action:String,

          },
          fields:{type:Array, required: true},
          refreshItems:{type:Array},

        },
        data: function () {return {
          storeName: '',

        };},
      created() {
        this.initStoreModule();
      },
      methods: {

        initStoreModule(){
          //при запуске компонента, создается новый vuex модуль, с уникальным именем
          //соответственно мутации и комиты будут через это уникальное имя модуля
          this.storeName = `ETable_${this.serverSettings.items}`;
          store.registerModule(this.storeName, {
            ...ETable,
            component:'specials',
            namespaced: true,
          });
          this.$store.commit(this.storeName + '/SET_ETABLE_OPTIONS', {
            itemsName:this.serverSettings.items,
            id:this.storeName,
            action:this.serverSettings.action,
            component:this.serverSettings.component,
          });

        },
        getItems(){
          this.$store.dispatch(this.storeName + '/GET_ITEMS');
        },
        setOptions(options){
          this.$store.commit(this.storeName + '/SET_OPTIONS', options);
          this.getItems();
        },

        dblclickRow(e,row){
          this.$emit('editItem', e, row.item)
        }
      },
      computed:{


        items:{
          get(){
            return this.$store.getters[this.storeName + "/getItems"];
          },
        },
        getTableHeadItems:{
          get(){
            return this.fields;
            //return this.$store.getters[this.storeName + "/getTableHeadItems"];
          },
        },
        getTableHeadItemsRenderCheckbox:{
          get(){
            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.renderCheckbox; });
            //console.log(headers)
            return headers;
          },
        },
        getTableHeadItemsRenderMultiTags:{
          get(){

            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.renderMultiTags; });
            //console.log(headers)
            return headers;
          },
        },
        getTableHeadItemsNeedRender:{
          get(){
            let headers = this._.filter(this.getTableHeadItems, function(h) {
              return h.render; });
            return headers;
          },
        },
        getTotalCountItems:{
          get(){
            return this.$store.getters[this.storeName + "/getTotalCountItems"];
          },
        },
        refreshedItems:{
          get(){
            if(this.$store.getters[this.storeName + "/getRefreshedItems"].length === 0){
              this.$emit('refreshedItems');
            }
            return this.$store.getters[this.storeName + "/getRefreshedItems"];
          },
        },





      },
    watch:{
      fields(){
        console.log(this.fields)
      },
      refreshItems(){
        this.$store.commit(this.storeName + '/SET_REFRESH_ITEMS', this.refreshItems);
        this.$store.dispatch(this.storeName + '/GET_ITEMS');
      },
    },

    }
</script>

<style scoped>

</style>
