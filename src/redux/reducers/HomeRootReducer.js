const initialState = {
    title: ""
};

export const homeRoot = (state = initialState, action) => {
    switch (action.type) {
    case "SET_TITLE":
        return {
            ...state,
            title: action.payload.title,
        };
    default:
        return state;
    }
};
