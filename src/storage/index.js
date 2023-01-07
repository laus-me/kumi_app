import AsyncStorage from "@react-native-async-storage/async-storage";

const getStorageKey = (...keys) => keys.join("_");

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

export const clearAll = () => AsyncStorage.clear();

export const clear = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const allDumpKeys = allKeys.filter(
        (i) => !i.startsWith("_"),
    );
    await AsyncStorage.multiRemove(allDumpKeys);
};

export const dump = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const allDumpKeys = allKeys.filter(
        (i) => !i.startsWith("_"),
    );
    const data = await AsyncStorage.multiGet(allDumpKeys);
    return JSON.stringify(data);
};

export const restore = async (dataJson) => {
    const data = JSON.parse(dataJson);
    return await Promise.all(data.map(
        ([i, j]) => AsyncStorage.setItem(i, j),
    ));
};
