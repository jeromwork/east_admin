<template>
<div>
  <delete-item
  v-if="actionDelete"
  @removedItem="removedItem"
  :urlApi="urlApi"
  :item-id="item.id"
  />


  </div>
</template>

<script>
  import DeleteItem from '@/widgets/DeleteItem/DeleteItem';
    export default {
        name: "ActionsField",
      components:{
        'delete-item' : DeleteItem,
      },
      props:{
          item:{
            type:Object,
            required:true,
          },
        renderSettings:{
            type:Object,
          required:true,
        },
        urlApi:{
          type:String,
          required:true,
        },
      },
      data : () => ({

      }),
      computed:{
        actionDelete(){
          return (this.renderSettings.actions?.indexOf('d') > -1)
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
