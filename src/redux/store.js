import {configureStore} from "@reduxjs/toolkit";

import {appRoot} from "./reducers/AppRootReducer";

export const store = configureStore({
    reducer: {
        appRoot,
    }
});
