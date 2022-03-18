export default  {
  healthSpecialsEditFields:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        name : { data : {
              text: 'Название', value: 'name',
                render:{type:'text', col:{md:12}},
                serverSettings:{component:'health', actionSave:'specials/set', setAction:'set'},
          },
            },
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',
            serverSettings:{component:'health', item:'services', actionSave:'specials/set', getAction:'getVue', setAction:'set', getTags:'services/getVue'},
            render:{type:'multiTags', col:{md:6}},},
        },


        off : { data : {text: 'Отключен', value: 'off',
            serverSettings:{component:'health', actionSave:'specials/set', getAction:'getVue', setAction:'set'},
            render:{type:'checkbox', col:{md:6}},},
        },
    }

}
