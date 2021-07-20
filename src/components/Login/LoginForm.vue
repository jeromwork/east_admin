<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                >
                    <v-icon>mdi-account-outline</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Введите данные для входа</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                        >
                            <v-row>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                >
                                    <v-text-field
                                            label="Логин"
                                            v-model="login"
                                            required
                                            :rules="[v => !!v || 'Обязательное поле']"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="6"
                                        md="6"
                                >
                                    <v-text-field
                                            v-model="password"
                                            label="Пароль"
                                            required
                                            :rules="[v => !!v || 'Обязательное поле']"
                                            type="password"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="serverSideError!= ''">
                                <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                >
                                    {{serverSideError}}
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                    >
                        Закрыть
                    </v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="doEnter"
                    >
                        Войти
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "LoginForm",
        props:{

        },
        data: () => ({
            dialog: false,
            login:'',
            password:'',
            valid: true,
            serverValid:true,
            serverErrorStr:'',

        }),
        computed:{
            serverSideError:{
                get(){
                    return this.serverErrorStr;
                },
                set(val){
                    this.serverErrorStr = val;
                },
            }

        },
        methods:{
            doEnter() {
                this.$refs.form.validate()
                if(this.login === '' || this.password === ''){
                    return false;
                }

                this.$store.commit('Login/DOENTER', {login: this.login, password: this.password, handError:this.serverError, ths:this, handOk:this.serverOk});
            },
            serverError : (error, ths) => {
                //console.log(error);
                //console.log(ths);
                //ths.dialog = true;
                ths.serverErrorStr = error;
            },
            serverOk(ths){
                ths.serverErrorStr = '';
                ths.dialog = false;
            }
        }
    }
</script>

<style scoped>

</style>