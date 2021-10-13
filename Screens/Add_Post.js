import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator, SafeAreaView, ScrollView, ActionSheetIOS, KeyboardAvoidingView} from 'react-native'
import { Picker } from "@react-native-picker/picker";

import * as ImagePicker from 'expo-image-picker';
import {Button, Spinner, Input, NativeBaseProvider} from 'native-base';
import { Formik, useFormikContext } from 'formik';
import { CredintialsContext } from '../Components/CredintialContext';
import MainButton from '../Components/Main_Button';
import Secondary_Button from '../Components/Secondary_Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




export default function Add_Post(){

  const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext);
  const {user_email} = storedCredintials
  const SERVER_URL = 'http://192.168.1.15:3000/upload/predict';

const createFormData = (photo) => {
    const data = new FormData();
    

    data.append('image', {
      name: photo.uri,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
     // uri: photo.uri.replace('file://', '')
      });
    return data;
  };

    //const [photo, setPhoto] = useState(null)
    const [uri, setUri] = useState(null)
    const [loading, setLoading] = useState(false)

    const [make, setMake] = useState('');
    const [model, setModel] = useState('')
    const [bodyType, setBodyType] = useState('')

    const transmission = (setFieldValue) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Automatic', 'Manual', 'Semi-Automatic'],
        //destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setFieldValue('transmission', 'Automatic')
        } else if (buttonIndex === 2) {
          setFieldValue('transmission', 'Manual')
        }
        else if (buttonIndex === 3){
          setFieldValue('transmission', 'Semi-Automatic')
        }
      }
    );

    const fuel = (setFieldValue) =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gas'],
        //destructiveButtonIndex: 0,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setFieldValue('fuelType', 'Petrol')
        } else if (buttonIndex === 2) {
          setFieldValue('fuelType', 'Diesel')
        }
        else if (buttonIndex === 3){
          setFieldValue('fuelType', 'Electric')
        }
        else if(buttonIndex === 4){
          setFieldValue('fuelType', 'Hybrid')
        }
        else if(buttonIndex === 5){
          setFieldValue('fuelType', 'Gas')
        }
      }
    );


      const handleUploadPhoto = (photo) => {
        fetch(`${SERVER_URL}`, {
          method: 'POST',
          body: createFormData(photo)
        })
          .then((response) => response.json())
          .then((response) => {
            setMake(response.make)
            setModel(response.model)
            setBodyType(response.bodyType)
            setLoading(false)
          })
          
          .catch((error) => {
            console.log('error', error);
          });

          setLoading(true)

      };  



    const pickImage = async () => {
        try{

          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
          setUri(result.uri)
  
          handleUploadPhoto(result)
          

        }
        catch(e){
          console.log(e)
        }
      };
      

    return(
      <NativeBaseProvider>
           <SafeAreaView style={styles.container}>
           <View style={styles.imageContainer}>
            <View style={styles.image}>
            <Image source={{ uri: uri }} style={styles.image} />
            </View>
            <Button style={styles.uploadImageBtn} onPress={pickImage}> Upload Image </Button>

           </View>
           <View style={styles.infoContainer}>
             <Formik enableReinitialize={true} //initialValues={vehi}
                initialValues={{make: make,  model: model, bodyType: bodyType, milage: '', yearOfMake: '', fuelType: '', transmission: '', color: '', price: ''}}
                onSubmit={(values, actions) => {

                    console.log(values)

                }}
                
              >
                {(props) => (
                  <KeyboardAwareScrollView
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  >           
                     <Input
                      name="make"
                      onChangeText={props.handleChange('make')}
                      value={props.values.make}
                      placeholder="Make"
                      style={styles.formElemnts}
                     />

                     <Input
                      name="model"
                      onChangeText={props.handleChange('model')}
                      value={props.values.model}
                      placeholder="Model"
                      style={styles.formElemnts}
                     />

                     <Input
                      name="bodyType"
                      onChangeText={props.handleChange('bodyType')}
                      value={props.values.bodyType}
                      placeholder="Body Type"
                      style={styles.formElemnts}  
                      />

                      <Input
                      name="YOM"
                      onChangeText={props.handleChange('yearOfMake')}
                      value={props.values.yearOfMake}
                      placeholder="Year of Make"
                      style={styles.formElemnts}  
                     
                      //keyboardType="numeric"
                      />

                     <Input
                      name="milage"
                      onChangeText={props.handleChange('milage')}
                      value={props.values.milage}
                      placeholder="Milage"
                      style={styles.formElemnts}  
                      keyboardType="numeric"
                      />

                      <Input
                        name="transmission"
                        onChangeText={props.handleChange('transmission')}
                        value={props.values.transmission}
                        placeholder="Transmission"
                        style={styles.formElemnts}
                        onTouchStart={() => transmission(props.setFieldValue)}
                        editable={false}
                      />

                      <Input
                      name="fuelType"
                      onChangeText={props.handleChange('fuelType')}
                      value={props.values.fuelType}
                      placeholder="Fuel Type"
                      style={styles.formElemnts}
                      onTouchStart={() => fuel(props.setFieldValue)}
                      editable={false}
                      />

                     <Input 
                     name="color"
                     onChangeText={props.handleChange('color')}
                     value={props.values.color}
                     placeholder="Color"
                     style={styles.formElemnts}
                    />

                    <Input
                    name="Price"
                    onChangeText={props.handleChange('price')}
                    value={props.values.price}
                    placeholder="Price"
                    style={styles.formElemnts}
                    keyboardType="numeric"
                    />
                    
                    <MainButton text="SUBMIT" onPress={props.handleSubmit} />
                    </KeyboardAwareScrollView>         
                  
                )}
              </Formik>
           </View>

           {loading? ( <Spinner size="lg" style={styles.loading} color="#FF3535" />) : (<></>)}
       </SafeAreaView>
       </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    imageContainer: {
        flex: 2,
        backgroundColor: '#e6e6e6',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },

    infoContainer:{
        flex: 6,
        padding: 20
    },

    image:{
        flex: 3
    },

    uploadImageBtn:{
        flex: 3,
        height: 40,
        marginLeft: 30,
        backgroundColor: '#FF3535'
        
    },

    img: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formElemnts: {
    marginBottom: 20
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },

  
})