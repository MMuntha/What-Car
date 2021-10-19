import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Image, ActivityIndicator, Dimensions, ScrollView, FlatList} from 'react-native'
import { background, backgroundColor, flexDirection, justifyContent, width } from 'styled-system';
import DetailBox from '../Components/DetailBox';
import MainButton from '../Components/Main_Button';

export default function VehiDetails({route, navigation}){

    const {id} = route.params
    const [details, setDetails] = useState('')
    const [loading, isLoading] = useState(true)
    const [array, setArray] = useState([])


    useEffect(() => {

        fetch('http://192.168.1.15:3000/upload/vehiDetail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.detail)
            setDetails(response.detail)

            
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => isLoading(false))

        //console.log(id)

      },[]);

      if(loading)
      {
          return(
              <ActivityIndicator/>
          )
      }
      else{

        return(
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'http://192.168.1.15:3000/uploads/' +`${details.image}`  }}
        
                        />
                </View>
                <View style={styles.priceContainer}>
                    <Image source={require('../public/price.png')}  style={styles.priceImg}/>
                    <Text style={styles.priceText}> Rs. {details.price}</Text>
                </View>
                <View style={styles.detailContainer}  >
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scroll}>
                   <DetailBox textMain="Make" textSecondary={details.make} />
                    <DetailBox textMain="Model" textSecondary={details.model}/>
                    <DetailBox textMain="Body Type" textSecondary={details.bodyType}/>
                    <DetailBox textMain="Milage" textSecondary={details.milage}/>
                    <DetailBox textMain="Year" textSecondary={details.yom}/>
                    <DetailBox textMain="Fuel Type" textSecondary={details.fuelType}/>
                    <DetailBox textMain="Transmission" textSecondary={details.transmission}/>
                   </ScrollView>
                </View>
                <View style={styles.btnContainer}>
                    <MainButton text="Request Virtual Meeting" style={styles.mainBtn} />
                </View> 
            </View>
        )

      }
   
   
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    imgContainer: {
        flex: 3,
        justifyContent: 'center'
    },
    priceContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'center'

    },
    detailContainer: {
        backgroundColor: '#ECECEC',
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    btnContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: windowWidth,
        height: windowHeight / 3
    },
    priceText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 30,
    },
    scroll:{
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    mainBtn: {
    },
    priceImg:{
        width: 20,
        height: 20,
        marginRight: 10
    }


})