import * as React from "react";

import NoteViewerScreen from "../screens/NoteViewerScreen";

export const optionNoteViewStack = {
    title: "待辦事項",
};

export const NoteViewStack = (props) => {
    const {
        route,
        navigation,
    } = props;

    const {currentItem} = route.params;

    return (
        <NoteViewerScreen
            currentItem={currentItem}
            navigation={navigation}
        />
    );
};
