import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import UserForm from './userForm';
import {signIn} from '../../loginUtils';


class LoginUser extends Component {

    loginUser = async({email, password}) => {
        try{
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
        <Text style={styles.formHeader}>Login</Text>
        <UserForm 
            onSubmit={this.loginUser}
            type="Login" 
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

const signinUser = gql `
    mutation signinUser($email: String!, $password: String!){
        signinUser(email:{email: $email, password: $password}) {
            token
        }
    }
`;

export default graphql(signinUser, {name: "signinUser"})(LoginUser);