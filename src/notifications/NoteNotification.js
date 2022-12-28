import {
    AndroidNotificationPriority,
    scheduleNotificationAsync
} from 'expo-notifications';

export const create = () => {
    const schedulingOptions = {
        content: {
            title: 'This is a notification',
            body: 'This is the body',
            sound: true,
            priority: AndroidNotificationPriority.HIGH,
            color: 'blue',
        },
        trigger: {
            seconds: 10,
        },
    };
    console.info("Notification scheduled");
    return scheduleNotificationAsync(schedulingOptions);
};
