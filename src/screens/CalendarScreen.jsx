import * as React from "react";

import {Text, View} from "react-native";
import {styled} from "nativewind";

import {CalendarIcon} from "react-native-heroicons/outline";

const StyledView = styled(View);
const StyledText = styled(Text);

export const optionCalendarScreen = {
    title: "日曆",
    tabBarIcon: ({color, size}) => (
        <CalendarIcon
            name="calendar-icon"
            color={color}
            size={size}
        />
    ),
};

export const CalendarScreen = () => {
    return (
        <StyledView
            className="container h-12 justify-center bg-slate-300 items-center"
        >
            <StyledText className="text-slate-800">
                Try resizing me! 🎉
            </StyledText>
        </StyledView>
    );
};
