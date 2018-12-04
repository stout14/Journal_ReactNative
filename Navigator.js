import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight, ActivityIndicator } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {Fab, Icon, ScrollView} from 'native-base';
import Post from './components/posts/post';
import NewPost from './components/posts/NewPost';
import Posts from './components/posts/Posts';
import navStyles from './styles/navStyles';
import Login from './components/user/login';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends React.Component {
    static navigationOptions = {
      title: "Home",
      ...navStyles,
    };
  
    goToPost = () => {
      this.props.navigation.navigate('Post');
    };

    newPost = () => {
        this.props.navigation.navigate('NewPost');
      };
  
    render() {
      return (                
        <View style={styles.container}>          
          <Posts {...this.props}/>
          <Fab onPress={this.newPost} style={styles.newPost}>
            <Icon ios="ios-add" android="md-add" />
          </Fab>            
        </View>               
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: "space-between",
    },
    newPost:{
        backgroundColor:"#82D8D8",        
    },
    newPostText:{
        fontSize:20,
        textAlign: "center",
    },
    activityindicater:{
      flex: 1,
      justifyContent: "space-around",
      flexDirection: 'row',
      padding: 10,
  },
  });

const AppNavigator = createStackNavigator({
    Home: {
      screen: Home
    },
    Post:{
      screen: Post
    },
    NewPost:{
        screen: NewPost
    }
  });

  const AppContainer = createAppContainer(AppNavigator);

  const NavWrapper = ({loading, user}) => {
    console.log(user);
    
    if (loading) return <View style={[styles.container, styles.activityindicater]}><ActivityIndicator size="large" /></View> ;
    if (!user) return <Login />;
    return <AppContainer />
  };

  const userQuery = gql `
    query userQuery {
      user{
        id
        email
      }
    }
  `;

  export default graphql(
    userQuery, 
    {props: ({data}) => ({...data})}
  ) (NavWrapper);

