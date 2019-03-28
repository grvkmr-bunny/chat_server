import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { TableComponent, ChatDialog } from  './index'

const GET_USERS = gql`
  {
    getAllUser {
      id
      name
      email
    }
  }
`;

const USER_SUBSCRIPTION = gql`
  subscription {
    userAdded{
      id
      name
      email
    }
  }
`;

let unsubscribe = null;

const styles = () => ({
  progress: {
    color: green[800],
    position: 'absolute',
  },
});

class AvailableUsers extends Component {
  state = {
    open: false,
  };

  handleSelect = (id) => {
    // const { match, history } = this.props;
    // history.push(`${match.url}/${id}`);
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
    });
  }  

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <Query
        query={GET_USERS}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <CircularProgress className={classes.progress} size={20} />;
          if (error) return <p>{error.message}</p>;
          const { id, name, email } = data.getAllUser[data.getAllUser.length-1];
          let value = [id, name, email]
          localStorage.setItem("loginUser", JSON.stringify(value));
          if (!unsubscribe) {
            unsubscribe = subscribeToMore ({
              document: USER_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newData = subscriptionData.data;
                const { id, name, email } = newData;
                let value = [id, name, email]
                localStorage.setItem("loginUser", JSON.stringify(value));
                return {
                  ...prev,
                  getAllUser: [...prev.getAllUser, newData.userAdded]
                };
              }
            });
          }
          let loginData = JSON.parse(localStorage.getItem("loginUser"));
          return (
            <>
              <TableComponent
                id="id"
                subscribeToMore={() => unsubscribe}
                loginData={loginData}
                data={data}
                onSelect={this.handleSelect}
              />
              <ChatDialog
                maxWidth="xl"
                open={open}
                
                onClose={this.handleClose}
              />
            </>
          )  
        }}
      </Query>
    );
  }
}
AvailableUsers.propTypes = {
  match: PropTypes.objectOf,
  history: PropTypes.objectOf,
  classes: PropTypes.objectOf.isRequired,
};
AvailableUsers.defaultProps = {
  match: {},
  history: {},
};
export default withStyles(styles)(AvailableUsers);