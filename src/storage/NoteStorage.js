import SnowflakeId from "snowflake-id";
import dayjs from "dayjs";

import {newDataHandlers} from "./index";

const {read, write} = newDataHandlers("note_storage");

const snowflake = new SnowflakeId();
const noteKey = "notes";

export const getAllNotes = async () => {
    const dataPrototype = await read(noteKey);
    return Object
        .entries(dataPrototype || {})
        .map((i) => ({id: i[0], ...i[1]}));
};

export const getAllPinNotes = async () => {
    const dataPrototype = await read(noteKey);
    return Object
        .entries(dataPrototype || {})
        .filter((i) => i[1].isPinEnabled)
        .map((i) => ({id: i[0], ...i[1]}));
};

export const setNote = async (item, itemId = null) => {
    const prevState = await read(noteKey);

    item.isResolved = item.isResolved || false;

    const currentTimeString = dayjs().format("YYYY/MM/DD HH:mm:ss")
    item.updatedTime = currentTimeString;
    item.createdTime = item.createdTime || currentTimeString;

    itemId = itemId || snowflake.generate();
    const state = {...prevState, [itemId]: item};
    await write(noteKey, state);
};

export const removeNote = async (itemId) => {
    const prevState = await read(noteKey);
    delete prevState[itemId];
    await write(noteKey, prevState);
};
