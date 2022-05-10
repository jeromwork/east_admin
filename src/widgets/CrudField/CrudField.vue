<template>
<div>
  <delete-item
  v-if="actionDelete"
  @removeItem="removeItem"
  />


  </div>
</template>

<script>
  import deleteItem from '@/widgets/deleteItem/deleteItem';
    export default {
        name: "CrudField",
      components:{
        'delete-item' : deleteItem,
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
      },
      data : () => ({

      }),
      computed:{
        actionDelete(){
          return (this.renderSettings.actions?.indexOf('d') > -1)
        },
      },
      methods:{
        removeItem(){
          console.log(';removeItem')
        }
      },



    }

</script>

<style scoped>

</style>
