import Constants from "expo-constants";

import axios from "axios";

import {
    getApiKey,
} from "../storage/ClientStorage";

const client = axios.create({
    baseURL: Constants.expoConfig.extra.apiBaseURL,
    timeout: 5000,
    headers: {
        "X-Kumi-Token": getApiKey(),
    },
});

export const getClient = () =>
    client.get("/auth/client");

export const getSyncData = () =>
    client.get("/sync/data");

export const putSyncData = ({content}) =>
    client.put("/sync/data", {content});
