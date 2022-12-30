import {configureStore} from "@reduxjs/toolkit";

import noteReducer from "./reducers/NoteReducer";

export const store = configureStore({
    reducer: {
        note: noteReducer,
    }
});
