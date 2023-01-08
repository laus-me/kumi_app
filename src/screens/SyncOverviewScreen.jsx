import React, {useEffect, useState} from "react";

import {Button, Text, View, Share} from "react-native";
import {styled} from "nativewind";

import {
    upload,
    exportKeyChain,
    getLastSyncTimeString,
} from "../workers/sync";

import {
    ALERT_TYPE,
    Toast,
} from "react-native-alert-notification";

import {
    dump,
} from "../storage";

import {
    getApiKey,
} from "../storage/ClientStorage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

export const optionSyncOverviewScreen = {
    title: "總覽",
};

const popNoticeInfo = (title, textBody) => {
    Toast.show({
        autoClose: 5000,
        type: ALERT_TYPE.SUCCESS,
        title,
        textBody,
    });
};

const popNoticeError = (title, textBody) => {
    Toast.show({
        autoClose: 5000,
        type: ALERT_TYPE.DANGER,
        title,
        textBody,
    });
};

export const SyncOverviewScreen = (props) => {
    const {
        navigation,
    } = props;

    const [lastSyncTimeString, setLastSyncTimeString] = useState("載入中...");
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        getLastSyncTimeString()
            .then((i) => setLastSyncTimeString(i));
    }, []);

    useEffect(() => {
        getApiKey()
            .then((key) => setInitialized(!!key));
    }, []);

    const handlePressSyncNow = async () => {
        try {
            const dumpString = await dump();
            await upload(dumpString);
            const i = await getLastSyncTimeString();
            popNoticeInfo("同步成功", i);
            setLastSyncTimeString(i);
        } catch (e) {
            popNoticeError("同步失敗", "等一下再試試看吧...");
            console.error(e);
        }
    };

    const handlePressExportKeys = async () => {
        const message = await exportKeyChain();
        await Share.share({message});
    };

    const handlePressImportKeys = async () => {
        navigation.navigate("SyncDataImportScreen");
    };

    const handleResetData = async () => {
        navigation.navigate("SyncDataResetScreen");
    };

    return (
        <StyledView className="container justify-center items-center">
            <StyledView className="w-full py-10 bg-white mb-10">
                <StyledView className="mx-10">
                    <StyledButton
                        title="立即同步"
                        color="black"
                        onPress={handlePressSyncNow}
                        disabled={!isInitialized}
                    />
                </StyledView>
                <StyledView className="mt-5">
                    <StyledText className="text-center text-slate-600 text-lg">
                            上次同步時間： {lastSyncTimeString}
                    </StyledText>
                </StyledView>
            </StyledView>
            <StyledView className="border border-r-8 px-3 py-3 text-md">
                <StyledView className="pb-3">
                    <StyledButton
                        title="匯出同步金鑰鏈"
                        onPress={handlePressExportKeys}
                        disabled={!isInitialized}
                    />
                </StyledView>
                <StyledView className="pb-3">
                    <StyledButton
                        title="匯入先前的同步金鑰鏈"
                        color="gray"
                        onPress={handlePressImportKeys}
                        disabled={!isInitialized}
                    />
                </StyledView>
                <StyledView>
                    <StyledButton
                        title="重置 App 資料"
                        color="red"
                        onPress={handleResetData}
                    />
                </StyledView>
            </StyledView>
        </StyledView>
    );
};
