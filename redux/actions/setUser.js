export const setUser = (user) => {
    return {
        type: "LOGIN",
        payload: {
            username: user.name,
            password: user.password
        }
    }
}
