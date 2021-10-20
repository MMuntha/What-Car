import React from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'

export default function SearchedItem(props){
    return(
       <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Image
                source={require('../public/pro-pic.jpg')}
                style={styles.proPic}
            />
             <Text style={styles.nameText}>{props.name}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderColor: '#ECECEC',

    },
    proPic:{
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 20
    },
    nameText:{
        fontFamily: 'Helvetica-Bold',
        fontSize: 18

    }
})