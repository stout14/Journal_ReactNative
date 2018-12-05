import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {withApollo} from 'react-apollo';
import CreateUser from './createUser';
import LoginUser from './loginUser';

class Login extends Component {
    state = {
        register: true,
    };

  render() {
    return (
      <View  style={styles.container}>
        {this.state.register ? (
            <CreateUser {...this.props} />
        ) : (
            <LoginUser {...this.props} />
        )}    
        <Button             
            onPress={() => this.setState({
                register: !this.state.register
            })} 
            title = {this.state.register ? 'Login' : 'Register'}  
        /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
    }
});

export default withApollo(Login)