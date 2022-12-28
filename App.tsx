import * as React from 'react';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { homeButton, calendarButton } from './src/components/TabButtons';

import HomeStack from './src/stacks/HomeStack';
import CalendarScreen from './src/screens/CalendarScreen';

import { store } from './src/redux/store';

const BottomTab = createBottomTabNavigator();
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomTab.Navigator initialRouteName="HomeScreen">
                    <BottomTab.Screen
                        name="HomeStack"
                        options={homeButton}
                        component={HomeStack}
                    />
                    <BottomTab.Screen
                        name="CalendarScreen"
                        options={calendarButton}
                        component={CalendarScreen}
                    />
                </BottomTab.Navigator>
            </NavigationContainer>
        </Provider>
    );
};
