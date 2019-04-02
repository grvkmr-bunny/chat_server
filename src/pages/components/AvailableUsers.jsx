import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import { TableComponent, Messanger } from  './index'

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

const styles = () => ({
  progress: {
    color: green[800],
    position: 'absolute',
  },
});

class AvailableUsers extends Component {
  state = {
    open: false,
    selectData: {
      id: '',
      name: '',
    },
  };

  handleSelect = (id, name) => {
    this.setState({
      open: true,
      selectData: {
        id,
        name,
      }
    });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
    });
  }

  suscribeUser = (subscribeToMore) => {
    subscribeToMore ({
      document: USER_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newData = subscriptionData.data;
        console.log('+++++++++++++++', subscriptionData.data);
        // const { id, name, email } = newData;
        // let value = [id, name, email]
        // localStorage.setItem("loginUser", JSON.stringify(value));
        return {
          ...prev,
          getAllUser: [...prev.getAllUser, newData.userAdded]
        };
      }
    });  
  }

  render() {
    const { classes } = this.props;
    const { selectData, open } = this.state;
    return (
      <Query
        query={GET_USERS}
      >
        {({ subscribeToMore, loading, error, data }) => {
          if (loading) return <CircularProgress className={classes.progress} size={20} />;
          if (error) return <p>{error.message}</p>;
          // let loginData = JSON.parse(localStorage.getItem("loginUser"));
          // console.log(loginData);
          // const loginUserData = data.getAllUser.filter(data => data.email === loginData[1]);
          // console.log('Welcome', loginUserData);
          // localStorage.setItem("loginUserID", loginUserData[0].id);
          // let loginData = JSON.parse(localStorage.getItem("loginUser"));
          if (open) {
            return (
              <Messanger 
                open={open}
                selectData={selectData}
                onClose={this.handleClose}
              />
            )
          }
          return (
            <TableComponent
              id="id"
              subscribeToMore={() => this.suscribeUser(subscribeToMore)}
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
  classes: PropTypes.objectOf.isRequired,
  open: PropTypes.bool.isRequired,
};
export default withStyles(styles)(AvailableUsers);