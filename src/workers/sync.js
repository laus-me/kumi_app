import {
    getRandomBytes,
} from "expo-random";

import dayjs from "dayjs";
import CryptoES from "crypto-es";

import {
    getApiKey,
    getSyncKey,
    getLastSyncTime,
    setLastSyncTime,
    setApiKey,
    setSyncKey,
} from "../storage/ClientStorage";

import {
    getClient,
    getSyncData,
    putSyncData,
} from "../clients/kumi";

export const init = async () => {
    if (await getApiKey()) {
        return;
    }

    const {data: {secret: newApiKey}} = await getClient();
    const newSyncKey = String.fromCharCode.apply(
        null,
        getRandomBytes(32).map(
            (i) => 35 + (i % 90),
        ),
    );

    await setApiKey(newApiKey);
    await setSyncKey(newSyncKey);
};

export const upload = async (dumpString) => {
    const syncKey = await getSyncKey();
    const chips = CryptoES.AES.encrypt(dumpString, syncKey, {
        mode: CryptoES.mode.CBC,
        padding: CryptoES.pad.Pkcs7,
    });
    await putSyncData({content: chips.toString()});
    await setLastSyncTime(dayjs().format("YYYY/MM/DD HH:mm:ss"));
};

export const download = async () => {
    const syncKey = await getSyncKey();
    const {data: {content}} = await getSyncData();
    console.log(content);
    const chips = CryptoES.AES.decrypt(content, syncKey);
    return chips.toString(CryptoES.enc.Utf8);
};

export const getLastSyncTimeString = async () => {
    return (await getLastSyncTime()) || "從未同步";
};

export const importKeyChain = async (keyChain) => {
    const [apiKey, syncKey] = keyChain.split("!");

    if (!(apiKey && syncKey)) {
        return null;
    }

    await Promise.all([
        setApiKey(apiKey),
        setSyncKey(syncKey),
    ]);

    return apiKey, syncKey;
};

export const exportKeyChain = async () => {
    const apiKey = await getApiKey();
    const syncKey = await getSyncKey();

    return [apiKey, syncKey].join("!");
};
