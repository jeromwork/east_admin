<template>
    <div>

       <e-table
               :headers="getTableHeadItems"
               :items="specials"
               :server-items-length="getTotalCountItems"
               :table-options="eTableSettings"

       ></e-table>

      <v-data-table
        dense
        :headers="getTableHeadItems"
        :items="specials"
        item-key="id"
        :server-items-length="getTotalCountItems"
        @update:options="setOptions"
        :multi-sort="true"
        :fixed-header="true"
      >


      </v-data-table>

    </div>
</template>


<script>
     import ETable from "../../widgets/ETable/ETable";
    //import {mapGetters} from "vuex";
    //import ECheckbox from "../../widgets/ECheckbox/ECheckbox";

    export default {
        name: "SpecialsSettings",

        data: () => ({
          saveSettings:{
            component : 'health',
            item: 'specials'
          },
            eTableSettings:{
              component:'health',
                items:'specials',
                action:'getVue'
            },
            sl:true,
        }),
        components: {
             'e-table' : ETable,
          //'e-checkbox' : ECheckbox,
        },
        methods: {

          changeCheckbox(c, data, name ){
            console.log(data)
            console.log(c)
            console.log(name)

          },
            getSpecials(){
                this.$store.dispatch('SpecialsSettings/GET_SPECIALS');
            },
            setOptions(options){
              this.$store.commit('SpecialsSettings/SET_OPTIONS', options);
              this.getSpecials();
            },

          getColor (calories) {
            if (calories > 10001594) return 'red'
            else if (calories > 10001594) return 'orange'
            else return 'green'
          },


        },

        created(){

            //this.getSpecials();

        },
        computed:{


            specials:{
                get(){        //console.log(this);
                    //return this.currentDoctorId;
                    return this.$store.getters["SpecialsSettings/getSpecials"];
                    //return this.getStoreSpecials();
                },

            },
            getTableHeadItems:{
                get(){        //console.log(this);
                    //return this.currentDoctorId;
                    return this.$store.getters["SpecialsSettings/getTableHeadItems"];
                    //return this.getStoreSpecials();
                },
            },

            getTotalCountItems:{
                get(){
                    return this.$store.getters["SpecialsSettings/getTotalCountSpecials"];
                },
            },
        }
    }

</script>

<style scoped>

</style>
