export default  {
  healthSpecialsSettings:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        id2 : { data : { text: 'id', align: 'start', value: 'id', },},
        name : { data : {text: 'Название', value: 'name',},},
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',
            serverSettings:{component:'health', item:'services', getAction:'getVue', setAction:'set'},
                render:{type:'multiTags', },},},
        off : { data : {text: 'Отключен', value: 'off',
            serverSettings:{component:'health', item:'specials', getAction:'getVue', setAction:'set'},
                render:{type:'checkbox', },},},
        //services : { data : {text: 'Подключенные услуги', value: 'services',  renderMultiTags:{component:'health', item:'services', getAction:'getVue', setAction:'set'},},},
        //off : { data :  {text: 'Отключен', value: 'off', renderCheckbox:{type:'multiTags',component:'health', item:'specials', action:'set'},},},
    }
}
