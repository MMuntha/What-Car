import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { CredintialsContext } from '../Components/CredintialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainButton from '../Components/Main_Button';

import {Button, NativeBaseProvider} from 'native-base'

export default function Home({route ,navigation}){

    StatusBar.setBarStyle('dark-content', true);

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email} = storedCredintials
    const [error, setError] = useState(false)

    const test = () => {
        setError(true)
    }
    

    return(
        <NativeBaseProvider>       
            <View>
                {error? <Text>Hello</Text> : <></>}
                <Text> Welcome {user_email} </Text>
                <MainButton text="Click" onPress={test}/>

            </View>
        </NativeBaseProvider>
    )
}