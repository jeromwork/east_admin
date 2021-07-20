<template>
    <v-row>
        <v-col cols="12"
               sm="12"
               md="12">
            <v-card
                    elevation="8"
                    outlined
            >

                <v-card-text>
                    <v-form
                            ref="form"
                            lazy-validation
                    >
                        <v-row no-gutters >
                            <v-col cols="12"
                                   sm="12"
                                   md="12">
                                <v-select
                                        v-model="currentDoctorId"
                                        :items="listDoctors"
                                        label="Выберите филиал"
                                        @change="getFilialData"
                                ></v-select>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12"
               sm="12"
               md="12">
            <v-card
                    elevation="8"
                    outlined
            >
                <v-card-text>

                    <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                    >
                        <v-row no-gutters >
                            <v-col cols="12"
                                   sm="12"
                                   md="4">
                                <v-text-field
                                        class="pa-2"
                                        v-model="doctorSettings.doc__surname"
                                        :rules="nameRules"
                                        label="Фамилия"
                                        required
                                ></v-text-field>


                            </v-col>
                            <v-col cols="12"
                                   sm="12"
                                   md="4">
                                <v-text-field
                                        class="pa-2"
                                        v-model="doctorSettings.doc__name"
                                        label="Имя"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12"
                                   sm="12"
                                   md="4">
                                <v-text-field
                                        class="pa-2"
                                        v-model="doctorSettings.doc__middlename"
                                        label="Отчество"
                                ></v-text-field>
                            </v-col>

                        </v-row>



                        <v-row no-gutters >
                            <v-col cols="12"
                                   sm="12"
                                   md="12">

                                <MultiTags
                                        action="specials/get"
                                        connector="iservices"
                                        placeholder="Специальности доктора (из инфоклиники)"
                                        :include_fields="{iss_sp__id:'value', iss_sp__name:'text'}"
                                        @change-tags="SET_TAGS($event, ['iservices', 'doctors', 'iss_specials'])"
                                        :tagsSelected="tags('iservices', 'doctors', 'iss_specials' )"

                                        :disabled="true"
                                ></MultiTags>

                            </v-col>
                        </v-row>


                        <v-btn
                                color="success"
                                class="mr-4"
                                @click="onSaveDoctorData"
                        >
                            Сохранить
                        </v-btn>


                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters , mapMutations , mapState} from "vuex";
    import MultiTags from '../MultiTags/MultiTags';
    export default {


        name: 'FilialsSettings',

        props: {
            idDoctor:{
                type: Number,
                default: 2,
            }
        },
        components: {
            MultiTags
        },
        data: () => ({
            valid2: true,
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
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
            getFilialData () {
                //получить данные текущего доктора
                //id доктора уже передано в store
                this.$store.dispatch('FilialSettings/GET_FILIAL_SETTINGS_AJAX');
            },
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            SET_TAGS (e, group_map) {
                //console.log(e);
               //
                const arr_tags_ids = [];

                for (let tag_id in e) {
                    if (e[tag_id]) {
                        arr_tags_ids.push(e[tag_id])
                    }
                }
                this.$store.commit('doctorSettings/SET_DOCTOR_TAGS', {group_map:group_map, data:arr_tags_ids});
               // this.$refs.form.resetValidation()
            },
            onSaveDoctorData(){
                //console.log(this.$refs.form);//забываем jquery. Здесь не нужно брать данные формы. Они храняться в data
                this.$store.dispatch('doctorSettings/SAVE_DOCTOR_SETTINGS_AJAX');
            },
            tags(component, processor, group){
               // console.log(this.$store.getters["doctorSettings/tagsSelected"](component, processor, group));

                return  this.$store.getters["doctorSettings/tagsSelected"](component, processor, group);
                //
                //return this.$store.getters["doctorSettings/tagsSelected"](component, processor, group);
                //
                //return this.getChildAges();
                //return this.$store.getters["doctorSettings/tagsSelected"];
            },

        },
        created(){
            //console.log('created');
            this.$store.dispatch('doctorSettings/GET_DOCTORS_AJAX', {limit:10});

        },

        computed:{
            //====================================================================
            ...mapGetters({
                getDoctors:'doctorSettings/getDoctors'
                ,getChildAges:'doctorSettings/getArrChildAges'
                //,currentDoctorId:'doctorSettings/currentDoctorId'
                ,tagsSelected:'doctorSettings/tagsSelected'
            }),

            ...mapState({currentDoctorId:'doctorSettings/currentDoctorId'}),
            //====================================================================
            ...mapMutations({SET_CURRENT_DOCTOR_ID:'doctorSettings/SET_CURRENT_DOCTOR_ID'
                //,currentDoctorId:'doctorSettings/getDoctors'
            }),
            //====================================================================

            currentDoctorId:{
                get(){        //console.log(this);
                    //todo разобраться с mapGetters и mapState
                    //return this.currentDoctorId;
                    return this.$store.getters["doctorSettings/currentDoctorId"];
                },
                set(val){
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);

                },
            },
            doctorSettings:{
                get(){        //console.log(this);
                    return this.$store.getters["doctorSettings/doctorSettings"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },

            doctorSettings2:{
                get(){        //console.log(this);
                    return this.$store.getters["doctorSettings/doctorSettings"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },
            listDoctors(){                return this.getDoctors;                },
            listChildAges(){                return this.getChildAges;                }

        }


    }
</script>

<style scoped>

</style>
