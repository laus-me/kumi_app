import AsyncStorage from "@react-native-async-storage/async-storage";

export const newDataReader = (keyPrefix) => (key) => {
    const storageKey = [keyPrefix, key].join("_");
    return JSON.parse(AsyncStorage.getItem(storageKey));
};

export const newDataWriter = (keyPrefix) => (key, value) => {
    const storageKey = [keyPrefix, key].join("_");
    return AsyncStorage.setItem(storageKey, JSON.stringify(value));
};

export const newDataRemover = (keyPrefix) => (key) => {
    const storageKey = [keyPrefix, key].join("_");
    return AsyncStorage.removeItem(storageKey);
};

export const newDataHandlers = (keyPrefix) => ({
    reader: newDataReader(keyPrefix),
    writer: newDataWriter(keyPrefix),
    remover: newDataRemover(keyPrefix),
});
