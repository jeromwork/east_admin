import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import DoctorSettings from '@/components/DoctorSettings/DoctorSettings'
import DocSelectSettings from '@/components/DocSelect/DocSelectSettings/DocSelectSettings'
import DocSelect from '@/components/DocSelect/DocSelectUse/DocSelect'
import FilialSettings from '@/components/FilialSettings/FilialSettings'
import HealthSettings from "../components/HealthSettings/HealthSettings";
import store from '@/store'


Vue.use(VueRouter)




const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },

        {
            path: '/login',
            component: Login
        },

        {
            path: '/doctor-settings',
            component: DoctorSettings,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/doc-select-settings',
            component: DocSelectSettings,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/doc-select-use',
            component: DocSelect,
            meta: {
                requiresAuth: true,
            },
        },

        {
            path: '/filial-settings',
            component: FilialSettings,
            meta: {
                requiresAuth: true,
            },
        },

      {
        path: '/health-settings',
        component: HealthSettings,
        meta: {
          requiresAuth: true,
        },
      },
    ],
});


const isAuthenticated = () => {  return !store.getters["Login/isAnonim"];};

router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta?.requiresAuth)) {

        if (isAuthenticated()) {
            //здесь же проверка на доступ к компоненту
            //console.log(store.getters["Login/currentUserGroup"])

            next();
        } else {
            next("/");
        }
    } else {
        next();
    }
});

export default router;
