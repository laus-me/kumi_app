import SnowflakeId from "snowflake-id";

import {newDataHandlers} from "./index";

const {read, write} = newDataHandlers("note_storage");

const snowflake = new SnowflakeId();
const noteKey = "notes";

export const getAllNotes = () => {
    const data = read(noteKey);
    return data || {};
};

export const setNote = async (item) => {
    const prevState = await read(noteKey);
    const itemId = item.id || snowflake.generate();
    const state = {...prevState, [itemId]: item};
    await write(noteKey, state);
};

export const removeNote = async (itemId) => {
    const prevState = await read(noteKey);
    const state = prevState.filter((i) => i.id !== itemId);
    await write(noteKey, state);
};
