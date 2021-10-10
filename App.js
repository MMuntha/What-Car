import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import Login from './Screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './Routes/RootStack';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredintialsContext } from './Components/CredintialContext';


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredintials, setStoredCredintials] = useState("")

  const checkLoginCredintials = async() => {
    try{
        const credintial = await AsyncStorage.getItem('car-login')
        if(credintial !== null){
          setStoredCredintials(JSON.parse(credintial))
        }
        else{
          setStoredCredintials(null)
        }
    }
    catch(e){
      console.log(e)
    }
  }

  if(!appReady){
     return(
       <AppLoading
       startAsync={checkLoginCredintials}
       onFinish={() => {setAppReady(true)}}
       onError={console.warn} 
       />
     )
  }

  return (
  
  <CredintialsContext.Provider value={{storedCredintials, setStoredCredintials}}>
          <RootStack/>
        
  </CredintialsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
