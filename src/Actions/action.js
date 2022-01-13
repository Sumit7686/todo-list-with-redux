export const addData = (data) => {
    // console.log('action data :::', data.value);
    return {
        type: "ADD_DATA",
        payload: data.value
    }
}

export const deleetData = (data) => {
    // console.log('action delete id :::', data);
    return {
        type: "DELETE_DATA",
        payload: data
    }
}

export const updateData = (item, id) => {
    // console.log('action update id :::', item, id);
    return {
        type: "UPDATE_DATA",
        payload: item,
        id
    }
}