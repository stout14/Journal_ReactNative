import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import {List, ListItem, Body, Right, Icon, } from 'native-base';
import Swipeout from 'react-native-swipeout';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Posts extends Component {
  render() {
      const {loading, allPosts, navigation} = this.props;

      if(loading) return <View style={[styles.container, styles.activityindicater]}><ActivityIndicator size="large" /></View>;

    return (        
      <View>
          <List>          
            <FlatList             
                data={allPosts}
                renderItem={({item}) => (
                <ListItem onPress={()=> navigation.navigate("Post", {id: item.id, title: item.title})} >                                 
                    <Body ><Text>{item.title}</Text></Body> 
                    <Right><Icon ios='ios-arrow-forward' android="md-arrow-forward" /></Right>                                                                
                </ListItem>)}
                keyExtractor={item => item.id}
            />           
        </List>
      </View>      
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "space-between",
    },
    activityindicater:{
      flex: 1,
      justifyContent: "space-around",
      flexDirection: 'row',
      padding: 10,
  },
  });

const postsQuery = gql `
    query postsQuery{
        allPosts (orderBy: createdAt_DESC){
        id
        title
        }
    }
`;

export default graphql(postsQuery, {
    props: ({data}) => ({...data})
})(Posts);
