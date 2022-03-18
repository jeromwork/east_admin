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
              @click="$emit('close')"
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
                    :item="item"
                    :field="field.value"
                    :serverSettings="field.serverSettings"
                    :fieldSettins="field"
                    :label="field.text"
                    @input="minput"
                  ></multi-tags>

                  <v-checkbox
                    v-if="field.render.type == 'checkbox'"
                    v-model="editedItem[field.value]"
                    :input-value="field.value"
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
        data:() => {
          return {
            dialog: false,



            notifications: false,
            sound: true,
            widgets: false,
            editedItem:{},


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
        minput(val){

          // console.log(this.editedItem)
          console.log(val)
        },
        save(){

          console.log(this.serverSettings)
          this.lastMessageFromServer = 'Сохранение прошло успешно!';
          this.$emit('close');
          this.saveSuccess = true
          if(!this.item.id){
            throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
          }

           // let data = {};


          // data[this.field] = + value;
          let requestData = {
            action: this.serverSettings.actionSave,
            component: this.serverSettings.component,
            id:this.item.id,
            //data,
          };


          console.log(requestData)
          console.log(this.fields)
          console.log(this.editedItem)

          //обходим настройки полей.
          //если видем у поля настройки сохранения, и таких настроек еще не было, формируем новый объект
          //если настройки уже были, значит добавляем данные для сохранения
          //отправляем данные для сохранения, только в том случае, если для такого поля была настройка рендеринга

          let saveFields = {};
            this._.map(this.fields, (field) => {
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
          requestData['save'] = this._.map(saveFields, (settings) => {
            return settings;
          });



          // console.log(requestData);
          // this.$http.post(this.$http.CONNECTOR_URL, requestData )
          //   .then(response => {
          //     this.info = response
          //     if(!response.data || !response.data.items || !response.data.count)
          //     {
          //       console.log('Проверьте структуру данных Специальностей');
          //       return;
          //     }
          //
          //   });
        },
      },

      computed:{
      },
      watch:{
        item(item){
          console.log(item)
          this.editedItem = {...item};
        },

        fields(fields){
          let cols = 12;
          this.mapRowsCols.push([]);//сразу добавляем строку
          this._.map(fields, (field) => {
            if(field.render && field.render.col){
              let lastIndexRowsArray = (this.mapRowsCols.length - 1 < 0 ) ? 0 : this.mapRowsCols.length - 1;
              cols -= field.render.col;
              if( cols  === 0 ) {
                this.mapRowsCols[lastIndexRowsArray].push(field);
                this.mapRowsCols.push([]);
                cols = 12;
              }else if (cols < 0){
                this.mapRowsCols.push([field]);
                cols = 12;
              }
              else {
                if(this.mapRowsCols.length - 1 > -1){
                  this.mapRowsCols[lastIndexRowsArray].push(field);
                }
              }
            }
          });
          if(this.mapRowsCols[0].length === 0){//если не нашли ни одного поля для рендерингка
            this.mapRowsCols = [];//тогда вообще ничего не надо рендерить
          }
        },
        toogle(toogle){
          console.log('toogle')
          if(toogle !== this.dialog){
            this.dialog = toogle;
          }

            console.log(this.dialog)
          console.log(toogle)
          },

      }
    }
</script>

<style scoped>

</style>
