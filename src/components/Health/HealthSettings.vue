<template>
    <v-row>
        <v-col cols="6"
               sm="6"
               md="6">


            <v-card
                    elevation="8"
                    outlined
            >

                <v-card-text>

                    <ETable :headers="headers"
                            :items="getHealthData('specials')"

                    ></ETable>
                </v-card-text>
            </v-card>

        </v-col>
    </v-row>
</template>



<script>
    //забрать данные с сервера для health

    //сдалать динамическое создание окна созданияю/редактирования сущности
    //т.е. что бы не жестко кодировать какие поля показывать
    //а динамически передавать поля, в виде массива, с возможностью передавать
    //динамические компоненты - кастомные поля ввода

    //сохранение сущностей на сервере все время с хэшем, что бы операторы не перезаписывали друг друга
    //причем хэш должен прокидываться на сервер независимо от других данных, прозрачно, что бы не думать о нем

    //забрать специальности с сервера и загрузить в таблицу



    import ETable from "../../widgets/ETable/ETable";
    import {mapGetters} from "vuex";
    export default {


        name: 'FilialsSettings',

        props: {

        },
        components: {
          ETable,

        },
        data: () => ({
          headers: [
            { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name', },
            { text: 'Calories', value: 'calories' },
            { text: 'Fat (g)', value: 'fat' },
            { text: 'Carbs (g)', value: 'carbs' },
            { text: 'Protein (g)', value: 'protein' },
            { text: 'Iron (%)', value: 'iron' },
          ],
          eTableSettings:{     },
            valid2: true,
            valid: true,

            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
          ...mapGetters({
            getHealthDataItems:'HealthSettings/getHealthDataItems'
          }),

          getHealthData(type){
            if(!type){
              return [];
            }
            return this.getHealthDataItems(type);


              //
              //
              // return [];
              // if(type){
              //   let items = this.$store.dispatch('HealthSettings/GET_ITEMS', {type:type, limit:10});
              //   if(items ){
              //     return items;
              //   }else {
              //     return [];
              //   }
              //
              //
              // }else {
              //   return [];
              // }


              // return [
              //         {
              //             name: 'Frozen Yogurt',
              //             calories: 159,
              //             fat: 6.0,
              //             carbs: 24,
              //             protein: 4.0,
              //             iron: '1%',
              //         },
              //
              //     ];
            },
        },
        created(){
            //console.log('created');
          this.$store.dispatch('HealthSettings/GET_ITEMS', {type:'specials', limit:10});
        },

        computed:{
        }


    }
</script>

<style scoped>

</style>
