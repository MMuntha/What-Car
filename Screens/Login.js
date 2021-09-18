import React from "react";
import {View, StyleSheet, Text} from 'react-native'
import { Formik } from "formik";
import { Input, Button } from 'native-base';
import { padding } from "styled-system";

export default function Login(){
    return(
        <View style={styles.container}>
            <View style={styles.bannerContainer}>

            </View>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values) => {

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
                    
                      <Button onPress={props.handleSubmit}>Login</Button>
                    </View>
                )}
            </Formik>
        </View>
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
        backgroundColor: 'red',
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