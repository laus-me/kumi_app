import {newDataHandlers} from "./utils";

const keyPrefix = "note_storage";

const {
    reader,
    writer,
    remover,
} = newDataHandlers(keyPrefix);

const getCurrentIndex = () => {
    return 0;
};

export const addItem = async (item) => {
};

export const findItem = async (itemIndex) => {
};

export const removeItem = async (itemIndex) => {

};
