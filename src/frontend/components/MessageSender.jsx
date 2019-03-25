import gql from "graphql-tag";
import React from 'react';
import { Query } from "react-apollo";
import { TableComponent } from  '../../services/pages/components'

const GET_USERS = gql`
  {
    getAllUser {
      id
      name
    }
  }
`;

const USER_SUBSCRIPTION = gql`
  subscription {
    userAdded{
      id
      name
    }
  }
`;

const MessageSender = () => ApolloMessage();

const ApolloMessage = () => 
  (
    <Query
      query={GET_USERS}
    >
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error.message}</p>;

        return <TableComponent
          id="id"
          subscribeToNewUsers={() =>
            subscribeToMore({
              document: USER_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.userAdded;
                // console.log('999999999999999', newFeedItem);
                // console.log('+++++++++++++++++++++', prev.getAllUser);
                // console.log('777777777777777', prev.data);
                // console.log('****************', ...prev.data.getAllUser);
                console.log('88888888888888888', Object.assign({}, prev.getAllUser, newFeedItem));
                return Object.assign({}, prev, {
                  data: {
                    getAllUser: [newFeedItem, ...prev.getAllUser]
                  }
                });
              }
            })
          }
          data={data}
          // onSelect={this.handleSelect}
        />
      }}
    </Query>
  )

export default MessageSender;