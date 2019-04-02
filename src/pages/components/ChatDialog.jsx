import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    elevation: 0,
    position: 'relative',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  content: {
    position: 'sticky',
    marginBottom: theme.spacing.unit,
  },
  footer: {
    display: "flex",
    position: 'sticky',
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  flex: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
  // dialogPaper: {
  //   // minHeight: '55vh',
  //   // maxHeight: '55vh',
  //   // minWidth: '40.3vh',
  //   // maxWidth: '40.3vh',
  // },
  chipLeft: {
    textAlign: "left",
    margin: theme.spacing.unit,
  },
  chipRight: {
    textAlign: "right",
    margin: theme.spacing.unit,
  }
});

const GET_USERS = gql`
  {
    getAllUser {
      id
      name
      email
    }
  }
`;

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ChatDialog extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.props.subscribeToMore();
  }

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  handleSend = (sendMessage) => {
    const { selectData } = this.props;
    const { message } = this.state;
    const senderID = JSON.parse(localStorage.getItem("loginUser"))[0];
    sendMessage({ variables: { text: message, sender: senderID, receiver: selectData.id }})
    this.setState({
      message: ''
    });
  };

  render() {
    const {
      open,
      onClose,
      selectData,
      classes,
      messageData,
    } = this.props;
    const senderName = JSON.parse(localStorage.getItem("loginUser"))[1];
    const senderId = JSON.parse(localStorage.getItem("loginUser"))[0];
    return (
      <Query
        query={GET_USERS}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.message}</p>;
          return (
            <>
              <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                // classes={{ paper: classes.dialogPaper }}
                TransitionComponent={Transition}
              >
                <AppBar className={classes.content}>
                  <Toolbar>
                    <IconButton color="inherit" onClick={onClose} aria-label="Close">
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography align="center" variant="h6" color="inherit" className={classes.flex}>
                      {selectData.name}
                    </Typography>
                  </Toolbar>
                </AppBar>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {messageData.getMessage.map(message => {
                      let receiverData;
                      if (message.sender === senderId) {
                        return (
                          <div className={classes.chipRight}>
                            <Chip
                              avatar={<Avatar>{senderName.toUpperCase()[0]+senderName.toUpperCase()[senderName.length-1]}</Avatar>}
                              label={message.text}
                              color="primary"
                              variant="outlined"
                            />
                          </div>
                        )
                      } else {
                        // console.log('Inside 1st else', message.sender);
                        receiverData = data.getAllUser.filter(data => data.id === message.sender);
                        console.log('Inside 2nd else', receiverData);
                      }
                      return (
                        <div className={classes.chipLeft}>
                          <Chip
                            avatar={<Avatar>{receiverData[0].name.toUpperCase()[0]+receiverData[0].name.toUpperCase()[receiverData[0].name.length-1]}</Avatar>}
                            label={message.text}
                            color="primary"
                            variant="outlined"
                          />
                        </div>
                      )
                    })}
                  </DialogContentText>
                </DialogContent>
                <Typography className={classes.footer}>
                  <TextField
                    fullWidth
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
                      <Fab
                        onClick={() => this.handleSend(sendMessage)}
                      >
                        <SendIcon />
                      </Fab>
                    )}
                  </Mutation> 
                </Typography>
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
  messageData: PropTypes.objectOf.isRequired,
  open: PropTypes.bool,
  subscribeToMore: PropTypes.func.isRequired,
  selectData: PropTypes.objectOf.isRequired,
};
ChatDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
};
export default withStyles(styles)(ChatDialog);