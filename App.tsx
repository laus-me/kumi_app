import * as React from 'react';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import { store } from './src/redux/store';

import HomeStack from "./src/stacks/HomeStack";
import NoteCreateStack from "./src/stacks/NoteCreateStack";
import NoteModifyScreen from "./src/stacks/NoteModifyScreen";

const Stack = createStackNavigator();

const optionHomeStack = {
    headerShown: false
};

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeStack"
                        options={optionHomeStack}
                        component={HomeStack}
                    />
                    <Stack.Screen
                        name="NoteCreateStack"
                        component={NoteCreateStack}
                    />
                    <Stack.Screen
                        name="NoteModifyScreen"
                        component={NoteModifyScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};
