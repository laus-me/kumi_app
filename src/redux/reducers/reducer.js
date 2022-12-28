const initialState = {
    username: "",
    password: "",
};

export const loggeduser = (state = initialState, action) => {
    switch (action.type) {
    case "LOGIN":
        return {
            username: action.payload.username,
            password: action.payload.password,
        };
    default:
        return state;
    }
};
