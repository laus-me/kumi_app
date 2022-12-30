import {
    AndroidNotificationPriority,
    scheduleNotificationAsync,
    cancelScheduledNotificationAsync,
} from "expo-notifications";

export const create = ({itemId, title, body, date}) => {
    const identifier = `note_${itemId}`;
    const content = {
        title,
        body,
        sound: true,
        color: "white",
        priority: AndroidNotificationPriority.HIGH,
    };
    const trigger = {date};
    console.info("Notification scheduled");
    return scheduleNotificationAsync({identifier, content, trigger});
};

export const cancel = (itemId) => {
    const identifier = `note_${itemId}`;
    return cancelScheduledNotificationAsync(identifier);
};
