import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import Navigator from './Navigator';




const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjp7ck0p7ay7n014083caa8af"
  }),
  cache: new InMemoryCache()
});


export default class App extends React.Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}





