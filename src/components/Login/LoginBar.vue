<template>
    <div>

        <LoginForm v-if="anonim" />
        <LogOut v-if="!anonim" />
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import LoginForm from '@/components/Login/LoginForm.vue'
    import LogOut from '@/components/Login/LogOut.vue'
    export default {
        name: "LoginBar",
        components: {
            LoginForm,
            LogOut,

        },
        computed:{
            ...mapGetters({
                isAnonim:'Login/isAnonim'
            }),
            anonim : {
                get(){
                    return this.isAnonim;
                },
            },
        },
    }
</script>

<style scoped>

</style>