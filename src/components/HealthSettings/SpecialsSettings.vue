<template>
    <div>

       <e-table
               :options="specialsTableOptions"
               dense
               item-key="id"
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

        },

        created(){

        },
        computed:{

        },

    }

</script>

<style scoped>

</style>
