import * as React from "react";
import {
    HomeIcon,
    CalendarIcon,
} from "react-native-heroicons/outline";

export const homeButton = {
    title: "首頁 ",
    tabBarIcon: ({ color, size }) => (
        <HomeIcon
            name="home-icon"
            color={color}
            size={size}
        />
    )
};

export const calendarButton = {
    title: "日曆 ",
    tabBarIcon: ({ color, size }) => (
        <CalendarIcon
            name="calendar-icon"
            color={color}
            size={size}
        />
    )
};
