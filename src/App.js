import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import Messanger from './frontend/components/Messanger';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <center><h1>hello world</h1></center>
        <Messanger />
      </div>
    </ApolloProvider>    
  );
}

export default App;