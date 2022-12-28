import * as React from "react";
import PropTypes from "prop-types";

import { Text, View, TouchableOpacity } from "react-native";
import { styled } from "nativewind";

import {
    CheckCircleIcon,
    QuestionMarkCircleIcon
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const HomeItem = (props) => {
    const {
        title,
        isResolved,
        isNotificationEnabled,
        notificationStart,
        notificationEnd
    } = props;

    return (
        <StyledView className="flex px-5 py-3 bg-white hover:bg-gray-100 w-full flex-row">
            <StyledTouchableOpacity className="flex-none mr-5 cursor-pointer">
                {
                    isResolved
                        ? (<CheckCircleIcon color="#000" title="已完成" />)
                        : (<QuestionMarkCircleIcon color="#000" title="未完成" />)
                }
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="grow select-none cursor-pointer">
                <StyledView>
                    <StyledText className="text-black">
                        {title}
                    </StyledText>
                </StyledView>
                <StyledView className="text-gray-600">
                    <StyledText>
                        {isNotificationEnabled ? (
                            !isResolved
                                ? `已啟用提醒（${notificationStart}～${notificationEnd}）`
                                : "歐耶已經完成了"
                        ) : (
                            !isResolved
                                ? "要記得完成呦"
                                : "歐耶已經完成了"
                        )}
                    </StyledText>
                </StyledView>
            </StyledTouchableOpacity>
        </StyledView>
    )
};

HomeItem.propTypes = {
    title: PropTypes.string,
    isResolved: PropTypes.bool,
    isNotificationEnabled: PropTypes.bool,
    notificationStart: PropTypes.number,
    notificationEnd: PropTypes.number
};

export default HomeItem;
