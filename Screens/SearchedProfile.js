import { ScrollView } from 'native-base';
import React, {useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, FlatList, Dimensions, Modal, Button,TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { backgroundColor, borderRadius, maxHeight, padding, width } from 'styled-system';
import { background } from 'styled-system';
import SearchedProfileHeader from '../Components/SearchedProfileHeader';
import Card from '../Components/Card';
export default function SearchedProfile({ route, navigation}){

    const {searchedId} = route.params
    const [userDetails, setUserDetails] = useState('')
    const [posts, setPosts] = useState('')
    
    const [showModal, setShowModal] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [comment, setComments] = useState([
        { id: '1', name: "jason", comment: 'very polite dealer'},
        { id: '2', name: "jason", comment: 'very polite dealer'},
        { id: '3', name: "jason", comment: 'very polite dealer'},
        { id: '4', name: "jason", comment: 'very polite dealer'},
        { id: '5', name: "jason", comment: 'very polite dealer'},
        
    ])

    const vehiDetails = () => {

    

        fetch('http://192.168.1.15:3000/general/findAllById', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: searchedId
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.posts)
            setPosts(response.posts)

            
        })
        .catch((error) => {
            console.log(error)
        })
        
       
    }

    useEffect(() => {

        fetch('http://192.168.1.15:3000/general/userDetails', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: searchedId
            })
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.user)
            setUserDetails(response.user)

            
        })
        .catch((error) => {
            console.log(error)
        })
        //.finally(() => isLoading(false))

        vehiDetails()

      },[]);


    return(
        
        <View style={styles.container}>
            <Modal visible={showModal}  animationType="slide">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeaderTextContainer}>
                            <Text style={styles.modalHeaderText}>Write a Review</Text>
                            <Button title="add" onPress={() => {comment.push(newComment)}}/>

                        </View>
                        <View style={{}}>
                            <TextInput
                            multiline
                            numberOfLines={4}
                                onChangeText={(val) => setNewComment(val)}
                            style={styles.modalInput}
                            />
                        </View>
                        <Button title="close" onPress={() => setShowModal(false)}/>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

           <View style={styles.headerContainer}>
               <SearchedProfileHeader onPress={() => setShowModal(true)} postCount={userDetails.no_of_posts} />
           </View>
           <View style={{flex: 2}} >
               <FlatList
                    data={comment}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={styles.reviewContaineer}>
                                <Text>{item.comment}</Text>
                        </View>
                    )}
                />
           </View>
           <View style={styles.postContainer}>
               <FlatList
                data={posts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <Card model={item.model} postedBy={item.postedBy} image={item.image} />
                )}
             />
           </View>
        </View>
    )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({

    

    container: {
        padding: 5,
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reviewContaineer: {
        flex: 2,
        backgroundColor: '#E7E7E7',
        padding: 5,
        borderRadius: 10,
        marginBottom: 5,
        width: windowWidth - 10,
        
    },
    postContainer: {
        flex: 5,
        backgroundColor: 'white'
    },
    
    modalContainer: {
        flex: 1,
        maxHeight: windowHeight / 3,
        //width: windowWidth ,
        marginTop: 50,
        marginRight: 5,
        marginLeft: 5,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    modalHeaderTextContainer: {
        justifyContent: 'center',
    },
    modalHeaderText: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        

    },
    modalInput: {
        width: windowWidth - 10,
        fontSize: 18,
        height: windowHeight / 5,
        backgroundColor: '#E7E7E7',
        borderRadius: 10,
        padding: 5

    }

})