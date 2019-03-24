import gql from "graphql-tag";
import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";

class MessageSender extends Component {

}

const ApolloMessage = () => (
    <Mutation
      mutation={gql`
        mutation MessageSenderMutation($text: String!, $user: String) 
        {
          sendMessage(text: $text, user: $user)
          {
            id
            text
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
      }}
    </Mutation>
  )

export default ApolloMessage;