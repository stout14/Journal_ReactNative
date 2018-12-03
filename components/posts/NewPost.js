import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PostForm from './postForm';

export default class NewPost extends Component {

  newPost = ({title, body}) => {
    console.log(title, body);
    
  };  

  render() {
    return (
      <View>
        <PostForm onSubmit={this.newPost} />
      </View>
    );
  }
}
