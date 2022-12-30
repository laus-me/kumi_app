import React, {useEffect, useState} from "react";

import {Button, Text, View, Share} from "react-native";
import {styled} from "nativewind";

import {
    upload,
    exportSyncKey,
    getLastSyncTimeString,
} from "../workers/sync";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(Button);

const SyncScreen = () => {
    const [lastSyncTimeString, setLastSyncTimeString] = useState("載入中...");

    useEffect(() => {
        getLastSyncTimeString()
            .then((i) => setLastSyncTimeString(i));
    }, []);

    const handlePressSyncNow = async () => {
        await upload();
    };

    const handlePressExportKeys = async () => {
        const message = await exportSyncKey();
        await Share.share({message});
    };

    const handlePressImportKeys = async () => {

    };

    return (
        <StyledView className="container justify-center items-center">
            <StyledView className="w-full py-10 bg-white mb-10">
                <StyledView className="mx-10">
                    <StyledButton
                        title="立即同步"
                        color="black"
                        onPress={handlePressSyncNow}
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
                        title="匯出同步金鑰"
                        onPress={handlePressExportKeys}
                    />
                </StyledView>
                <StyledView>
                    <StyledButton
                        title="匯入先前的同步金鑰"
                        color="gray"
                        onPress={handlePressImportKeys}
                    />
                </StyledView>
            </StyledView>
        </StyledView>
    );
};

export default SyncScreen;
