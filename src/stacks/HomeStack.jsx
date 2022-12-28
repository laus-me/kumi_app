import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import NoteCreateScreen from "../screens/NoteCreateScreen";
import NoteModifyScreen from "../screens/NoteModifyScreen";

const Stack = createStackNavigator();

const screenOption = {
    headerShown: false,
};

export default function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={screenOption}
            />
            <Stack.Screen
                name="NoteCreateScreen"
                component={NoteCreateScreen}
                options={screenOption}
            />
            <Stack.Screen
                name="NoteModifyScreen"
                component={NoteModifyScreen}
                options={screenOption}
            />
        </Stack.Navigator>
    );
}
