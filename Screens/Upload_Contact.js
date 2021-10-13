import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { Input, NativeBaseProvider } from 'native-base';
import { Formik } from 'formik';
import { padding, style } from 'styled-system';
import MainButton from '../Components/Main_Button';
import { CredintialsContext } from '../Components/CredintialContext';

export default function Upload({route}){

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_username, user_phone_no, user_email} = storedCredintials

    const SERVER_URL = 'http://192.168.1.15:3000/upload/addPost'

    const { detail, photo } = route.params

    const data = new FormData();

    return(
        <NativeBaseProvider>
        <View style={styles.container}>
            <Formik
                initialValues = {{name: user_username, contact: user_phone_no.toString() , city: ''}}

                onSubmit={(values, actions) => {
                    
                    data.append('image', {
                        name: photo.uri,
                        type: photo.type,
                        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                       // uri: photo.uri.replace('file://', '')
                      });

                      data.append('make',  detail.make )
                      data.append('model',  detail.model)
                      data.append('bodyType',  detail.bodyType)
                      data.append('yom',  detail.yearOfMake)
                      data.append('milage',  detail.milage)
                      data.append('transmission', detail.transmission)
                      data.append('fuelType',  detail.fuelType)
                      data.append('price',  detail.price)
                      data.append('postedBy', values.name)
                      data.append('contact', parseInt(values.contact))
                      data.append('location', values.city)

                      fetch(`${SERVER_URL}`, {
                          method : 'POST',
                          body : data
                      })
                      .then((response) => response.json())
                      .then((response) => {
                          console.log(response.message)
                      })
                      .catch((error) => {
                          console.log(error)
                      })
                   
                }}
            >
                {(props) => (
                    <View>
                        <Input
                        name="name"
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                        style={styles.formElemnts}
                        placeholder='name'

                        />      
                        <Input
                        name="contact"
                        onChangeText={props.handleChange('contact')}
                        value={props.values.contact}
                        style={styles.formElemnts}
                        placeholder="Contact"
                        keyboardType="numeric"
                        />      
                        <Input
                        name="city"
                        onChangeText={props.handleChange('city')}
                        value={props.values.city}
                        style={styles.formElemnts}
                        placeholder="City"
                        />   

                        <MainButton text="UPLOAD" onPress={props.handleSubmit}/>
                           

                    </View>
                    
                )}


            </Formik>
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10
    },
    
    formElemnts: {
        marginBottom: 20
      },
})