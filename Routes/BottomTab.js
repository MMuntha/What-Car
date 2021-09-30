import React from 'react';
import { ImageComponent, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile'
import Search from '../Screens/Search'
import Add_Post from '../Screens/Add_Post';

import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator()

export default function BottomTab(){

    return(
        <Tab.Navigator
          screenOptions={{ showIcon: true, tabBarShowLabel: false }}
        >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused}) => (
                focused ?<Ionicons name="home" size={24} color="red" /> : <Ionicons name="home-outline" size={24} color="gray" />  
              ),
              tabBarActiveTintColor: 'red',
              tabBarInactiveTintColor: 'gray',

            }}  
            
          />

          <Tab.Screen name="Search" component={Search}
            options={{
                tabBarIcon: ({focused}) => (
                  focused ?<Ionicons name="search" size={24} color="red" />: <Ionicons name="search" size={24} color="gray" /> 
                ),
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
               
            }}
            
          />  
          
          <Tab.Screen name="Add_Post" component={Add_Post}
            options={{
                tabBarIcon: ({focused}) => (
                  focused ?<Ionicons name="add" size={32} color="red" />: <Ionicons name="add" size={32} color="gray" /> 
                ),
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'gray',
               
            }}

          
          />
        </Tab.Navigator>
    )
}