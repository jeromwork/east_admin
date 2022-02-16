<template>
  <v-checkbox
    :input-value="(+item[field])"
    @change="saveData($event)"
  >

</v-checkbox>

</template>

<script>
    export default {
        name: "ECheckbox",
        props: {
            item:{
              id:Number,
            },
            field:String,
          saveSettings:{
            component : String,
            item: String,
          }


        },

      methods:{
          saveData(value){
            console.log(value)
            console.log(this.saveSettings)
          }
      },
    }
</script>

<style scoped>

</style>
