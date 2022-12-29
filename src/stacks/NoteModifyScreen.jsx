import * as React from "react";

import NoteEditorScreen from "../screens/NoteEditorScreen";

export const optionNoteModifyStack = {
    title: "修改待辦事項"
};

export const NoteModifyStack = (props) => {
    const {
        route,
        navigation,
    } = props;

    const {currentItem} = route.params;

    console.log(currentItem);

    return (
        <NoteEditorScreen
            currentItem={currentItem}
            navigation={navigation}
        />
    )
}
