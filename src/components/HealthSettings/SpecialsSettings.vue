<template>

    <div>

        <e-table
               :serverSettings="specialsTableOptions"
               dense
               item-key="id"
               @editItem="editItem"
               :fields="eTableFields"
       ></e-table>


      <div>
        <e-edit :toogle="showEditDialog"
                @close="showEditDialog=false"
                :fields="eEditFields"
                :item="currentEditItem"
                :serverSettings="{component : 'health', itemType : 'specials', action : 'setVue'}"
        >
        </e-edit>
      </div>
    </div>
</template>


<script>
     import ETable from "../../widgets/ETable/ETable";
     import EEdit from "../../widgets/EEdit/EEdit";

    export default {
        name: "SpecialsSettings",
      components: {
        'e-edit' : EEdit,
        'e-table' : ETable,
      },
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
          showEditDialog:false,
          currentEditItem : {},



        }),

        methods: {
          editItem(e, item){
            this.showEditDialog = true
            this.currentEditItem = item;
          }
        },

        created(){

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
