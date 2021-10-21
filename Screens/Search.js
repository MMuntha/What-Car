import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions, Keyboard, Button, FlatList} from 'react-native'
import VehiDetails from './Vehi_Details';
import { io } from "socket.io-client";
import SearchedItem from '../Components/SearchedItem';
import { isEmptyArray } from 'formik';

const ENDPOINT = 'http://192.168.1.15:3000/'
const socket = io(ENDPOINT);


export default function Search({route, navigation}){

   const [result, setResults] = useState('')
    const search = (val) => {

        socket.emit("payload", val);

            socket.on('result', (results) => {
                //console.log(results)
                setResults(results)
        
    
            })  

    }

    

        return(
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput style={styles.searchBar}
                        placeholder="Search"
                        onChangeText={(val) => search(val) }
                    />
                   
                </View>
                <View style={styles.divider}>

                </View>
                <View>
                    {result?

                        <FlatList
                        data={result}
                        keyExtractor={(item) => item._id}
                        renderItem={({item}) => (
                            //<Text>{item.user_username}</Text>
                            <SearchedItem name={item.user_username} image={item.pro_image} onPress={() => {navigation.navigate('SearchedProfile', { name: item.user_username, searchedId: item._id})}}/>

                        )}
                    />
                    :
                    <Text>No result</Text>
                    
                }
                    
                </View>

            </View>
        )
    
   
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white'
    },
    searchBar: {
        height: 30,
        backgroundColor: '#ECECEC',
        borderRadius: 10,
        padding: 8,
        fontSize: 18,

    },
    searchContainer:{
    },
    divider:{
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    }
})