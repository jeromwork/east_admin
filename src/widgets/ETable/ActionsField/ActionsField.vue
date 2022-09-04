<template>
<div>
<!--  <delete-item-->
<!--  v-if="deleteItem"-->
<!--  @removedItem="removedItem"-->
<!--  :storeName="storeName"-->
<!--  :item-id="id"-->
<!--  />-->
  <template v-slot:item.actions="{ item }">
    <v-icon
      small
      class="mr-2"
      @click="editItem(item)"
    >
      mdi-pencil
    </v-icon>
    <v-icon
      small
      @click="deleteItem(item)"
    >
      mdi-delete
    </v-icon>
  </template>

  </div>
</template>

<script>
  //import DeleteItem from '@/widgets/DeleteItem/DeleteItem';
    export default {
        name: "ActionsField",
      components:{
        //'delete-item' : DeleteItem,
      },
      props:{
        id:{
            type:Number,
            required:true,
          },
        storeName:{
          type:String,
          required:true,
        },
        actions:{type:Array,
          required:false,},
        deleteItem:{
          type:Boolean,
          default:false,
        },
      },
      data : () => ({

      }),
      created() {

      },
      computed:{
        actionPublication(){
          return (this.actions?.indexOf('publication') > -1)
        },
      },
      methods:{
        removedItem(){
          this.$emit('removedItem');
          console.log(';removeItem')
        }
      },



    }

</script>

<style scoped>

</style>
