import * as React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import {SyncOverviewScreen, optionSyncOverviewScreen} from "../screens/SyncOverviewScreen";
import {SyncDataImportScreen, optionSyncDataImportScreen} from "../screens/SyncDataImportScreen";
import {SyncDataResetScreen, optionSyncDataResetScreen} from "../screens/SyncDataResetScreen";

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
                name="SyncDataImportScreen"
                options={optionSyncDataImportScreen}
                component={SyncDataImportScreen}
            />
            <Stack.Screen
                name="SyncDataResetScreen"
                options={optionSyncDataResetScreen}
                component={SyncDataResetScreen}
            />
        </Stack.Navigator>
    );
};
