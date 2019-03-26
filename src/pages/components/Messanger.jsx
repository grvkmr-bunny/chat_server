import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
// import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { NoMatch } from '.';

const styles = theme => ({
  root: {
    width: '50%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    elevation: 10,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    align: 'right'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 70,
  },
  textField: {
    marginRight: theme.spacing.unit,
    flexGrow: 1,
  },
});

// const getDateFormated = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

const GET_USERS = gql`
  {
    getAllUser {
      id
      name
    }
  }
`;

const GET_MESSAGE = gql`
  {
    getMessage {
      id
      name
    }
  }
`;

const Messanger = (props) => {
  const { classes, match } = props;
  return (
    <Query
      query={GET_USERS}
    >
      {({ subscribeToMore, loading, error, data }) => {
        if (loading) return <center><b>Loading...</b></center>;
        if (error) return <p>{error.message}</p>;
        // if (!unsubscribe) {
        //   unsubscribe = subscribeToMore ({
        //     document: USER_SUBSCRIPTION,
        //     updateQuery: (prev, { subscriptionData }) => {
        //       if (!subscriptionData.data) return prev;
        //       const newData = subscriptionData.data;
        //       return {
        //         ...prev,
        //         getAllUser: [...prev.getAllUser, newData.userAdded]
        //       };
        //     }
        //   });
        // }
        console.log(data);
        if (data.getAllUser.some(trainee => trainee.id === match.params.id)) {
          return (
            <Query
              query={GET_MESSAGE}
            >
              {({data}) => {
                // const item = data.getAllUser.filter(trainee => trainee.id === match.params.id);
                console.log('Inside Messanger', data);
                return (
                  <Paper className={classes.root}>
                    <div>
                      <Link component={RouterLink} to="/users" underline="none">
                        <Button className={classes.button} color="primary" variant="outlined">
                          BACK
                        </Button>
                      </Link>
                    </div>
                    {data}
                    <div className={classes.container}>
                      <TextField
                        id="filled-full-width"
                        placeholder="Type Message"
                        className={classes.textField}
                        variant="filled"
                      />
                      <Fab color="primary">
                        <SendIcon />
                      </Fab>
                    </div>
                  </Paper>
                )
              }}
            </Query>
          )
        }  
        return <NoMatch />;
      }}
    </Query>
  );
}
Messanger.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf,
};
Messanger.defaultProps = {
  match: {},
};
export default withStyles(styles)(Messanger);