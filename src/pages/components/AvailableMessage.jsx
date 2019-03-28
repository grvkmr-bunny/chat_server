import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import { Messanger } from  './index'

const GET_MESSAGE = gql`
  query GetMessage($sender: ID!, $receiver: ID!) {
    getMessage(sender: $sender, receiver: $receiver) {
      id
      text
      sender
      receiver
    }
  } 
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription MessageSend($sender: ID!, $receiver: ID!) {
    messageSend(sender: $sender, receiver: $receiver) {
      id
      text
      sender
      receiver
    }
  }
`;

let unsubscribe = null;

class AvailableMessage extends Component {
  state = {
    message: '',
  };

  render() {
    const { match } =   this.props;
    const receiverId = match.params.id;
    const senderID = JSON.parse(localStorage.getItem("loginUser"))[0];
    return (
      <Query
        query={GET_MESSAGE}
        variables={{sender: senderID, receiver: receiverId}}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          if (!unsubscribe) {
            unsubscribe = subscribeToMore ({
              document: MESSAGE_SUBSCRIPTION,
              variables: { sender: senderID, receiver: receiverId },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newData = subscriptionData.data;
                return {
                  ...prev,
                  getMessage: [...prev.getMessage, newData.messageSend]
                };
              }
            });
          }
          return (
            <Messanger
              id="id"
              match={match}
              subscribeToMore={() => unsubscribe}
              // data={data.getMessage}
            />
          )   
        }}
      </Query>
    );
  }
}
AvailableMessage.propTypes = {
  match: PropTypes.objectOf,
  history: PropTypes.objectOf,
};
AvailableMessage.defaultProps = {
  match: {},
  history: {},
};

export default AvailableMessage;