import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';

// const styles = () => ({
//   progress: {
//     color: green[800],
//     position: 'absolute',
//   },
// });

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

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $sender: ID!, $receiver: ID!) {
    sendMessage(text: $text, sender: $sender, receiver: $receiver) {
      id
      text
      sender
      receiver
    }
  }
`;

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


class ChatDialog extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    const { subscribeToMore } = this.props;
    subscribeToMore && subscribeToMore();
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleSend = (sendMessage) => {
    const { match } = this.props;
    const { message } = this.state;
    const receiverId = match.params.id;
    const senderID = JSON.parse(localStorage.getItem("loginUser"))[0];
    sendMessage({ variables: { text: message, sender: senderID, receiver: receiverId }})
    this.setState({
      message: ''
    });
  };

  render() {
    const {
      open,
      onClose,
      maxWidth,
      classes,
      match,
    } = this.props;
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
            <>
              <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
                <DialogTitle id="alert-dialog-title">My Chat</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  <Paper className={classes.root}>
                    {/* {data.getMessage.map(message => message.text)} */}
                    
                  </Paper>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <div className={classes.container}>
                    <TextField
                      id="filled-full-width"
                      placeholder="Type Message"
                      value={this.state.message}
                      name="message"
                      className={classes.textField}
                      variant="filled"
                      onChange={this.handleChange('message')}
                    />
                    <Mutation mutation={SEND_MESSAGE}>
                      {(sendMessage, { data }) => (
                        <Fab color="primary"
                          onClick={() => this.handleSend(sendMessage)}
                        >
                          <SendIcon />
                        </Fab>
                      )}
                    </Mutation> 
                  </div>
                </DialogActions>
              </Dialog>
            </>
          )
        }}
      </Query>
    );
  }
}
ChatDialog.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
ChatDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
};
export default withStyles(styles)(ChatDialog);