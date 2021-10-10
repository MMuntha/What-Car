import React, {useContext} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { CredintialsContext } from '../Components/CredintialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button, NativeBaseProvider} from 'native-base'

export default function Profile({route ,navigation}){

    StatusBar.setBarStyle('dark-content', true);

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email} = storedCredintials

    const logout = async() => {
        try{
            await AsyncStorage.removeItem('car-login')
            setStoredCredintials('')
        }
        catch(e)
        {
            //console.log(e)
        }
    }
    

    return(
        <NativeBaseProvider>
            <View>

                <Button onPress={logout}>Logout</Button>
            </View>
        </NativeBaseProvider>
    )
}