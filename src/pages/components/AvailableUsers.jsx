import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import { TableComponent } from  './index'

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

let unsubscribe = null;

class AvailableUsers extends Component {
  handleSelect = (id) => {
    const { match, history } = this.props;
    history.push(`${match.url}/${id}`);
  };

  render() {
    return (
      <Query
      query={GET_USERS}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;

          if (!unsubscribe) {
            unsubscribe = subscribeToMore ({
              document: USER_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newData = subscriptionData.data;
                return {
                  ...prev,
                  getAllUser: [...prev.getAllUser, newData.userAdded]
                };
              }
            });
          }
          return (
            <TableComponent
              id="id"
              subscribeToMore={() => unsubscribe}
              data={data}
              onSelect={this.handleSelect}
            />
          )  
        }}
      </Query>
    );
  }
}
AvailableUsers.propTypes = {
  match: PropTypes.objectOf,
  history: PropTypes.objectOf,
};
AvailableUsers.defaultProps = {
  match: {},
  history: {},
};

export default AvailableUsers;