import { PermissionStatus } from 'expo-modules-core';

import {
    requestPermissionsAsync,
} from 'expo-notifications';

export const request = async () => {
    const { status } = await requestPermissionsAsync();
    if (status === PermissionStatus.GRANTED) {
        console.info('Notification permissions granted.')
    }
    return status;
};
