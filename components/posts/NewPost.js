import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PostForm from './postForm';
import navStyles from '../../styles/navStyles';

class NewPost extends Component {

  static navigationOptions = {    
    title: "NewPost",
    ...navStyles,
  };


  state ={
    loading: false
  }

  newPost = ({title, body}) => { 
    const{newPost, navigation} = this.props; 
    this.setState({loading: true});
    newPost({
      variables:{
        title,
        body
      }
    }).then(() => {
      navigation.goBack();
    }).catch(error => {
      this.setState({loading: false});
      console.log(error);      
    });
  };  

  render() {
    return (
      <View>
        {this.state.loading ? (<ActivityIndicator size="large"/>) : (<PostForm onSubmit={this.newPost} />)}       
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $body: String!){
    createPost(title: $title, body: $body){
      id
    }
  }
`

export default graphql(newPost, {
  name: 'newPost',
  options:{
    refetchQueries:["postsQuery"]
  }
}) (NewPost);