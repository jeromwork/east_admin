<template>
  <div>
    <v-text-field
      v-if="item"
      :value="item[field]"
      @change="saveData($event)"
      :label="label"
    />
    <v-snackbar
      v-model="alert"
    >
      {{ alertText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="alert = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>

//
    export default {
        name: "TextFieldAutoSave",
        props: {
            item:{
              id:Number,
              required:true,
            },
          id:{},

          field:{type:String, required: true},
          serverSettings:{
            component : {type:String, required: true},
            item: {type:String, required: true},
            action:{type:String, required: true },
          },
          storeName:{type:String, required: true},

          label : String,


        },
      data:() =>({
        alertText:'',
        alert:false,
      }),


      methods:{
          async saveData(value){
            let data = {};
            data[this.field] = value;
            if(!this.item.id){
              throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
            }
            //сохраняем данные item через store
            await this.$store.dispatch(this.dispatchStore.momentSave, data);
            //ждем сохранения и оповещаем родителя о редактировании item
            this.$emit('momentSave',  this.item)
            //если store удачно сохранил или были ошибки, то это его забота оповестить пользователя

          }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>
