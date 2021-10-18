import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { fontSize } from 'styled-system';

export default function (props){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.textMain}>{props.textMain}</Text>
                <Text style={styles.textSecondary}>{props.textSecondary}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: 100,
        height: 100,
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    innerContainer:{

    },
    textMain: {
        textAlign: 'center',
        fontSize: 15
    },
    textSecondary: {
        textAlign: 'center',
        color: 'red',
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: 'bold'
    }
})