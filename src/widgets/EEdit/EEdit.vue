<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >

      <v-card tile >
        <div>
          <v-toolbar

            flat
            dark
            color="purple"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-btn
              icon
              dark
              @click="Close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </div>
        <v-card-text>

          <v-form v-model="valid">
            <v-container fluid v-if="mapRowsCols.length > 0">


              <v-row  v-for="(row, index) in mapRowsCols" :key="index">

                <v-col
                  cols="12"
                  :md="field.render.col.md"
                  v-for="(field, index) in row" :key="index"
                >
                  <v-text-field
                    v-if="field.render.type==='text'"
                    v-model="editedItem[field.value]"
                    :counter="field.countSymbols"
                    :label="field.text"
                    required
                  ></v-text-field>

                  <multi-tags
                    v-if="field.render.type == 'multiTags'"
                    v-model="editedItem[field.value]"
                    :key="field.value"

                    :field="field.value"
                    :serverSettings="field.serverSettings"
                    :fieldSettins="field"
                    :label="field.text"
                  ></multi-tags>

                  <v-checkbox
                    v-if="field.render.type == 'checkbox'"
                    v-model="editedItem[field.value]"
                    true-value="1"
                    false-value="0"
                    :label="field.text"
                  ></v-checkbox>

                </v-col>

              </v-row>
            </v-container>
          </v-form>

          <v-divider></v-divider>


        </v-card-text>

      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="saveSuccess"
      right
    >
      {{lastMessageFromServer}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="saveSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>

    import MultiTags from "../../components/MultiTags/MultiTags";

    export default {
        name: "EEdit",
      components: {
        'multi-tags' : MultiTags,
      },
        props:{
          toogle:Boolean,
          fields:{  type:Array, required:true,  },
          item:{type: Object},
          serverSettings:{
            component:{  type:String, required:true,  },
            itemType:{  type:String, required:true,  },
            action:{  type:String, required:true,  },
            required:true,
          },


        },
      created() {

      },
        data:() => {
          return {
            dialog: false,



            notifications: false,
            sound: true,
            widgets: false,
            editedItem:{},
            editedItemJSON : '',


            valid: false,

            nameRules: [
              v => !!v || 'Name is required',
              v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],

            mapRowsCols : [],
            saveSuccess:false,
            lastMessageFromServer:'',
          }
        },

      methods:{
          Close(){
            if(JSON.stringify(this.editedItem) !== this.editedItemJSON){//если данные были изменены,
              if(confirm('Выйти без сохранения?')) {//нужно предложить их сохранить, либо выйти без сохранения
                this.editedItem = JSON.parse(this.editedItemJSON);
                this.$emit('close');
              }
            }else{
              this.editedItem = JSON.parse(this.editedItemJSON);
              this.$emit('close');
            }
          },
          save(e){


          this.$emit('close');


          this.saveSuccess = true
          if(!this.item.id){
            throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
          }


          let requestData = {
            action: this.serverSettings.actionSave,
            component: this.serverSettings.component,
            id:this.item.id,
          };

            console.log(this.serverSettings)

          //обходим настройки полей.
          //если видем у поля настройки сохранения, и таких настроек еще не было, формируем новый объект
          //если настройки уже были, значит добавляем данные для сохранения
          //отправляем данные для сохранения, только в том случае, если для такого поля была настройка рендеринга

            requestData['save'] = this.getSaveData(this.fields);

            console.log(requestData)


          console.log(requestData);
          this.$http.post(this.$http.CONNECTOR_URL, requestData )
            .then(response => {
              this.info = response
              if(response.data && response.data.ok){
                this.lastMessageFromServer = 'Сохранение прошло успешно!';
                this.$emit('save', e, this.item.id);
              }else{
                console.log('Проверьте структуру данных Специальностей');
                return;
              }

            });
        },
        getSaveData(fields){
          let saveFields = {};
          this._.map(fields, (field) => {
            if(field.serverSettings && field.serverSettings){
              let keyServerSettings = '';
              if(field.serverSettings.component) keyServerSettings += field.serverSettings.component;
              if(field.serverSettings.actionSave) keyServerSettings += field.serverSettings.setAction;

              if(field.value && this.editedItem[field.value] !== undefined){
                if(!saveFields[keyServerSettings]){
                  saveFields[keyServerSettings] = {
                    serverSettings : { actionSave:field.serverSettings.actionSave, component:field.serverSettings.component },
                    data: [{field : field.value, value: this.editedItem[field.value]}] };
                }else{
                  saveFields[keyServerSettings]['data'].push({field : field.value, value: this.editedItem[field.value]});
                }
              }
            }
          });
          return this._.values(saveFields);
        },

      },

      computed:{
      },
      watch:{
        item(item){
          this.editedItem = {...item};
          this.editedItemJSON = JSON.stringify(this.editedItem)
        },

        fields(fields){
          console.log(fields)

          this.mapRowsCols = {};



          //let cols = 12;
          //this.mapRowsCols.push([]);//сразу добавляем строку
          this._.map(fields, (field) => {
            //let currentNumberRow = Object.keys(this.mapRowsCols).length;
            if(field.render && field.render.rowNumber){
              if(!this.mapRowsCols[field.render.rowNumber]){
                this.mapRowsCols[field.render.rowNumber] = [];
              }
              this.mapRowsCols[field.render.rowNumber].push(field);

              //currentNumberRow = field.render.rowNumber;

            }
          });
          this.mapRowsCols = this._.values(this.mapRowsCols);
          console.log(this.mapRowsCols)
          if(this.mapRowsCols[0].length === 0){//если не нашли ни одного поля для рендерингка
            this.mapRowsCols = [];//тогда вообще ничего не надо рендерить
          }
        },

        toogle(toogle){
          if(toogle !== this.dialog){
            this.dialog = toogle;
          }
        },

      }
    }
</script>

<style scoped>

</style>
