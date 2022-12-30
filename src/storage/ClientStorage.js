import {newDataHandlers} from "./index";

const {read, write} = newDataHandlers("_client");

export const getLastSyncTime = () => {
    return read("last_sync_time");
}

export const setLastSyncTime = (timestamp) => {
    return write("last_sync_time", timestamp);
}

export const getApiKey = () => {
    return read("api_key");
}

export const setApiKey = (key) => {
    return write("api_key", key);
}

export const getSyncKey = () => {
    return read("sync_key");
}

export const setSyncKey = (key) => {
    return write("sync_key", key);
}
