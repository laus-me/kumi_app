import * as React from 'react';

import { withExpoSnack } from 'nativewind';

import { Text, View } from 'react-native';
import { styled } from 'nativewind';

import {
    CheckCircleIcon,
    QuestionMarkCircleIcon
} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);

const HomeItem = (props) => {
    const { metadata, onView, onResolve } = props;
    return (
        <StyledView className="flex px-5 py-3 hover:bg-gray-100 w-full">
            <StyledView className="flex-none w-10 mr-5 cursor-pointer">
                {
                    metadata.resolved
                        ? (<CheckCircleIcon title="已完成"/>)
                        : (<QuestionMarkCircleIcon title="未完成"/>)
                }
            </StyledView>
            <StyledView className="grow w-64 select-none cursor-pointer">
                <StyledView className="text-black">{metadata.title}</StyledView>
                {metadata.enabledNotification ? (
                    <StyledView className="text-gray-600">
                        {
                            !metadata.resolved
                                ? `已啟用提醒（${metadata.notificationStart}～${metadata.notificationEnd}）`
                                : "歐耶已經完成了"
                        }
                    </StyledView>
                ) : (
                    <StyledView className="text-gray-600">
                        <StyledText>
                            {!metadata.resolved ? "要記得完成呦" : "歐耶已經完成了"}
                        </StyledText>
                    </StyledView>
                )}
            </StyledView>
        </StyledView>
    )
}

export default withExpoSnack(HomeItem);
