import SnowflakeId from "snowflake-id";
import dayjs from "dayjs";

import {
    DATETIME_FORMAT,
} from "../const";

import {
    newDataHandlers,
} from "./index";

import {
    create as createNotification,
    cancel as cancelNotification,
} from "../notifications/NoteNotification";

const {read, write} = newDataHandlers("note");

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

export const setNote = async (item, itemId = null, isNotificationUpdated = false) => {
    const prevState = await read(noteKey);

    item.isResolved = item.isResolved || false;

    const currentTimeString = dayjs().format(DATETIME_FORMAT);
    item.updatedTime = currentTimeString;
    item.createdTime = item.createdTime || currentTimeString;

    if (isNotificationUpdated) {
        if (item.isNotificationEnabled && !item.isResolved) {
            await createNotification({
                itemId,
                title: item.title,
                body: item.description || "這裡是個號稱宇宙無敵非常重要的超級提醒！",
                date: new Date(item.notificationStart),
            });
        } else {
            await cancelNotification(itemId);
        }
    }

    itemId = itemId || snowflake.generate();
    const state = {...prevState, [itemId]: item};
    await write(noteKey, state);
};

export const removeNote = async (itemId) => {
    const prevState = await read(noteKey);
    await cancelNotification(itemId);
    delete prevState[itemId];
    await write(noteKey, prevState);
};
