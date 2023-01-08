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
        await popAlertWarning("再見了，我曾深愛的他。正在完全清除記憶。");
        await clearAll();
        await reloadAsync();
    };

    return (
        <AlertNotificationRoot>
            <StyledView className="container">
                <StyledView className="bg-white py-10 px-3">
                    <StyledText className="font-semibold text-center text-red-500 py-2 mb-8">
                        按下「確定清除」後，目前的所有資料跟金鑰都會消失。
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
