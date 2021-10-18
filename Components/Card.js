import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { padding, paddingBottom, paddingTop } from 'styled-system';
import MainButton from './Main_Button';

export default function Card(props){
    let Image_Http_URL ={ uri: '192.168.1.15:3000/uploads/1634484045122-34145585-FA326444-4866-4945-81AA-949431ED808D.png'};

    return(
        <View style={styles.card}>
            <View style={styles.uploadedBy}> 
                <Image
                    style={styles.proPic}
                    source={require('../public/pro-pic.jpg')}
                />
               <Text>{props.postedBy}</Text>

            </View>
            <View>
                <Image
                    style={styles.image}
                    source={{ uri: 'http://192.168.1.15:3000/uploads/' +`${props.image}`  }}
                />
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.modelName}>{props.model}</Text>
                <Text style={styles.price}>Rs 10,950,000.00</Text>
            </View>
            <View style={styles.btnContainer}>
                <MainButton text="More Details" onPress={props.onPress} style={styles.mainButton}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 12,
        borderRadius: 10,
        maxHeight: 450,
        backgroundColor: '#E7E7E7',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    
    image :{
        width: 300,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
        

    },
    uploadedBy: {
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    proPic:{
        height: 40,
        width: 40,
        borderRadius: 20,
        marginRight: 10
    },
    mainButton: {
    },
    btnContainer: {
        marginRight: 12,
        marginLeft: 12  
    },
    detailContainer: {
        //flexDirection: 'row',
        marginBottom: 30,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
       // justifyContent: 'space-between'
    },
    modelName: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 20,
        marginBottom: 5
    },
    price: {
       fontSize: 18,
    }

})