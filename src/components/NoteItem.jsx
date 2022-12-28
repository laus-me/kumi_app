import * as React from "react";
import PropTypes from "prop-types";

import {Text, View, TouchableOpacity} from "react-native";
import {styled} from "nativewind";

import {
    CheckCircleIcon,
    QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NoteItem = (props) => {
    const {
        id,
        title,
        isResolved,
        isNotificationEnabled,
        notificationStart,
        notificationEnd,
        navigation,
    } = props;

    const onCirclePressed = () => {
        navigation.navigate(
            id === 0
                ? "NoteCreateScreen"
                : "NoteModifyScreen"
        )
    }

    const onBarPressed = () => {
        navigation.navigate(
            id === 0
                ? "NoteCreateScreen"
                : "NoteModifyScreen"
        )
    }

    return (
        <StyledView
            className="flex px-5 py-3 hover:bg-gray-100 w-full flex-row"
        >
            <StyledTouchableOpacity
                className="flex-none w-10 mr-3 cursor-pointer"
                onPress={onCirclePressed}
            >
                {
                    isResolved ?
                        (<CheckCircleIcon color="#000" title="已完成" size={35} />) :
                        (<QuestionMarkCircleIcon color="#000" title="未完成" size={35} />)
                }
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
                className="grow select-none cursor-pointer"
                onPress={onBarPressed}
            >
                <StyledView>
                    <StyledText className="text-black">
                        {title}
                    </StyledText>
                </StyledView>
                <StyledView className="grow w-64 select-none cursor-pointer">
                    <StyledText className="text-gray-600">
                        {isNotificationEnabled ? (
                            !isResolved ?
                                `已啟用提醒（${notificationStart}～${notificationEnd}）` :
                                "歐耶已經完成了"
                        ) : (
                            !isResolved ?
                                "要記得完成呦" :
                                "歐耶已經完成了"
                        )}
                    </StyledText>
                </StyledView>
            </StyledTouchableOpacity>
        </StyledView>
    );
};

NoteItem.propTypes = {
    title: PropTypes.string,
    isResolved: PropTypes.bool,
    isNotificationEnabled: PropTypes.bool,
    notificationStart: PropTypes.number,
    notificationEnd: PropTypes.number,
};

export default NoteItem;
