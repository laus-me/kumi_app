import Constants from "expo-constants";

import axios from "axios";

import {
    getApiKey,
} from "../storage/ClientStorage";

const client = axios.create({
    baseURL: Constants.expoConfig.extra.apiBaseURL,
    timeout: 15_000,
});

client.interceptors.request.use(
    async (config) => {
        const apiKey = await getApiKey();
        config.headers.set("X-Kumi-Token", apiKey);
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    },
);

export const getClient = () =>
    client.get("/auth/client");

export const getSyncData = () =>
    client.get("/sync/data");

export const putSyncData = ({content}) =>
    client.put("/sync/data", {content});
