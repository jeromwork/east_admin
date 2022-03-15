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
                @click="$emit('close')"
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
                    :model="editedItem[field.value]"
                    :counter="field.countSymbols"
                    :label="field.text"
                    required
                    :value="item[field.value]"
                  ></v-text-field>

                  <multi-tags
                    v-if="field.render.type == 'multiTags'"
                    :key="field.value"
                    :item="item"
                    :field="field.value"
                    :serverSettings="field.options"
                    :fieldSettins="field"
                    :label="field.text"
                  ></multi-tags>

                  <v-checkbox
                    v-if="field.render.type == 'checkbox'"
                    :model="editedItem[field.value]"
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
          item:{type: Object}
        },
        data:() => {
          return {
            dialog: false,

            notifications: false,
            sound: true,
            widgets: false,
            editedItem:{},


            valid: false,
            firstname: '',
            lastname: '',
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


          }
        },
      methods:{

      },
      mounted() {
        //console.log(this.fields)
      },
      computed:{
      },
      watch:{

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
