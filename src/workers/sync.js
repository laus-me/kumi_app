import {
    getRandomBytes
} from 'expo-random';

import dayjs from "dayjs";
import CryptoES from "crypto-es";

import {
    dump,
    restore
} from "../storage";

import {
    getApiKey,
    getSyncKey,
    getLastSyncTime, setLastSyncTime, setApiKey, setSyncKey
} from "../storage/ClientStorage";

import {
    getClient,
    getSyncData,
    putSyncData
} from "../clients/kumi";

const uint8arrayToString = (uint8Arr) => {
    return String.fromCharCode.apply(null, uint8Arr);
}

export const init = async () => {
    const {data: {secret: newApiKey}} = await getClient();
    const newSyncKey = uint8arrayToString(getRandomBytes(32));

    await setApiKey(newApiKey);
    await setSyncKey(newSyncKey);
};

export const upload = async () => {
    const syncKey = await getSyncKey();
    const dumpString = await dump();
    const chips = CryptoES.AES.encrypt(dumpString, syncKey).toString();
    await putSyncData({content: chips});
    await setLastSyncTime(dayjs().format("YYYY/MM/DD HH:mm:ss"));
};

export const download = async () => {
    const syncKey = await getSyncKey();
    const {content} = await getSyncData();
    const dumpString = CryptoES.AES.decrypt(content, syncKey);
    await restore(dumpString);
};

export const getLastSyncTimeString = async () => {
    return (await getLastSyncTime()) || "從未同步";
};

export const importSyncKey = async () => {
};

export const exportSyncKey = async () => {
    const apiKey = await getApiKey();
    const syncKey = await getSyncKey();

    return [apiKey, syncKey].join(";");
};
