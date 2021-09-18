import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';

const Stack = createStackNavigator();

export default function RootStack(){

    return(
        <Stack.Navigator>
             <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}}/>
            <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/>
            
        </Stack.Navigator>
    )
}