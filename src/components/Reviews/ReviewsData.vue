<template>
    <div>Reviews

      <e-table
        dense
        item-key="id"
        :fields="eTableFields"
      />



    </div>
</template>

<script>
    import ETable from "../../widgets/ETable/ETable";

    export default {
        name: "ReviewsData",
      components:{
        'e-table' : ETable,
      },
        data: ()=>({
            items:{},

        }),
      created() {

      },
      methods:{

      },
      computed:{
        eTableFields:{
          get(){
            return this.$store.getters["SpecialsSettings/getTableHeadItems"];
          },
        },
        eEditFields:{
          get(){
            return this.$store.getters["SpecialsSettings/getEditFields"];
          },
        },
      },


    }
</script>

<style scoped>

</style>
