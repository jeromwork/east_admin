<template>
  <div>

    <v-row justify="center">
      <v-dialog
        v-model="confirmDialog"
        persistent
        max-width="480"
      >

        <template v-slot:activator="{ on: dialog, attrs }">

          <v-tooltip bottom
                     internal-activator
          :value="confirmDialog"
          >
            <template #activator="{ on: tooltip }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="{ ...tooltip, ...dialog }"
            elevation="2"
            icon
            outlined

          >
            <v-icon dark>
              mdi-delete-forever
            </v-icon>
          </v-btn>
              </template>
            <span>Удаление</span>
          </v-tooltip>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Подтвердите удаление
          </v-card-title>
          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="confirmDialog = false"
            >
              Отмена
            </v-btn>
            <v-btn
              color="red darken-1"
              text
              @click="removeItem"
            >
              Подтвердить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>

</template>

<script>
  //todo При клике на кнопку, появляется диалоговое окно, и после закрытия, не убирается подсветка кнопки и tooltip
    export default {
        name: "deleteItem",
      data:() =>({
        confirmDialog : false,
        dialog:false,
      }),
      methods:{
        removeItem(){

          this.confirmDialog = false;
          this.$emit('removeItem');
        },
      },
    }
</script>

<style scoped>

</style>
