import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'native-base';
import BottomTab from './BottomTab';

const Hstack = createStackNavigator()

export default function HomeStack() {
    return(
        <Hstack.Navigator>
            <Hstack.Screen name="Tab" component={BottomTab} options={{headerShown: false}}/>
        </Hstack.Navigator>
    )
}