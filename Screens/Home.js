import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from 'react-native'
import { CredintialsContext } from '../Components/CredintialContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainButton from '../Components/Main_Button';
import Card from '../Components/Card';
import {Button, NativeBaseProvider} from 'native-base'

export default function Home({route ,navigation}){


    StatusBar.setBarStyle('dark-content', true);

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email} = storedCredintials

    const [post, setPosts] = useState()
    const [refresh, setReFresh] = useState(false)

    
    useEffect(() => {
        fetch('http://192.168.1.15:3000/upload')
          .then((response) => response.json())
          .then((response) => {
              setPosts(response.posts)
              console.log(post)
              setReFresh(false)
          })
         .catch((error) => console.error(error))
          //.finally(() => setLoading(false));
      },[refresh]);

    return(
        <NativeBaseProvider>       
            <View style={styles.container}>
                <FlatList
                    data={post}
                    keyExtractor={(item) => item._id}
                    refreshing={refresh}
                    onRefresh={() => {setReFresh(true)}}
                    renderItem={({item}) => (
                        <Card model={item.model} postedBy={item.postedBy} image={item.image} onPress={() => {navigation.navigate('Details', {id: item._id})}}/>
                    )}
                />
            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    }
})