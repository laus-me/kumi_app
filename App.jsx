import React, {useEffect} from "react";
import {Provider} from "react-redux";

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {
    request as requestNotification,
} from "./src/notifications";

import {
    init as initSync, upload,
} from "./src/workers/sync";

import {
    dump,
} from "./src/storage";

import {store} from "./src/redux/store";

import {HomeStack, optionHomeStack} from "./src/stacks/HomeStack";
import {NoteViewStack, optionNoteViewStack} from "./src/stacks/NoteViewStack";
import {NoteCreateStack, optionNoteCreateStack} from "./src/stacks/NoteCreateStack";
import {NoteModifyStack, optionNoteModifyStack} from "./src/stacks/NoteModifyStack";
import {SyncStack, optionSyncStack} from "./src/stacks/SyncStack";

const Stack = createStackNavigator();

const AppRoot = () => {
    useEffect(() => {
        const doUpload = async () => {
            try {
                const dumpString = await dump();
                await upload(dumpString);
            } catch (e) {
                console.error(e);
            }
        };
        initSync()
            .then(() => {
                console.info("initSync OK");
                setTimeout(doUpload, 3000);
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    useEffect(() => {
        requestNotification()
            .then(() => {
                console.info("requestNotification OK");
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

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
                <Stack.Screen
                    name="SyncStack"
                    options={optionSyncStack}
                    component={SyncStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <AppRoot />
        </Provider>
    );
};

export default App;
