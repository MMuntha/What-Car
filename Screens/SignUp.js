import React, {useState} from "react";
import {View, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native'
import { Formik } from "formik";
import { Input, Button, Image, Link, FormControl} from 'native-base';
import { marginTop } from "styled-system";

export default function SignUp({navigation}){
    const [error_username, set_error_usernamme] = useState('')
    const [error_email, set_error_email] = useState('')
    const [erro_password, set_error_password] = useState('')
    const [error_phone_no, set_error_phone_no] = useState('')
    return(
        
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === "ios" ? "padding"  : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}

        >
            <View style={styles.bannerContainer}>
            </View>
            <Formik
                initialValues={{user_username: '', user_email: '', user_password: '', user_phone_no: ''}}
                onSubmit={(values) => {

                      fetch('http://192.168.1.15:4000/userAuth/userSignUp', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        user_username: values.user_username,
                        user_email: values.user_email,
                        user_password: values.user_password,
                        user_phone_no: values.user_phone_no

                      })
                    }).then((response) => response.json())
                      .then((json) => {
                        if(json.customer){
                            console.log(json.customer)
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
                    
                      <Button style={styles.formElements} onPress={props.handleSubmit}>Sign up</Button>
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
    }
})      