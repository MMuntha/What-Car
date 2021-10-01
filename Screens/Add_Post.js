import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { justifyContent, padding, style } from 'styled-system';
import {Button, Spinner} from 'native-base';




export default function Add_Post(){


  const SERVER_URL = 'http://192.168.1.15:3000';

const createFormData = (photo) => {
    const data = new FormData();
  
    data.append('image', {
      name: photo.uri,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
    return data;
  };

    //const [photo, setPhoto] = useState(null)
    const [uri, setUri] = useState(null)
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)


      const handleUploadPhoto = (photo) => {
        fetch(`${SERVER_URL}/add`, {
          method: 'POST',
          body: createFormData(photo)
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response)
            setResult(response)
            setLoading(false)
          })
          
          .catch((error) => {
            console.log('error', error);
          });

          setLoading(true)

      };  



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
        setUri(result.uri)

        handleUploadPhoto(result)
        
      };

    // async function pickImage() {

    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });
  
    //   console.log(result);
    //   setPhoto(result)

    //   setUri(result.uri)

    //   handleUploadPhoto()
      

    // }

    return(
       <View style={styles.container}>
           <View style={styles.imageContainer}>
            <View style={styles.image}>
            <Image source={{ uri: uri }} style={{ width: 100, height: 100 }} />
            </View>
             <Button style={styles.uploadImageBtn} onPress={pickImage}> Upload Image </Button>
           </View>
           <View style={styles.infoContainer}>
            {loading ? ( <Spinner size="lg" color="#FF3535"/>  ) : (<Text>{result}</Text>) }
             
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    imageContainer: {
        flex: 2,
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },

    infoContainer:{
        flex: 6,
        
    },

    image:{
        flex: 3
    },

    uploadImageBtn:{
        flex: 3,
        height: 40,
        margin: 30,
        backgroundColor: '#FF3535'
        
    },

})