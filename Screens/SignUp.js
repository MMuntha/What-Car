import React, {useState, useContext} from "react";
import {View, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, Button, ActivityIndicator} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Formik } from "formik";
import { Input, Link, FormControl, NativeBaseProvider} from 'native-base';
import { marginTop } from "styled-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredintialsContext } from "../Components/CredintialContext";
import MainButton from "../Components/Main_Button";

export default function SignUp({navigation}){
    const [error_username, set_error_usernamme] = useState('')
    const [error_email, set_error_email] = useState('')
    const [erro_password, set_error_password] = useState('')
    const [error_phone_no, set_error_phone_no] = useState('')
    const [photo, setPhoto] = useState(null)
    const[uri, setUri] = useState('')

    const data = new FormData();

    const {storedCredintials,setStoredCredintials} = useContext(CredintialsContext)

    const persistLogin = async(credintials) => {
        try{
            const jsonValue = JSON.stringify(credintials)
             await AsyncStorage.setItem('car-login', jsonValue)
            setStoredCredintials(credintials)

        }
        catch(e)
        {
            console.log(e)
        }

    }

    const pickImage = async () => {
        try{

          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          setUri(result.uri)
          setPhoto(result)
          
        //  handleUploadPhoto(result)
          

        }
        catch(e){
          console.log(e)
        }
       
      };


    return(
        <NativeBaseProvider>
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === "ios" ? "padding"  : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}

        >
            <View style={styles.bannerContainer}>
                {uri?
                
                    <Image source={{uri: uri}}
                    style={styles.proPic}
                      />
                      
                      :
                    <></>
                }
            </View>
            <Formik
                initialValues={{user_username: '', user_email: '', user_password: '', user_phone_no: ''}}
                onSubmit={(values) => {

                    data.append('image', {
                        name: photo.uri,
                        type: photo.type,
                        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
                       // uri: photo.uri.replace('file://', '')
                      });

                      data.append('user_username', values.user_username)
                      data.append('user_email', values.user_email)
                      data.append('user_password', values.user_password)
                      data.append('user_phone_no', values.user_phone_no)


                      fetch('http://192.168.1.15:3000/userAuth/userSignUp', {
                      method: 'POST',
                      body: data
                      
                    }).then((response) => response.json())
                      .then((json) => {
                        if(json.customer){
                            console.log(json.customer)
                            persistLogin(json.customer)
                        }
                        if(json.errors)
                        {
                           if(json.errors.user_username){
                               set_error_usernamme(json.errors.user_username)
                           }
                          
                        }
                      })


                }}      
            >
                {(props) => (
                    <View style={styles.formContainer}>
                    
                    <Text style={[styles.title, styles.formElements]}>Signup</Text>
                    <Input
                        placeholder="Username"
                        style={styles.formElements}
                        onChangeText={props.handleChange('user_username')}
                        value={props.values.user_username}
                    />
                    
                    <Input
                      placeholder="Email"
                      style={styles.formElements}
                      onChangeText={props.handleChange('user_email')}
                      value={props.values.user_email}
                      />
                    <Input
                      placeholder="Password"
                      style={styles.formElements}
                     onChangeText={props.handleChange('user_password')}
                      value={props.values.user_password}
                      />
                    <Input
                      placeholder="user_phone_no"
                      keyboardType='numeric'
                    style={styles.formElements}
                     onChangeText={props.handleChange('user_phone_no')}
                      value={props.values.user_phone_no}
                      />
                    
                    <Button title="Choose Photo"  onPress={pickImage}/>
                      <MainButton text="SIGN UP" style={styles.formElements} onPress={props.handleSubmit}/>


                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },

    bannerContainer:{
        flex: 2,
        padding:30,
        backgroundColor: '#FF3535',
        justifyContent: 'center',
        alignItems: 'center'
    },

    formContainer:{
        flex: 6,
        padding: 20,
        justifyContent: 'center',
    },
    
    formElements:{
        marginTop: 10,
        marginBottom: 10
    },

    title:{
        fontSize: 30,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center'
        
    },
    errorMessage:{
        color: 'red'
    },
    proPic: {
        width:100,
        height: 100,
        borderRadius: 50
    }
})      