import SnowflakeId from "snowflake-id";

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

export const setNote = async (item, itemId = null) => {
    const prevState = await read(noteKey);
    itemId = itemId || snowflake.generate();
    const state = {...prevState, [itemId]: item};
    await write(noteKey, state);
};

export const removeNote = async (itemId) => {
    const prevState = await read(noteKey);
    const state = prevState.filter((i) => i.id !== itemId);
    await write(noteKey, state);
};
