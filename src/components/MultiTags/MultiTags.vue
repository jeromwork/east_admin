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
        }),



        methods: {

          onInput(val){
            console.log(val)
            // console.log(this.item[this.serverSettings.item])
            // console.log(this.items)
            // let inputItems = this._.map(this.items, (val) => {
            //
            //   if(val){return val}
            // });
            // console.log(inputItems)
            this.$emit('input', val);

          },
            onOpen(){
                console.log('onOpen')
            },
            async getItems(searchKey){
                searchKey = (searchKey) ? searchKey : '';
                //console.log(this.serverSettings)

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


        },
        updated() {
            this.selected = this.tagsSelected;
          console.log('updated')
        },
      mounted() {
        //console.log(this.editedItem)

        //console.log(this.fields)
        console.log('mounted')
      },

        created(){
          //при создании ВСЕХ multiTags собираются все Ids и сохраняются в объект в Store.
          //в mounted идет обращение на сервер, что бы выдали title тэгов по их ids.
          //затем, при каждом обращении к серверу, кэшируются titles, Для отображения тэгов
          //v-model multiTags, выдает массив ids, который можно уже сохранить на сервере

          if(!store.hasModule('MultiTags')){
            store.registerModule('MultiTags', {
              ...MultiTags,
            });
          }


          this.$store.commit('MultiTags/SET_IDS', {itemType:this.serverSettings.component + '_' +this.serverSettings.item, values:this.value});

          console.log('created')
          //console.log(this.item[this.serverSettings.item])

            if(this.item && this.item[this.serverSettings.item]){
                //this.value = this.item[this.serverSettings.item];
              this.items = this._.values(this.item[this.serverSettings.item])
              return;
                // let defaultValues = this._.values(this.item[this.serverSettings.item])
                // this.values = this._.map(defaultValues, function(item) {
                //     console.log(item)
                //     let adapterItem = {};
                //     if(item.title){
                //         adapterItem.name = item.title;
                //     }else if(item.name){
                //         adapterItem.name = item.name;
                //     }
                //     adapterItem.id = item.id+'';
                //     if(!adapterItem.name){
                //         throw new Error('Неправильный адаптер, невозможно распарсить значения')
                //     }
                //     return adapterItem;
                // });
                //
                // this.items = this.values;
            }

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

        }


    }
</script>

<style scoped>

</style>
