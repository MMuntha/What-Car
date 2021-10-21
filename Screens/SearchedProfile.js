import { ScrollView } from 'native-base';
import React, {useEffect, useState, useContext } from 'react';
import {Text, View, StyleSheet, Image, FlatList, Dimensions, Modal, Button,TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import { backgroundColor, borderRadius, maxHeight, padding, width } from 'styled-system';
import { background } from 'styled-system';
import SearchedProfileHeader from '../Components/SearchedProfileHeader';
import Card from '../Components/Card';
import { CredintialsContext } from '../Components/CredintialContext';
export default function SearchedProfile({ route, navigation}){

    const {storedCredintials, setStoredCredintials} = useContext(CredintialsContext)
    const {user_email, user_username, _id} = storedCredintials

    const {searchedId} = route.params //visiting profile id
    const [userDetails, setUserDetails] = useState('')
    const [posts, setPosts] = useState('')
    const [loading, setLoading] = useState(false)
    
    const [showModal, setShowModal] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [comment, setComments] = useState([])
    const [commentVisible, setCommentVisible] = useState(false)


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
            setPosts(response.posts)
            

            
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => setLoading(false))
        
        setLoading(true)

       
    }

    const addComment = () => {

        const commentOnId = searchedId;
        const commentedBy = user_username;
        const commentedById = _id;
        const comment = newComment;

        
        fetch('http://192.168.1.15:3000/general/addComment', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentedOnId : commentOnId,
                commentedBy : commentedBy,
                commentedById : commentedById,
                comment: comment
            })
        })
        .then((response) => response.json())
        .then((response) => {
        
            console.log(response.result)
            
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
           // console.log(response.user)
            setUserDetails(response.user)
            console.log(response.user.comments.length)
            setComments(response.user.comments)

            if(response.user.comments.length > 0) {
                setCommentVisible(true)
            }

            
            
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            setLoading(false)
        })

        vehiDetails()

        setLoading(true)


      },[]);

      if(loading){
            return(
                <ActivityIndicator/>
            )
      }
      else
      {
        return(
        
            <View style={styles.container}>
                <Modal visible={showModal}  animationType="slide">
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeaderTextContainer}>
                                <Text style={styles.modalHeaderText}>Write a Review</Text>
                                <Button title="add" onPress={addComment}/>
    
                            </View>
                            <View style={{}}>
                                <TextInput
                                multiline
                                placeholder="Write review"
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
                   <SearchedProfileHeader onPress={() => setShowModal(true)} postCount={userDetails.no_of_posts} proImage={userDetails.pro_image}/>
               </View>
               <View style={{flex: 2, }} >
                
                {commentVisible?
                
                <FlatList
                    data={comment}
                    horizontal={true}
                    keyExtractor={(item) => item._id}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={styles.reviewContaineer}>
                                <Text style={styles.commentedByText}>{item.commentedBy} </Text>
                                <Text style={styles.commentText}>{item.comment}</Text> 
                        </View>
                    )}
                /> :

                <View style={styles.reviewContaineer}>
                    <Text style={styles.commentText}>No Reviews</Text>
                </View>
             } 
             

                
                   
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

    },
    commentedByText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 18
    },
    commentText: {
        fontFamily: 'Helvetica',
        fontSize: 15
    }

})