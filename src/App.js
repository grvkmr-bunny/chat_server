import React from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";


const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>
            {currency}: {rate}
          </p>
        </div>
      ));
    }}
  </Query>
)

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <center><h1>hello world</h1></center>
        <ExchangeRates />
      </div>
    </ApolloProvider>    
  );
}

export default App;
