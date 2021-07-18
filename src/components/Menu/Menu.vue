<template>
    <v-list
            nav
            dense
    >
        <v-list-item-group
                active-class="deep-purple--text text--accent-4"
        >

            <router-link style="text-decoration: none; "
                         to='/'>
                <v-list-item color="purple" >
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        домашняя
                    </v-list-item-title>
                </v-list-item>
            </router-link>



            <router-link style="text-decoration: none; color: inherit;"
                         :to=item.href
            v-for="item in menu_items" :key="item.id"
            >
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        {{item.title}}
                    </v-list-item-title>
                </v-list-item>
            </router-link>


        </v-list-item-group>
    </v-list>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Menu",
        computed:{
            ...mapGetters({
                get_user_group:'Login/currentUserGroup',
            }),
            user_group : {
                get(){
                    return this.get_user_group;
                },
            },
            menu_items : {
                get(){
                    return this.$store.getters["Menu/menu_items"];
                },
            },
        },
        methods:{
            //menu_items(){}
        },

    }
</script>

<style scoped>

</style>