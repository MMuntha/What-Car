import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator, SafeAreaView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {Button, Spinner, Input, NativeBaseProvider} from 'native-base';
import { Formik } from 'formik';
import { CredintialsContext } from '../Components/CredintialContext';
``



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
    const [isFocused, setIsFocused] = useState(false);


    


      const handleUploadPhoto = (photo) => {
        fetch(`${SERVER_URL}`, {
          method: 'POST',
          body: createFormData(photo)
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response.make)
            setMake(response.make)
            setModel(response.model)
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

      const details = () => {
        console.log(make)
        console.log(model)
      }

      

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
             <Input
                defaultValue={make}
                onChangeText={(value) => {setMake(value)}}
                style={[styles.formElemnts, styles.input]}
                variant="underlined"
                onFocus={() => setIsFocused(true)}


             />
             <Input
                defaultValue={model}
                style={styles.formElemnts}
                variant="underlined"
                

             />



             <Button onPress={details}>Submit</Button>
           </View>
          
          

           {loading? (      <Spinner size="lg" style={styles.loading} color="#FF3535" />) : (<></>)}
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
        padding: 10
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
    marginBottom: 10
  },

  
})