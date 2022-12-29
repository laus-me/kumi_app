const initialState = {
    isNoteModified: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_NOTE_MODIFIED":
            return {
                ...state,
                isNoteModified: action.payload.isNoteModified,
            };
        default:
            return state;
    }
};
