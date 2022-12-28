import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import NoteScreen from "../screens/NoteScreen";
import CalendarScreen from "../screens/CalendarScreen";

import {
    HomeIcon,
    CalendarIcon,
} from "react-native-heroicons/outline";

const BottomTab = createBottomTabNavigator();

const optionNoteScreen = {
    title: "清單",
    tabBarIcon: ({color, size}) => (
        <HomeIcon
            name="home-icon"
            color={color}
            size={size}
        />
    ),
};

const optionCalendarScreen = {
    title: "日曆",
    tabBarIcon: ({color, size}) => (
        <CalendarIcon
            name="calendar-icon"
            color={color}
            size={size}
        />
    ),
};

export default function HomeStack() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="NoteScreen"
                options={optionNoteScreen}
                component={NoteScreen}
            />
            <BottomTab.Screen
                name="CalendarScreen"
                options={optionCalendarScreen}
                component={CalendarScreen}
            />
        </BottomTab.Navigator>
    );
}
