import {configureStore} from "@reduxjs/toolkit";

import {homeRoot} from "./reducers/HomeRootReducer";

export const store = configureStore({
    reducer: {
        homeRoot,
    }
});
