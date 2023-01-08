import * as React from "react";

import {AlertNotificationRoot} from "react-native-alert-notification";

import NoteEditorScreen from "../screens/NoteEditorScreen";

export const optionNoteModifyStack = {
    title: "修改待辦事項",
};

export const NoteModifyStack = (props) => {
    const {
        route,
        navigation,
    } = props;

    const {currentItem} = route.params;

    return (
        <AlertNotificationRoot>
            <NoteEditorScreen
                currentItem={currentItem}
                navigation={navigation}
            />
        </AlertNotificationRoot>
    );
};
