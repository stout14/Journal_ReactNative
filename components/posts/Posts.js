import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Posts extends Component {
  render() {
      const {loading, allPosts, navigation} = this.props;

      if(loading) return <ActivityIndicator size="large" />;
      
    return (
      <View>
        <FlatList 
            data={allPosts}
            renderItem={({item}) => (
            <Text onPress={()=> navigation.navigate("Post", {id: item.id, title: item.title})} > 
                {item.title}                
            </Text>)}
            keyExtractor={item => item.id}
        />
        
      </View>
    );
  }
}

const postsQuery = gql `
    query postsQuery{
        allPosts{
        id
        title
        }
    }
`;

export default graphql(postsQuery, {
    props: ({data}) => ({...data})
})(Posts);
