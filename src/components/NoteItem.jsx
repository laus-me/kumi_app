import React, {useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import PropTypes from "prop-types";

import {setNoteModified} from "../redux/actions/NoteAction";

import {Text, TouchableOpacity, View} from "react-native";
import {styled} from "nativewind";

import {setNote} from "../storage/NoteStorage";

import {
    CheckCircleIcon,
    QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NoteItem = (props) => {
    const {
        id: itemId,
        navigation,
    } = props;

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
    } = props;

    const [isResolved, setResolved] = useState(cIsResolved);

    const dispatch = useDispatch();

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
            .catch((e) => console.error(e));
    }, [isResolved]);

    const handlePressCircle = () => {
        setResolved((prevState) => !prevState);
    };

    const handlePressBar = () => {
        const item = collectInputItem();
        navigation.navigate("NoteViewStack", {
            currentItem: {id: itemId, ...item}
        });
    };

    return (
        <StyledView
            className="flex px-5 py-3 hover:bg-gray-100 w-full flex-row"
        >
            <StyledTouchableOpacity
                className="flex-none w-10 mr-3 cursor-pointer"
                onPress={handlePressCircle}
            >
                {
                    isResolved ?
                        (<CheckCircleIcon color="#000" title="已完成" size={35}/>) :
                        (<QuestionMarkCircleIcon color="#000" title="未完成" size={35}/>)
                }
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
                className="grow select-none cursor-pointer"
                onPress={handlePressBar}
            >
                <StyledView>
                    <StyledText className="text-black">
                        {title}
                    </StyledText>
                </StyledView>
                <StyledView className="grow w-64 select-none cursor-pointer">
                    <StyledText className="text-gray-600">
                        {isNotificationEnabled ? (
                            isResolved
                                ? "歐耶已經完成了"
                                : `已啟用提醒（${notificationStart}～${notificationEnd}）`
                        ) : (
                            isResolved
                                ? "歐耶已經完成了"
                                : "要記得完成呦"
                        )}
                    </StyledText>
                </StyledView>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

NoteItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isResolved: PropTypes.bool,
    isPinEnabled: PropTypes.bool,
    isNotificationEnabled: PropTypes.bool,
    notificationStart: PropTypes.string,
    notificationEnd: PropTypes.string,
};

export default NoteItem;
