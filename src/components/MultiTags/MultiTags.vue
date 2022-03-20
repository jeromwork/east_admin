<template>

    <v-autocomplete
            hide-selected
            multiple
            outlined
            small-chips
            :loading="loading"
            :value="value"
            :disabled="disabled"
            :items="items"
            @focus="getItems"
            :deletable-chips="true"
            :auto-select-first="true"
            :search-input.sync="search"
            :menu-props="{ offsetY: true, }"
            :hide-no-data="true"
            :label="label"
            item-text="name"
            item-value="id"
            @open="onOpen"
            :loader-height="10"
            :cache-items="true"
            @input="onInput"
    ></v-autocomplete>


</template>





<script>


    /*

    *
    * */
  import store from "../../store";
  import MultiTags from '../../store/modules/MultiTags/MultiTags'


  export default {

        name: 'MultiTags',
          props: {
            tagsSelected: {
                type: Array,
            },
            tag:{
                type: String,
            },
            value:{type: Array,},
            serverSettings:{
                component : {type:String, required: true},
                item: {type:String, required: true},
                action:{type:String, },
                placeholder:{type: String, },
                fields:{type:Array, },
              required:true,
            },
            item:{
                type: Object,
                required:true,
            },
          fieldSettins:{
            type: Object,
            required:true,
          },
          label:{type:String},
        },

        components: {

        },
        data: () => ({
            //value:[],
            values: [],
            items: [],
            select:[],
            info:{},
            searchInput:null,
            selected:{},
            loading:false,
            disabled:false,
            search: null,
            storeName:'',
            defaultValues:[],
        }),




        updated() {
            this.selected = this.tagsSelected;
            console.log('updated')
        },
          mounted() {
            //console.log(this.editedItem)

            console.log('mounted')

              this.$store.dispatch(`${this.storeName}/GET_INFO_ISSET_VALUES`);
          },

        created(){
          //при создании ВСЕХ multiTags собираются все Ids и сохраняются в объект в Store.
          //в mounted идет обращение на сервер, что бы выдали title тэгов по их ids.
          //затем, при каждом обращении к серверу, кэшируются titles, Для отображения тэгов
          //v-model multiTags, выдает массив ids, который можно уже сохранить на сервере

            this.initStoreModule();

          this.$store.commit(`${this.storeName}/SET_IDS`, this.getValues());
        },
        watch: {
            search(val) {
                this.getItems(val);
                // Items have already been loaded
                if (this.items.length > 0) return


                // Items have already been requested
                if (this.isLoading) return

                this.isLoading = true

                return;
            },

        },
        computed:{
            getItems2:{
                get(){
                    return this.$store.getters[`${this.storeName}/getItems`]({values:this.getValues()});
                },
            },
        },
      methods: {
            getValues(){
                if(this.item && this.item[this.serverSettings.itemsName]){
                    return this.item[this.serverSettings.itemsName];
                }
                return [];
            },
          initStoreModule(){
              //при запуске компонента, создается новый vuex модуль, с уникальным именем
              //соответственно мутации и комиты будут через это уникальное имя модуля
              this.storeName = `MultiTags_${this.serverSettings.itemsName}`;
              if(!store.hasModule(this.storeName)){
                  store.registerModule(this.storeName, {
                      ...MultiTags,
                      component: this.serverSettings.component,
                      namespaced: true,
                  });
              }
              this.$store.commit(this.storeName + '/SET_STORE_OPTIONS', {
                  itemsName:this.serverSettings.itemsName,
                  storeName:this.storeName,
                  actionGet:this.serverSettings.actionGet,
                  component:this.serverSettings.component,
              });

          },
          onInput(val){
              this.$emit('input', val);
          },
          onOpen(){
              console.log('onOpen')
          },
          async getItems(searchKey){
              searchKey = (searchKey) ? searchKey : '';
              //console.log(this.serverSettings)

              this.getItems2();
              let requestData = {
                  // action:  this.serverSettings.item + '/' + this.serverSettings.getAction,
                  action:  this.serverSettings.getTags,
                  component:this.serverSettings.component,
                  search:searchKey,
                  requestOptions:{
                      fields:(this.serverSettings.fields) ? this.serverSettings.fields : ['id', 'name'],

                  },
              };

              this.$http.post(this.$http.CONNECTOR_URL, requestData )
                  .then(response => {this.info = response
                      if(!response.data || !response.data.items || !response.data.count)
                      {
                          console.log('Проверьте структуру данных Специальностей');
                          return;
                      }
                      this.items = response.data.items;
                      return;

                  });
          },
          getItemType(){
                if(!this.serverSettings.itemsName || !this.serverSettings.component){
                    throw new Error('Неправильные настройки serverSettings для виджета MultiTags. Нет itemName или component')
                }
              return this.serverSettings.component + '_' +this.serverSettings.itemsName;
          },


      },


    }
</script>

<style scoped>

</style>
