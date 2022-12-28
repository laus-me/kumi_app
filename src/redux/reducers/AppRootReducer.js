const initialState = {
    isNotificationAllowed: null
};

export const appRoot = (state = initialState, action) => {
    switch (action.type) {
    case "SET_NOTIFICATION_ALLOWED":
        return {
            ...state,
            isNotificationAllowed: action.payload.isNotificationAllowed,
        };
    default:
        return state;
    }
};
