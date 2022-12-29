import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {NoteListScreen, optionNoteListScreen} from "../screens/NoteListScreen";
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
                name="NoteListScreen"
                options={optionNoteListScreen}
                component={NoteListScreen}
            />
            <BottomTab.Screen
                name="CalendarScreen"
                options={optionCalendarScreen}
                component={CalendarScreen}
            />
        </BottomTab.Navigator>
    );
}
