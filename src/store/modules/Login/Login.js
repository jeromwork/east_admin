import router from '@/router'

export default {
    namespaced:true,
    state: {
        items:[
            {
                value:0,
                text: '',
            }
        ],
        current_user_group : 'clinic_admin',//текущую группу пользователь может выбирать сам
        //по этой группе сервер решает какие можно отдавать данные
        //по выбранной группе строится интерфейс, в частности app barы
        selectItems:[],
        userData:{},
        userAnonim:true,
        user_groups:[],
        iservices_connector_url:(window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/login/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/login/connector.php',

    },
//===========================================================

    mutations: {
        SET_USER_DATA(state, userData) {
            if(!Array.isArray(userData)){console.log('необходимо передать массив');}
            state.userData = userData;
            state.userAnonim = false;
            state.user_groups = ( userData.user_groups ) ? userData.user_groups : [];
        },
        DOENTER(state,loginData) {

            if(!loginData.login || !loginData.password){
                console.log('Неправильные данные для входа. Должен быть логин и пароль');
                return;
            }
            this.dispatch('Login/enterToSystem',loginData);
        },
        DOLOGOUT(state) {
            localStorage.removeItem('jwt');
            state.userAnonim = true;
            router.push('/');
        },

    },
//=============================================================
    actions:{
        async enterToSystem({state}, loginData){
            //console.log(loginData);
            let qdata = {
                action:  'login/login',
                username : loginData.login,
                component:'login',
                //'username': 'Ivanov_callcenter',
                password: loginData.password,
                'rememberme': 1,
                'login_context': 'web',
                //'jwt': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkZXYuZWFzdGNsaW5pYy5sb2NhbCIsImlhdCI6MTYyNDI4MDEyNCwiZXhwIjoxNjI0MjgzNzI0LCJhdWQiOiJkZXYuZWFzdGNsaW5pYy5sb2NhbCJ9.Vj98Suqo18jw7IOlEzITMOQ1x39WL9_53UrCgTDlROw5bF2IwNEjmK0d_Fyu1JCgEgKTs4qFpUepA8kpxeQD3g',
            };
            this.$http
                .post(this.$http.CONNECTOR_URL, qdata)
                .then(response => {this.info = response
                    //console.log(response.data);
                    if(response.data && response.data.ok === false){
                        loginData.handError(response.data.message, loginData.ths);
                        return;
                    }else if(response.data && response.data.ok === true){
                        loginData.handOk(loginData.ths);
                        if(response.data.jwt){
                            localStorage.setItem('jwt', response.data.jwt);
                            //this.commit('JWT/SETTOKEN', response.data.jwt);
                        }
                        state.userAnonim = false;

                    }


                    //
                }).catch(error => console.log(error+'error'));
        },
        async getUserData(){

            let qdata = {
                action:  'login/get_user_data',
                component:'login',
                //'username': 'Ivanov_callcenter',
                //'password': 'WPjsnaRB',
                //'rememberme': 1,
                //'login_context': 'web',
                //'jwt':  localStorage.getItem('jwt'),
            };
            // console.log(state);
            this.$http
                .post('remote/connector.php', qdata)
                .then(response => {this.info = response

                    //console.log(response.data);
                    if(response.data && response.data.ok === false){
                        return;
                    }
                    this.commit('Login/SET_USER_DATA', response.data.data);
                    //
                }).catch(error => console.log(error+'error'));
        },
    },
//==========================================================

    getters: {
        isAnonim: state => {        return state.userAnonim;      },
        currentUserGroup: state => {     return state.current_user_group;        },


    },








}
