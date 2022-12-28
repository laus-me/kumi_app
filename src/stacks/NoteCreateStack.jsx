import * as React from "react";

import NoteEditorScreen from "../screens/NoteEditorScreen";

export const optionNoteCreateStack = {
    title: "建立待辦事項"
};

export const NoteCreateStack = () => {
    return (
        <NoteEditorScreen currentItem={({})} />
    )
}
