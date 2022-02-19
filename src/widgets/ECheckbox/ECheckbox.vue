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
          id:{},
            field:String,
          saveSettings:{
            component : {type:String, required: true},
            item: {type:String, required: true},
            action:{type:String, },
          }


        },

      methods:{
          saveData(value){
            console.log(value)
            console.log(this)
            let requestData = { action: this.saveSettings.item + '/' + this.saveSettings.action, component: this.saveSettings.component};
            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                    .then(response => {
                      this.info = response
                      if(!response.data || !response.data.items || !response.data.count)
                      {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                      }

                    });
          }
      },
    }
</script>

<style scoped>

</style>
