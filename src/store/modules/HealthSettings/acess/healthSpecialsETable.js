export default  {
    ETable_specials:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        id2 : { data : { text: 'id', align: 'start', value: 'id', },},
        name : { data : {text: 'Название', value: 'name',},},
        iid : { data : {text: 'iid', value: 'iid',  },},
        services : { data : {text: 'Подключенные услуги', value: 'services',  renderMultiTags:{component:'health', item:'services', getAction:'get', setAction:'set'},},},
        off : { data :  {text: 'Отключен', value: 'off', renderCheckbox:{component:'health', item:'specials', action:'set'},},},
    }

}
