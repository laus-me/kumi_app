import * as React from 'react';

import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { homeButton, calendarButton } from './components/TabButtons';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';

import { store } from './redux/store';

const BottomTab = createBottomTabNavigator();
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <BottomTab.Navigator initialRouteName="HomeScreen">
                    <BottomTab.Screen
                        name="HomeScreen"
                        options={homeButton}
                        component={HomeScreen}
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
