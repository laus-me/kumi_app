import * as React from "react";

import {
    reloadAsync,
} from "expo-updates";

import {View, Text, Button} from "react-native";
import {styled} from "nativewind";

import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
} from "react-native-alert-notification";

import {
    clearAll,
} from "../storage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

export const optionSyncDataResetScreen = {
    title: "清除",
};

const popAlertWarning = (message) => new Promise((resolve) => {
    Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "警告",
        textBody: message,
        button: "確定",
        onPressButton: () => resolve(),
    });
});

export const SyncDataResetScreen = () => {
    const handlePresssSure = async () => {
        await popAlertWarning("再見了，愛人。App 資料將被完全清除。");
        await clearAll();
        await reloadAsync();
    };

    return (
        <AlertNotificationRoot>
            <StyledView className="container">
                <StyledView className="bg-white py-1 px-3 mb-5">
                    <StyledText className="font-semibold text-red-500 py-2">
                        一按下確定清除，目前的所有資料跟金鑰都會消失。
                    </StyledText>
                    <StyledView className="mx-10">
                        <StyledButton
                            title="確定清除"
                            color="black"
                            onPress={handlePresssSure}
                        />
                    </StyledView>
                </StyledView>
            </StyledView>
        </AlertNotificationRoot>
    );
};
