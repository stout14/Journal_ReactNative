import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './userForm';
import {signIn} from '../../loginUtils';

class CreateUser extends Component {

    createUser = async({email, password}) => {
        try{
            const user = await this.props.createUser({
                variables: {email, password}
            });
            const signin = await this.props.signinUser({
                variables: {email, password}
            });
            signIn(signin.data.signinUser.token); 
            this.props.client.resetStore();       
        } catch (e) {
            console.log(e);
            
        }
    };

  render() {
    return (
      <View>
        <Text style={styles.formHeader}>Register</Text>
        <UserForm 
            onSubmit={this.createUser}
            type="Register" 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    formHeader: {
        textAlign: "center",
        fontSize: 20,
    },
  });

const createUser = gql `
    mutation createUser($email: String!, $password: String!){
        createUser(authProvider: {email:{email: $email, password: $password} }) {
            id
        }
    }
`;

const signinUser = gql `
    mutation signinUser($email: String!, $password: String!){
        signinUser(email:{email: $email, password: $password}) {
            token
        }
    }
`;

export default compose(
    graphql(signinUser, {name: "signinUser"}),
    graphql(createUser, {name: "createUser"})
    ) (CreateUser);
