export const setNotificationAllowed = (isNotificationAllowed) => {
    return {
        type: "SET_NOTIFICATION_ALLOWED",
        payload: {isNotificationAllowed}
    };
};
