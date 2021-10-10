import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MainButton (props) {

    return(
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
             <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#FF3535',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 1

    }
})