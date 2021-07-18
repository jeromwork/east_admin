<template>
  <v-app>

      <v-app-bar
              app
              color="primary"
              dark
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>
        <LoginBar/>
      </v-app-bar>

      <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
      >


      <Menu/>
      </v-navigation-drawer>

    <v-main>

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  //import DoctorSettings from './components/DoctorSettings/DoctorSettings'
  //import Login from './components/Login/Login'
  import LoginBar from './components/Login/LoginBar'
  import Menu from "./components/Menu/Menu";
export default {
  name: 'App',

  components: {
    Menu,
    //DoctorSettings,
    //Login,
    LoginBar,

  },
  created(){
    //делаем запрос прислать данные юзера - логин, имя список контактов и тд
    //если присылаются данные, ставим пометку, что юзер авторизован
    //console.log('created');
    this.$store.dispatch('Login/getUserData');
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
