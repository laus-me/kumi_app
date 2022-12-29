export const setNoteModified = (isNoteModified) => {
    return {
        type: "SET_NOTE_MODIFIED",
        payload: {isNoteModified}
    };
};

export const setPinNoteModified = (isPinNoteModified) => {
    return {
        type: "SET_PIN_NOTE_MODIFIED",
        payload: {isPinNoteModified}
    };
};
