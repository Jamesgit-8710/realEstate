export const buildQuery = (data) => {
    let query = '?';

    if(data.area!==''){
        query+=`city=${data.area}`
    }

    if(query.length>1){
        query+='&'
    }

    if(data.propertyType!==''){
        query+=`property_type=${data.propertyType}`
    }

    return query;
}