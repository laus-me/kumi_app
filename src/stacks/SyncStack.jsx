import * as React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import {SyncOverviewScreen, optionSyncOverviewScreen} from "../screens/SyncOverviewScreen";
import {SyncImportScreen, optionSyncImportScreen} from "../screens/SyncImportScreen";

const Stack = createStackNavigator();

export const optionSyncStack = {
    title: "同步備份",
    headerShown: false,
};

export const SyncStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SyncOverviewScreen"
                options={optionSyncOverviewScreen}
                component={SyncOverviewScreen}
            />
            <Stack.Screen
                name="SyncImportScreen"
                options={optionSyncImportScreen}
                component={SyncImportScreen}
            />
        </Stack.Navigator>
    );
};
