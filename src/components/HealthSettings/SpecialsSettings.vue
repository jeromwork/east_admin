<template>
    <div>

       <e-table
               :options="specialsTableOptions"
               dense
               item-key="id"
               @dblclick:row="dblclickRow"
               :fields="getFields"
       ></e-table>




    </div>
</template>


<script>
     import ETable from "../../widgets/ETable/ETable";

    export default {
        name: "SpecialsSettings",

        data: () => ({
          saveSettings:{
            component : 'health',
            item: 'specials'
          },
            specialsTableOptions:{
                component:'health',
                items:'specials',
                action:'getVue'
            },
            sl:true,
        }),
        components: {
             'e-table' : ETable,
        },
        methods: {
          dblclickRow(e, data){
            console.log(e)
            console.log(data)
          }
        },

        created(){

        },
        computed:{
          getFields:{
            get(){
              console.log(this.$store.getters["SpecialsSettings/getTableHeadItems"])
              return this.$store.getters["SpecialsSettings/getTableHeadItems"];
            },
          },
        },

    }

</script>

<style scoped>

</style>
