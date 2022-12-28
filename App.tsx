import * as React from 'react';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import { store } from './src/redux/store';

import {HomeStack, optionHomeStack} from "./src/stacks/HomeStack";
import {NoteCreateStack, optionNoteCreateStack} from "./src/stacks/NoteCreateStack";
import {NoteModifyStack, optionNoteModifyStack} from "./src/stacks/NoteModifyScreen";

const Stack = createStackNavigator();

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
                        options={optionNoteCreateStack}
                        component={NoteCreateStack}
                    />
                    <Stack.Screen
                        name="NoteModifyStack"
                        options={optionNoteModifyStack}
                        component={NoteModifyStack}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};
