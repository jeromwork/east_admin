<template>
    <div>
        <e-table :headers="getTableHeadItems"
                :items="getSpecials"
                 @pagination ="pagination"
                 :total="getTotalCountItems"
        ></e-table>
    </div>
</template>


<script>
    import ETable from "../../widgets/ETable/ETable";
    //import {mapGetters} from "vuex";

    export default {
        name: "SpecialsSettings",
        //
        data: () => ({
            totalDesserts : 100,
            headers: [
                { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name', },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },

            ],
            limit:10,
            eTableSettings:{     },
        }),
        components: {
            'e-table' : ETable,

        },
        methods: {
            pagination(pagination){
                //console.log(this.doctorSettings)
                console.log(2222)
                console.log(pagination)
            },

        },

        created(){

            this.$store.dispatch('SpecialsSettings/GET_SPECIALS');

        },
        computed:{


            getSpecials:{
                get(){        //console.log(this);
                    //return this.currentDoctorId;
                    return this.$store.getters["SpecialsSettings/getSpecials"];
                    //return this.getStoreSpecials();
                },
            },
            getTableHeadItems:{
                get(){        //console.log(this);
                    //return this.currentDoctorId;
                    return this.$store.getters["SpecialsSettings/getTableHeadItems"];
                    //return this.getStoreSpecials();
                },
            },

            getTotalCountItems:{
                get(){
                    return this.$store.getters["SpecialsSettings/getTotalCountSpecials"];
                },
            },
        }
    }

</script>

<style scoped>

</style>