<template>

    <v-autocomplete
            hide-selected
            multiple
            outlined
            small-chips
            v-model="values"
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
    ></v-autocomplete>


</template>





<script>


    /*

    *
    * */
    export default {

        name: 'MultiTags',

        props: {
            tagsSelected: {
                type: Array,
            },
            tag:{
                type: String,
            },
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
            value:[],
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

            onOpen(){
                console.log('onOpen')
            },
            async getItems(searchKey){
                searchKey = (searchKey) ? searchKey : '';
                //console.log(this.serverSettings)

                let requestData = {
                    action:  this.serverSettings.item + '/' + this.serverSettings.getAction,
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
        },
        render : () =>  {            return '<div>asdfasdf</div>';
        },
        created(){
            if(this.item && this.item[this.serverSettings.item]){
                //this.value = this.item[this.serverSettings.item];
                let defaultValues = this._.values(this.item[this.serverSettings.item])
                this.values = this._.map(defaultValues, function(item) {
                    //console.log(item)
                    let adapterItem = {};
                    if(item.title){
                        adapterItem.name = item.title;
                    }else if(item.name){
                        adapterItem.name = item.name;
                    }
                    adapterItem.id = item.id+'';
                    if(!adapterItem.name){
                        throw new Error('Неправильный адаптер, невозможно распарсить значения')
                    }
                    return adapterItem;
                });

                this.items = this.values;
                //this.values = [{id:22, name:'ttre'}];
                //console.log(this.values)
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
