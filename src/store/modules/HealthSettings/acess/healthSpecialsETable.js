export default  {
    ETable_specials:{
        id :{ data : { text: 'id', align: 'start', value: 'id', }},
        id2 : { data : { text: 'id', align: 'start', value: 'id', },},
        name : { data : {text: 'Название', value: 'name',},},
        weight : { data : {text: 'Вес', value: 'weight',},},
        iid : { data : {text: 'iid', value: 'iid',  },},
        off : { data :  {text: 'Отключен', value: 'off', renderCheckbox:{component:'health', item:'specials', action:'set'},},},
    }

}
