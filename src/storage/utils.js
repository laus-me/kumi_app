import AsyncStorage from "@react-native-async-storage/async-storage";

const getStorageKey = (...keys) => keys.join("_")

export const newDataReader = (keyPrefix) => async (key) => {
    const storageKey = getStorageKey(keyPrefix, key);
    return JSON.parse(await AsyncStorage.getItem(storageKey));
};

export const newDataWriter = (keyPrefix) => (key, value) => {
    const storageKey = getStorageKey(keyPrefix, key);
    return AsyncStorage.setItem(storageKey, JSON.stringify(value));
};

export const newDataRemover = (keyPrefix) => (key) => {
    const storageKey = getStorageKey(keyPrefix, key);
    return AsyncStorage.removeItem(storageKey);
};

export const newDataHandlers = (keyPrefix) => ({
    read: newDataReader(keyPrefix),
    write: newDataWriter(keyPrefix),
    remove: newDataRemover(keyPrefix),
});
