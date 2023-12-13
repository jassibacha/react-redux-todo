export const add = (todoData) => {
    return {
        type: 'ADD_TODO',
        payload: todoData,
    };
};

export const remove = (id) => {
    return {
        type: 'REMOVE_TODO',
        payload: id,
    };
};
