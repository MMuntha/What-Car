import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import MainButton from './Main_Button';

export default function SearchedProfileHeader (props) {
    return(
        <View style={styles.container}>
           <View style={styles.imageContainer}>
            <Image 
                        source={{ uri: 'http://192.168.1.15:3000/uploads/Profile-Pics/' +`${props.proImage}`  }}
                        style={styles.proPic}
                />
           </View>
            <View style={styles.headerText}>
                <Text style={styles.postCount}>{props.postCount}</Text>
                <Text style={styles.advertisementText}>Advertisements</Text>
                <MainButton style={styles.rateButton} text="Rate User" onPress={props.onPress}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row'
    },
    proPic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 50
    },
    headerText: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    postCount: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 20

    },
    advertisementText: {
        fontSize: 15,
        fontFamily: 'Helvetica'
    },
    rateButton: {
        marginTop: 20,
        borderRadius: 40,
        paddingRight: 10,
        paddingLeft: 10,
        
    }
})