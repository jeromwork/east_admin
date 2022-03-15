export default  {
  healthSpecialsEditFields:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        name : { data : {text: 'Название', value: 'name',render:{type:'text', col:{md:12}},},},
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',
                options:{component:'health', item:'services', getAction:'getVue', setAction:'set'},
                render:{type:'multiTags', col:{md:6}},},},
        off : { data : {text: 'Отключен', value: 'off',
                options:{component:'health', item:'specials', getAction:'getVue', setAction:'set'},
                render:{type:'checkbox', col:{md:6}},},},
    }

}
