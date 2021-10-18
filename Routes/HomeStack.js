import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from 'native-base';
import BottomTab from './BottomTab';
import Upload from '../Screens/Upload_Contact';
import Vehi_Details from '../Screens/Vehi_Details'

const Hstack = createStackNavigator()

export default function HomeStack() {
    return(
        <Hstack.Navigator>
            <Hstack.Screen name="Tab" component={BottomTab} options={{headerShown: false}}/>
            <Hstack.Screen name="Contact" component={Upload} />
            <Hstack.Screen name="Details" component={Vehi_Details}/>
        </Hstack.Navigator>
    )
}   