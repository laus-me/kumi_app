export const setNoteModified = (isNoteModified) => {
    return {
        type: "SET_NOTE_MODIFIED",
        payload: {isNoteModified},
    };
};
