import React, {Component} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import navStyles from '../../styles/navStyles';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';


class Post extends Component{
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.title,
            ...navStyles,
        };
    };

    render(){       
        const{Post, loading} = this.props;
        if(loading) return <View style={[styles.container, styles.activityindicater]}><ActivityIndicator size="large" /></View>;
        return(
            <View style={styles.container}>
                <Text style={styles.bodyText}>{Post.body}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:20,        
    },
    bodyText:{
        fontSize:16,
    },
    activityindicater:{
        flex: 1,
        justifyContent: "space-around",
        flexDirection: 'row',
        padding: 10,
    },
  });

const postQuery = gql `
    query Post($id: ID!){
        Post(id: $id) {
            id           
            title   
            body         
        }
    }
`;

export default graphql(postQuery, {
    props: ({data}) => ({...data}),
    options: ({navigation}) => ({
        variables: {
            id: navigation.state.params.id
        }
    })
}) (Post);

