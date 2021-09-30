import React from "react";
import {View, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { Formik } from "formik";
import { Input, Button, Image, Link } from 'native-base';
import { TabActions } from "@react-navigation/routers";

export default function Login({navigation}){
    return(
        
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.bannerContainer}>
            </View>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {
                    
                    // fetch('http://192.168.1.15:4000/userAuth/userLogin', {
                    //     method: 'POST',
                    //     headers: {
                    //         Accept: 'application/json',
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify({
                    //         email: values.email,
                    //         password: values.password
                    //     })
                    // })
                    // .then((response) => response.json())
                    // .then((json) => {
                    //     if(json.user){
                    //         console.log(json.user)
                    //         navigation.navigate('HomeStack',{screen: 'Tab', params:{screen: 'Home', params:{username: json.user.user_username}}})
                    //     }
                    //     if(json.errors){
                    //         console.log(json.errors)
                    //     }


                    // })
                    // .catch((error) => {
                    //     console.log(error)
                    // })

                    navigation.navigate('HomeStack')

                }}  
            >
                {(props) => (
                    <View style={styles.formContainer}>
                    
                    <Text style={[styles.title, styles.formElements]}>Login</Text>
                    <Input
                      placeholder="Email"
                      style={styles.formElements}
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      />
                    <Input
                      placeholder="Password"
                      style={styles.formElements}
                     onChangeText={props.handleChange('password')}
                      value={props.values.password}
                      />
                    
                      <Button style={styles.formElements} onPress={props.handleSubmit}>Login</Button>
                      <Button onPress={() => {navigation.push('SignUp')}}>Signup</Button>

                    </View>
                )}
            </Formik>
        </KeyboardAvoidingView>
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
        backgroundColor: 'blue',
    },

    formContainer:{
        flex: 6,
        padding: 20,
        justifyContent: 'center',
    },
    
    formElements:{
        marginBottom: 20
    },

    title:{
        fontSize: 30,
        fontFamily: 'Helvetica-Bold',
        textAlign: 'center'
        
    }
})      