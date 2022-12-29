import React, {useEffect} from 'react';
import {Provider, useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import {request} from "./src/notifications";
import {create} from "./src/notifications/NoteNotification";

import {store} from './src/redux/store';
import {setNotificationAllowed} from './src/redux/actions/AppRootAction';

import {HomeStack, optionHomeStack} from "./src/stacks/HomeStack";
import {NoteViewStack, optionNoteViewStack} from "./src/stacks/NoteViewStack";
import {NoteCreateStack, optionNoteCreateStack} from "./src/stacks/NoteCreateStack";
import {NoteModifyStack, optionNoteModifyStack} from "./src/stacks/NoteModifyStack";

const Stack = createStackNavigator();

const AppRoot = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        request()
            .then((i) => {
                dispatch(setNotificationAllowed(i));
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    setTimeout(() => {
        create()
    }, 3000);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeStack"
                    options={optionHomeStack}
                    component={HomeStack}
                />
                <Stack.Screen
                    name="NoteViewStack"
                    options={optionNoteViewStack}
                    component={NoteViewStack}
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
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <AppRoot />
        </Provider>
    );
};
