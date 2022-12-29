import {configureStore} from "@reduxjs/toolkit";

import appRootReducer from "./reducers/AppRootReducer";
import noteReducer from "./reducers/NoteReducer";

export const store = configureStore({
    reducer: {
        appRoot: appRootReducer,
        note: noteReducer,
    }
});
