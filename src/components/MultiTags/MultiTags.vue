<template>
<div>
    <v-autocomplete
            hide-selected
            multiple
            outlined
            small-chips
            :loading="loading"
            :value="tagsSelected"
            :disabled="disabled"
            :items="items"
            @focus="getItems"
            :deletable-chips="true"
            :auto-select-first="true"
            :search-input.sync="search"
            :menu-props="{ offsetY: true, }"
            :hide-no-data="true"
            :label="this.saveSettings.placeholder"
            item-text="name"
            item-value="id"
            v-on:change="onChange"
            @open="onOpen"
            :loader-height="5"
    ></v-autocomplete>
    </div>
</template>





<script>

    export default {

        name: 'MultiTags',

        props: {
            tagsSelected: {
                type: Array,
            },
            tag:{
                type: String,
            },
            saveSettings:{
                component : {type:String, required: true},
                item: {type:String, required: true},
                action:{type:String, },
                placeholder:{type: String, },
            },
        },

        components: {

        },
        data: () => ({
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

            // async search(val){
            //
            //     if(!val) {return;}
            //     const formData = new FormData();
            //     formData.append("action", this.action);
            //     formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
            //     formData.append("include_fields", JSON.stringify({'id':'value', 'fullname':'text'}));
            //     if(this.searchInput){
            //         formData.append("search", this.searchInput);
            //     }
            //
            //     formData.append("length", '1000');
            //     axios
            //         .post(this.urlConnector, formData)
            //         .then(response => {
            //             this.info = response;
            //
            //
            //             this.items = response.data.data;
            //             //console.log(this);
            //             //
            //         }).catch(error => console.log(error));
            // },
            // async GET_ITEMS(){
            //
            //     let qdata = {
            //         action: this.action,
            //         cors_key : '8cbd6a0c2e767862b02887a446bb34ca',
            //         tag:this.tag,
            //         include_fields : this.include_fields,
            //         length : 1000,
            //     };
            //     axios
            //
            //         .post(this.urlConnector, qdata)
            //         .then(response => {
            //
            //             if(Array.isArray(response.data.data)){
            //                 response.data.data.map((item) => {
            //                     this.items.push({text:item.text, value:item.value*1});
            //                 })
            //
            //
            //             }
            //             //this.items = response.data.data;
            //
            //
            //
            //             //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
            //         });
            // },
            onChange(value){
                //console.log(value);
                this.$emit('change-tags', value)
            },
            getItems(){
                if(this.items.length === 0){
                    this.items = [{name:'краниосакральная терапия', id:5},
                        {name:'краниосакральная терапия', id:6},
                        {name:'краниосакральная терапия', id:7},
                        {name:'краниосакральная терапия', id:85},
                        {name:'краниосакральная терапия', id:9},
                        {name:'краниосакральная терапия', id:60},
                        {name:'краниосакральная терапия', id:45},
                        {name:'краниосакральная терапия', id:46},
                        {name:'краниосакральная терапия', id:48},
                    ];
                    console.log('getItems')
                }else {

                    console.log('already Items')
                }

            },


        },
        updated() {
            this.selected = this.tagsSelected;
        },
        created(){

                         //this.GET_ITEMS();

        },
        watch: {
            search(val) {

                // Items have already been loaded
                if (this.items.length > 0) return
                console.log(val)

                // Items have already been requested
                if (this.isLoading) return

                this.isLoading = true

                return;
                // Lazily load input items
                // fetch('https://api.publicapis.org/entries')
                //     .then(res => res.json())
                //     .then(res => {
                //         const {count, entries} = res
                //         this.count = count
                //         this.entries = entries
                //     })
                //     .catch(err => {
                //         console.log(err)
                //     })
                //     .finally(() => (this.isLoading = false))
            },
        },
        computed:{

            listItems:{
                get(){


                    return [{name:'краниосакральная терапия', id:5},
                        {name:'краниосакральная терапия', id:6},
                        {name:'краниосакральная терапия', id:7},
                        {name:'краниосакральная терапия', id:85},
                        {name:'краниосакральная терапия', id:9},
                        {name:'краниосакральная терапия', id:60},
                        {name:'краниосакральная терапия', id:45},
                        {name:'краниосакральная терапия', id:46},
                        {name:'краниосакральная терапия', id:48},
                    ];
                },
                // set(val){        console.log(val);
                //     this.items = val;
                // },
            },
            // items:{
            //     get(){
            //         console.log(3434344);
            //         return [];
            //     }
            // }


        }


    }
</script>

<style scoped>

</style>
