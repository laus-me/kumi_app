import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {NoteScreen, optionNoteScreen} from "../screens/NoteScreen";
import {CalendarScreen, optionCalendarScreen} from "../screens/CalendarScreen";

const BottomTab = createBottomTabNavigator();

export const optionHomeStack = {
    title: "首頁",
    headerShown: false,
};

export const HomeStack = () => {
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
