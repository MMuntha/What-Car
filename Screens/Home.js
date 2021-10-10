import React, {useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { CredintialsContext } from '../Components/CredintialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, NativeBaseProvider} from 'native-base'

export default function Home({route ,navigation}){

    StatusBar.setBarStyle('dark-content', true);

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email} = storedCredintials

    

    return(
        <NativeBaseProvider>       
            <View>
                <Text> Welcome {user_email} </Text>

            </View>
        </NativeBaseProvider>
    )
}