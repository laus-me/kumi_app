import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {setNoteModified} from "../redux/actions/NoteAction";

import {Button, Text, TouchableOpacity, View} from "react-native";
import {styled} from "nativewind";

import {setNote} from "../storage/NoteStorage";

import {CheckCircleIcon, QuestionMarkCircleIcon,} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledButton = styled(Button);

const NoteViewerScreen = (props) => {
    const dispatch = useDispatch();

    const {
        currentItem,
        navigation: {
            navigate,
            goBack
        }
    } = props;

    const {
        id: itemId
    } = currentItem;

    const {
        title,
        description,
        isResolved: cIsResolved,
        isPinEnabled,
        isNotificationEnabled,
        notificationStart,
        notificationEnd,
        createdTime,
        updatedTime,
    } = currentItem;

    const [isResolved, setResolved] = useState(cIsResolved);

    const collectInputItem = () => ({
        title,
        description,
        isResolved,
        isPinEnabled,
        isNotificationEnabled,
        notificationStart,
        notificationEnd,
        createdTime,
        updatedTime,
    });

    useEffect(() => {
        const item = collectInputItem();

        setNote(item, itemId)
            .then(() => {
                dispatch(setNoteModified(true));
            })
            .catch((e) => {
                console.error(e);
            });
    }, [isResolved]);

    const handlePressCircle = () => {
        setResolved((prevState) => !prevState);
    };

    const handleEdit = () => {
        navigate("NoteModifyStack", {
            currentItem
        });
    };

    const handleOK = () => {
        goBack();
    };

    return (
        <StyledView className="container">
            <StyledView className="bg-white flex flex-row px-5 py-6 mb-5">
                <StyledTouchableOpacity
                    className="flex-none w-10 mr-3 cursor-pointer"
                    onPress={handlePressCircle}
                >
                    {
                        isResolved ?
                            (<CheckCircleIcon color="#000" title="已完成" size={30}/>) :
                            (<QuestionMarkCircleIcon color="#000" title="未完成" size={30}/>)
                    }
                </StyledTouchableOpacity>
                <StyledText className="flex-auto w-full text-xl">
                    {isResolved ? "已完成" : "未完成"}
                </StyledText>
            </StyledView>
            <StyledView className="bg-white px-5 py-6 mb-5">
                <StyledText className="mb-3 text-4xl">
                    {title}
                </StyledText>
                <StyledView className="border border-r-8 px-3 py-3 text-md">
                    {
                        isNotificationEnabled && (
                            <StyledView className="mb-3">
                                <StyledText>
                                    開始提醒時間：{notificationStart}
                                </StyledText>
                                <StyledText>
                                    結束提醒時間：{notificationEnd}
                                </StyledText>
                            </StyledView>
                        )
                    }
                    {
                        description && (
                            <StyledView className="mb-3">
                                <StyledText>
                                    備註 {description}
                                </StyledText>
                            </StyledView>
                        )
                    }
                    <StyledView className="mb-3">
                        <StyledText>
                            板上釘釘：{isPinEnabled ? "已釘上歐耶" : "並沒有"}
                        </StyledText>
                    </StyledView>
                    <StyledView className="mb-3">
                        <StyledText>
                            事項建立時間：{createdTime}
                        </StyledText>
                    </StyledView>
                    <StyledView className="mb-3">
                        <StyledText>
                            最後更新時間：{updatedTime}
                        </StyledText>
                    </StyledView>
                </StyledView>
            </StyledView>
            <StyledView className="flex flex-row justify-around bg-white py-3 px-3">
                <StyledButton
                    title="編輯"
                    color="gray"
                    onPress={handleEdit}
                />
                <StyledButton
                    title="了解"
                    color="black"
                    onPress={handleOK}
                />
            </StyledView>
        </StyledView>
    );
}

export default NoteViewerScreen;
