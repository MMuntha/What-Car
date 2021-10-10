import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Secondary_Button (props) {

    return(
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
             <Text style={styles.text}>{props.text}</Text>
         </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderColor: "#FF3535",
        borderWidth: 1
    },
    
    text: {
        color: '#FF3535',
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 1

    }
})