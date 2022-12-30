import * as React from "react";

import SyncScreen from "../screens/SyncScreen";

export const optionSyncStack = {
    title: "同步備份",
};

export const SyncStack = (props) => {
    const {
        navigation,
    } = props;

    return (
        <SyncScreen
            navigation={navigation}
        />
    );
};
