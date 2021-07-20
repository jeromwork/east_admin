<template>
    <div class="panel panel-default">
        <div class="panel-collapse" >
            <div class="panel-body">


                <div class="j-wrapper j-wrapper-640">
                    <div class="j-content">

                        <div class="j-row">
                            <div class="j-unit">
                                <form action="" method="post" class="j-pro">
                                    <label class="j-input j-select">

                                        <select name="country" v-model="currentDoctorId">
                                            <option value selected>Выберите доктора</option>
                                            <option v-for="doctor in listDoctors" :key="doctor.doc__id" :value="doctor.doc__id">{{doctor.doc__fullname}}</option>
                                        </select>
                                        <i></i>
                                    </label>
                                    <br/>




                                </form>
                            </div>
                        </div>



                    </div>
                </div>


                <div class="card">
                    <div class="card-header">
                        <h5>{{doctorSettings.doc__fullname}}</h5>
                    </div>
                    <div class="card-body">
                        <form action="" method="post" enctype="multipart/form-data" @submit.prevent="onSaveDoctorData">
                            <div class="form-group row">
                                <div class="col-4">


                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fa fa-address-card"></i>
                                            </div>
                                        </div>
                                        <input placeholder="Фамилия" type="text" class="form-control" v-model="doctorSettings.doc__surname">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fa fa-address-card"></i>
                                            </div>
                                        </div>
                                        <input placeholder="Имя" type="text" class="form-control" v-model="doctorSettings.doc__name">
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">
                                                <i class="fa fa-address-card"></i>
                                            </div>
                                        </div>
                                        <input placeholder="Отчество" type="text" class="form-control" v-model="doctorSettings.doc__middlename">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-4">

                                    <div class="row">
                                        <label class="col-6">В отпуске</label>
                                        <div class="col-6">
                                            <toggle-button v-model="doctorSettings.doc__holiday"
                                                           :color="{checked: '#0946f7', unchecked: '#a7aded', disabled: '#CCCCCC'}"
                                                           :labels="{checked: 'Да', unchecked: 'Нет'}"/>
                                        </div>

                                    </div>

                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <label class="col-6">Работает с беременными</label>
                                        <div class="col-6">
                                            <toggle-button v-model="doctorSettings.doc__pregnant"
                                                           :color="{checked: '#0946f7', unchecked: '#a7aded', disabled: '#CCCCCC'}"
                                                           :labels="{checked: 'Да', unchecked: 'Нет'}"/>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row">
                                        <label class="col-6">Работает с детьми</label>
                                        <div class="col-6">
                                            <toggle-button v-model="doctorSettings.doc__child"
                                                           :color="{checked: '#0946f7', unchecked: '#a7aded', disabled: '#CCCCCC'}"
                                                           :labels="{checked: 'Да', unchecked: 'Нет'}"
                                                           />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-6">

                                    <multiselect
                                            v-model="selected"
                                            :options="options"
                                            :multiple="true"
                                            :close-on-select="true">
                                    </multiselect>
                                </div>
                                <div class="col-6">
                                    <div class="row">

                                    </div>
                                </div>

                            </div>




                            <div class="row">
                                <div class="col-6">

                                </div>
                                <div class="col-6">
                                    <button type="submit"  class="btn btn-primary">Сохранить</button>
                                    <button type="reset" class="btn btn-default m-r-20">Reset</button>
                                </div>




                            </div>
                        </form>


                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
    import { ToggleButton } from 'vue-js-toggle-button'
    import { mapGetters , mapMutations , mapState} from "vuex";
    //import Multiselect from '@vueform/multiselect'
    import Multiselect from 'vue-multiselect'


    export default {
        name: 'doctorSettings',

        props: {
            idDoctor:{
                type: Number,
                default: 2,
            }
        },
        components: {
            //accordion: () => import('./accordion.vue')
            Multiselect,
            ToggleButton,
        },
        data(){return{
            name: 'doctorSettings',
            selected:'',
            value: null,
            options: [
                'Batman',
                'Robin',
                'Joker',
            ],
            enabled: true
        }
        },
        created(){
            //console.log('created');
            this.$store.dispatch('doctorSettings/GET_DOCTORS_AJAX', {limit:10});
            // this.$store.commit('doctorSettings/CREATE_ROOM',
            //     {id:this.idDoctor,
            //         size1: 2000,
            //         size2: 3000,
            //         height: 2500
            //     });
            //console.log(this.idDoctor);
        },
        methods: {
            onSaveDoctorData(){
                //console.log(this.$refs.form);//забываем jquery. Здесь не нужно брать данные формы. Они храняться в data
                this.$store.dispatch('doctorSettings/SAVE_DOCTOR_SETTINGS_AJAX');
            }
        },
        computed:{
            //====================================================================
            ...mapGetters({getDoctors:'doctorSettings/getDoctors'
            //,currentDoctorId:'doctorSettings/currentDoctorId'
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
                    this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
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
            listDoctors(){                return this.getDoctors;                }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>

</style>
