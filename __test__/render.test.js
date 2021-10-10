import React from 'react';
import {render} from '@testing-library/react-native';

import App from '../App';
import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Search from '../Screens/Search';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp'
import Add_Post from '../Screens/Add_Post'

import AuthStack from '../Routes/AuthStack'
import BottomTab from '../Routes/BottomTab'
import HomeStack from '../Routes/HomeStack';
import RootStack from '../Routes/RootStack'

describe('Testing Screens ', () => {

    it('Testing App.js', () => {
        render(<App/>)
    })

    it('Testing Home Screen', () => {

        render(<Home/>)
    })

    it('Testing Profile Screen', () => {

        render(<Profile/>)
    }) 

    it('Testing Search Screen', () => {

        render(<Search/>)
    })

    it('Testing Login Screen', () => {

        render(<Login/>)
    })

    it('Testing SignUp Screen', () => {

        render(<SignUp/>)
    })

    it('Testing Add Post', () => {

        render(<Add_Post/>)
    })

})

describe('Testing Routes', () => {

    it('Testing Auth Route', () => {
        render(<AuthStack/>)
    })

    it('Testing Bottom Tab', () => {

        render(<BottomTab/>)
    })

    it('Testing Home Stack', () => {

        render(<HomeStack/>)
    })
    it('Testing RootStack', () => {

        render(<RootStack/>)
    })
})