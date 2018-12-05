import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {Form, Item, Input, Label} from 'native-base';

export default class PostForm extends Component {

    static defaultProps = {
        post: {}
    };

    state ={
        title: this.props.post.title || "",
        body: this.props.post.body || ""
    };

    submitForm = () => {
        console.log("post made");
        
        this.props.onSubmit({
            title: this.state.title,
            body: this.state.body,
        });
    };

  render() {
    return (
      <Form>
        <Item floatingLabel> 
            <Label>
                Title
            </Label>
            <Input                
                onChangeText={title => this.setState({title})}
                value={this.state.title}
            />
        </Item>
        <Item floatingLabel>
            <Label>
                Body
            </Label>
            <Input
                multiline
                style={styles.body}
                onChangeText={body => this.setState({body})}
                value={this.state.body}
            />
        </Item>

        <Button title="Save Post" onPress={this.submitForm} color="#82D8D8"/>
      </Form>
    );
  }
}

const styles = StyleSheet.create({
    body:{
        height:100,
        textAlignVertical: 'top',
    },
  });
