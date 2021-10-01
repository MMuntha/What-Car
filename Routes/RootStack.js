import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import { CredintialsContext } from '../Components/CredintialContext';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function RootStack(){

    return(
        <CredintialsContext.Consumer>
            {({storedCredintials}) => (
                <NavigationContainer>
                <Stack.Navigator>
                    {storedCredintials ? 
                        ( <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown: false}}/> ) : (
                        
                        <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}}/>

                          )   
                    }
               
                 </Stack.Navigator>
                 </NavigationContainer>
                
            )}
        </CredintialsContext.Consumer>
        
    )
}