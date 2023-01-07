import React, {useEffect, useState} from "react";

import {
    reloadAsync,
} from "expo-updates";

import {View, Text, TextInput, Button} from "react-native";
import {styled} from "nativewind";

import {
    download,
    importKeyChain,
} from "../workers/sync";

import {
    ALERT_TYPE,
    Dialog,
    AlertNotificationRoot,
} from "react-native-alert-notification";

import {
    restore,
    clear,
} from "../storage";

import {
    getApiKey,
    setApiKey,
    setSyncKey,
} from "../storage/ClientStorage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export const optionSyncImportScreen = {
    title: "匯入",
};

const InputBox = (props) => {
    const {name, placeholder, value, setValue} = props;
    return (
        <StyledView>
            <StyledText className="font-semibold text-gray-600 py-2">{name}</StyledText>
            <StyledTextInput
                placeholder={placeholder}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 mt-2 px-4"
                defaultValue={value}
                onChangeText={setValue}
            />
        </StyledView>
    );
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

const popAlertDanger = (message) => {
    Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "錯誤",
        textBody: message,
        button: "關閉",
    });
};

export const SyncImportScreen = () => {
    const [isInitialized, setInitialized] = useState(false);

    const [keyChain, setKeyChain] = useState("");

    useEffect(() => {
        (async () => {
            const apiKey = await getApiKey();
            setInitialized(!!apiKey);
        })();
    }, []);

    const handlePressImport = async () => {
        if (!keyChain.length) {
            popAlertDanger("沒有同步金鑰，我可是不會動的");
            return;
        }

        await popAlertWarning("資料將會被清除");

        const state = await importKeyChain(keyChain);
        if (!state) {
            popAlertDanger("這份同步金鑰是假的啦");
            return;
        }
        const [oldApiKey, oldSyncKey] = state;

        await clear();

        let dumpString;
        try {
            dumpString = await download();
        } catch (e) {
            popAlertDanger("這是薛丁格的同步金鑰，大魔術師正在還原一切...");
            await setApiKey(oldApiKey);
            await setSyncKey(oldSyncKey);
            return;
        }
        if (!dumpString) {
            popAlertDanger("伺服器上沒有資料耶");
            return;
        }

        await restore(dumpString);
        await reloadAsync();
    };

    return (
        <AlertNotificationRoot>
            <StyledView className="container">
                <StyledView className="bg-white py-1 px-3 mb-5">
                    <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
                        <InputBox
                            name="同步金鑰鏈"
                            placeholder="請告訴我那串很純的神奇魔法同步金鑰"
                            value={keyChain}
                            setValue={setKeyChain}
                        />
                    </StyledView>
                    <StyledView className="mx-10">
                        <StyledButton
                            title="開始匯入"
                            color="black"
                            onPress={handlePressImport}
                            disabled={!isInitialized}
                        />
                    </StyledView>
                </StyledView>
            </StyledView>
        </AlertNotificationRoot>
    );
};
