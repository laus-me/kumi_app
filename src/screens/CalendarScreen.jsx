import * as React from "react";

import {Text, View} from "react-native";
import {styled} from "nativewind";
import {Calendar} from 'react-native-calendars';

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CalendarIcon,
} from "react-native-heroicons/outline";

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

const extractDate = (date) => ({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDay(),
})

export const CalendarScreen = () => {
    const renderHeader = (date) => {
        const {year, month} = extractDate(date);

        return (
            <StyledText className="mt-2 mb-3">
                {year} 年 {month} 月
            </StyledText>
        )
    };

    const renderArrow= (direction) => direction === 'left'
        ? <ArrowLeftIcon color="#000" />
        : <ArrowRightIcon color="#000" />;

    return (
        <StyledView>
            <Calendar
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                monthFormat={'yyyy MM'}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                renderHeader={renderHeader}
                renderArrow={renderArrow}
                hideArrows={true}
                hideExtraDays={false}
                disableMonthChange={true}
                firstDay={0}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={subtractMonth => subtractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                disableArrowLeft={true}
                disableArrowRight={true}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
            />
        </StyledView>
    )
}
