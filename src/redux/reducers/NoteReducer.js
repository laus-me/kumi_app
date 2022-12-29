const initialState = {
    isNoteModified: false,
    isPinNoteModified: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_NOTE_MODIFIED":
            return {
                ...state,
                isNoteModified: action.payload.isNoteModified,
            };
        case "SET_PIN_NOTE_MODIFIED":
            return {
                ...state,
                isPinNoteModified: action.payload.isPinNoteModified,
            };
        default:
            return state;
    }
};
