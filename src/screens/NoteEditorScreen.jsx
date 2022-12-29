import React, {useState} from "react"
import {useDispatch} from 'react-redux';

import dayjs from "dayjs";

import {setNoteModified} from '../redux/actions/NoteAction';

import {
    setNote,
    removeNote
} from "../storage/NoteStorage";

import {View, Text, TextInput, Button} from "react-native";
import {styled} from "nativewind";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import {
    CalendarIcon,
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

const InputBox = (props) => {
    const {name, placeholder, value, setValue} = props;
    return (
        <StyledView>
            <StyledText className="font-semibold text-gray-600 py-2">{name}</StyledText>
            <StyledTextInput
                placeholder={placeholder}
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 mt-2 px-4"
                defaultValue={value}
                onChangeText={setValue}
            />
        </StyledView>
    );
}

const DateSelector = (props) => {
    const {name, value, setValue} = props;
    return (
        <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
            <StyledText className="font-semibold text-gray-600 py-2">{name}</StyledText>
            <StyledView className="relative focus-within:text-gray-600 text-gray-400">
                <StyledTextInput
                    placeholder="2002/03/12 13:00"
                    className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    defaultValue={value}
                    onChangeText={setValue}
                />
                <StyledView className="absolute left-3 top-2">
                    <CalendarIcon className="w-6 h-6"/>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}

const Switcher = (props) => {
    const {
        name,
        value,
        setValue,
    } = props;

    const textStyle = {
        textDecorationLine: "none",
    };

    return (
        <BouncyCheckbox
            text={name}
            isChecked={value}
            onPress={setValue}
            textStyle={textStyle}
        />
    );
}

const TextBox = (props) => {
    const {name, placeholder, value, setValue} = props;
    return (
        <StyledView>
            <StyledText className="font-semibold text-gray-600 py-2">{name}</StyledText>
            <StyledTextInput
                multiline
                className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg mt-2 py-2 px-4"
                placeholder={placeholder}
                spellCheck="false"
                defaultValue={value}
                onChangeText={setValue}
            ></StyledTextInput>
            <StyledText className="text-xs text-gray-400 md:text-left my-3">
                你已經輸入了 {value?.length || "?"} 個字了
            </StyledText>
        </StyledView>
    )
}

const NoteEditorScreen = (props) => {
    const {
        currentItem,
        navigation: {
            navigate,
            goBack
        }
    } = props;

    const dispatch = useDispatch();

    const [warning, setWarning] = useState("");

    const {
        id: itemId,
    } = currentItem;

    const {
        title: cTitle,
        description: cDescription,
        isPinEnabled: cIsPinEnabled,
        isNotificationEnabled: cIsNotificationEnabled,
        notificationStart: cNotificationStart,
        notificationEnd: cNotificationEnd,
        createdTime,
        updatedTime,
    } = currentItem;

    const [title, setTitle] = useState(cTitle || "");
    const [isPinEnabled, setPinEnabled] = useState(cIsPinEnabled || false);
    const [isNotificationEnabled, setNotificationEnabled] = useState(cIsNotificationEnabled || false);
    const [notificationStart, setNotificationStart] = useState(cNotificationStart || "");
    const [notificationEnd, setNotificationEnd] = useState(cNotificationEnd || "");
    const [description, setDescription] = useState(cDescription || "");

    const collectInputItem = () => ({
        title,
        description,
        isPinEnabled,
        isNotificationEnabled,
        notificationStart,
        notificationEnd,
        createdTime,
        updatedTime,
    });

    const handleSave = () => {
        const item = collectInputItem();

        if (!item.title) {
            setWarning("標題為必填欄位");
            return;
        }

        if (item.isNotificationEnabled) {
            const start = dayjs(item.notificationStart, "YYYY/MM/DD HH:mm", true);
            if (!start.isValid()) {
                setWarning("開始提醒時間無效");
                return;
            }
            const end = dayjs(item.notificationEnd, "YYYY/MM/DD HH:mm", true);
            if (!end.isValid()) {
                setWarning("結束提醒時間無效");
                return;
            }
            if (end.isBefore(start)) {
                setWarning("結束提醒時間早於開始提醒時間");
                return;
            }
            item.notificationStart = start.format("YYYY/MM/DD HH:mm");
            item.notificationEnd = end.format("YYYY/MM/DD HH:mm");
        }

        setNote(item, itemId)
            .then(() => {
                dispatch(setNoteModified(true));
                navigate("HomeStack");
            })
            .catch((e) => console.error(e));
    };

    const handleDelete = () => {
        const {id: itemId} = currentItem;
        removeNote(itemId)
            .then(() => {
                dispatch(setNoteModified(true));
                navigate("HomeStack");
            })
            .catch((e) => console.error(e));
    };

    const handleCancel = () => {
        goBack();
    };

    return (
        <StyledView>
            <StyledView className="bg-white py-1 px-3 mb-5">
                {warning && (
                    <StyledText className="text-red-600 text-sm">
                        {warning}
                    </StyledText>
                )}
                <StyledView>
                    <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
                        <InputBox
                            name="標題"
                            placeholder="您想讓我提醒您些什麼？"
                            value={title}
                            setValue={setTitle}
                        />
                    </StyledView>
                    <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
                        <Switcher
                            name="啟用提醒"
                            value={isNotificationEnabled}
                            setValue={setNotificationEnabled}
                        />
                    </StyledView>
                    {isNotificationEnabled && (
                        <StyledView>
                            <DateSelector
                                name="開始提醒時間"
                                value={notificationStart}
                                setValue={setNotificationStart}
                            />
                            <DateSelector
                                name="結束提醒時間"
                                value={notificationEnd}
                                setValue={setNotificationEnd}
                            />
                        </StyledView>
                    )}
                    <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
                        <TextBox
                            name="備註"
                            placeholder="是因為什麼重要的人嗎？"
                            value={description}
                            setValue={setDescription}
                        />
                    </StyledView>
                    <StyledView className="flex-auto w-full mb-2 text-xs space-y-2">
                        <Switcher
                            name="成為板上釘釘"
                            value={isPinEnabled}
                            setValue={setPinEnabled}
                        />
                    </StyledView>
                </StyledView>
            </StyledView>
            <StyledView className="flex flex-row justify-around bg-white py-3 px-3">
                <StyledButton
                    title="取消"
                    color="gray"
                    onPress={handleCancel}
                />
                {
                    currentItem.id && (
                        <StyledButton
                            title="刪除"
                            color="red"
                            onPress={handleDelete}
                        />
                    )
                }
                <StyledButton
                    title="儲存"
                    color="black"
                    onPress={handleSave}
                />
            </StyledView>
        </StyledView>
    )
}

export default NoteEditorScreen;
