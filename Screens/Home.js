import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { CredintialsContext } from '../Components/CredintialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button} from 'native-base'

export default function Home({route ,navigation}){

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email} = storedCredintials

    const logout = async() => {
        try{
            await AsyncStorage.removeItem('car-login')
            setStoredCredintials('')
        }
        catch(e)
        {
            console.log(e)
        }
    }
    

    return(
        <View>
            <Text> Welcome {user_email} </Text>

            <Button onPress={logout}>Logout</Button>
        </View>
    )
}