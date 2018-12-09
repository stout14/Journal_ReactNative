import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import {List, ListItem, Body, Right, Icon, } from 'native-base';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Swipeout from 'react-native-swipeout';

class Posts extends Component {
  render() {
      const {navigation, screenProps} = this.props;

      state ={
        loading: false
      }
      
      deletePost = (id) => { 
          console.log("in delete post");
          
        const{updatePost, navigation, screenProps, deletePostMutation} = this.props; 
        this.setState({loading: true});
        deletePostMutation({
          variables:{
            id,

          }
        }).then(() => {
          navigation.goBack();
        }).catch(error => {
          this.setState({loading: false});
          console.log(error);      
        });
      };  

    return (        
      <View>
          <List>          
            <FlatList             
                data={screenProps.user.posts}
                renderItem={({item}) => (
                <ListItem onPress={()=> navigation.navigate("Post", {id: item.id, title: item.title})} >                                 
                    <Body ><Text>{item.title}</Text></Body> 
                     {/* <Right><Icon ios='ios-arrow-forward' android="md-arrow-forward" /></Right>   */}
                    <Button 
                        title="Delete" 
                        onPress={() => {
                            Alert.alert(
                                'Alert',
                                'Are you sure you want to delete?',[
                                    {text: 'No', onPress: () => console.log('no pressed')},
                                    {text: 'yes', onPress: () => {
                                        console.log("DELETE ", item.id );
                                       deletePost(item.id)
                                    }}
                                ]
                            )
                        }}
                        color="red"/>                                                              
                </ListItem>)}
                keyExtractor={item => item.id}
            />           
        </List>
      </View>      
    );
  }
}

const deleteQuery = gql `
mutation deletePostMutation($id: ID!) {
    deletePost(id: $id){
        id
    }
  }
`;


export default graphql(deleteQuery, {
    name: 'deletePostMutation',
    options:{
        refetchQueries:["userQuery"]
      }
  })(Posts);