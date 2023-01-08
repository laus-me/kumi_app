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
    dump,
} from "../storage";

import {
    getApiKey,
    getSyncKey,
    setApiKey,
    setSyncKey,
} from "../storage/ClientStorage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

export const optionSyncDataImportScreen = {
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

export const SyncDataImportScreen = () => {
    const [isInitialized, setInitialized] = useState(false);

    const [keyChain, setKeyChain] = useState("");

    useEffect(() => {
        getApiKey()
            .then((key) => setInitialized(!!key));
    }, []);

    const handlePressImport = async () => {
        if (!keyChain.length) {
            popAlertDanger("沒有同步金鑰鏈，我可是不會動的");
            return;
        }

        const oldApiKey = await getApiKey();
        const oldSyncKey = await getSyncKey();
        const oldData = await dump();

        try {
            await importKeyChain(keyChain);
        } catch (e) {
            popAlertDanger("這份同步金鑰鏈是假的啦");
            return;
        }

        await popAlertWarning("瑞凡，我們回不去了。我們曾經的回憶，正在被取代。");
        await clear();

        try {
            const dumpString = await download();
            await restore(dumpString, true);
            await reloadAsync();
        } catch (e) {
            popAlertDanger(
                e.message === "empty_data" ?
                    "可是，伺服器上這份同步金鑰鏈的資料是空的耶。消除記憶魔法已失效" :
                    "這是薛丁格的無效同步金鑰鏈。失憶魔法訴說著自己已經失效...",
            );
            await Promise.all([
                setApiKey(oldApiKey),
                setSyncKey(oldSyncKey),
                restore(oldData, false),
            ]);
        }
    };

    return (
        <AlertNotificationRoot>
            <StyledView className="container">
                <StyledView className="bg-white py-10 px-3">
                    <StyledView className="flex-auto w-full text-xs space-y-2 mb-3">
                        <InputBox
                            name="同步金鑰鏈"
                            placeholder="請告訴我那串很純的神奇魔法同步金鑰鏈"
                            value={keyChain}
                            setValue={setKeyChain}
                        />
                    </StyledView>
                    <StyledText className="font-semibold text-red-500 mb-3">
                        一按下開始匯入資料，若匯入成功，那麼目前尚未備份的資料將會被之前備份的取代掉，並不會相互合併。
                    </StyledText>
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
