import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const Stack = createStackNavigator()

export default function AuthStack(){

    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
    
}