import React from 'react';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';
import Navigator from './Navigator';
import {getToken} from './loginUtils';

const authLink = setContext(async (req, {headers}) => {
  const token = await getToken();
  console.log(token);
  
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  }
});

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjp7ck0p7ay7n014083caa8af"
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
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





