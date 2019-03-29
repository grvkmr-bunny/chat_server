import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
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
  },
  textField: {
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  flex: {
    flex: 1,
    marginLeft: theme.spacing.unit,
  },
  dialogPaper: {
    minHeight: '55vh',
    maxHeight: '55vh',
    minWidth: '40.3vh',
    maxWidth: '40.3vh',
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
    return (
      <>
        <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialogPaper }}>
          <AppBar className={classes.content}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {selectData.name}
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {messageData.getMessage.map(message =>
                <Chip
                  avatar={<Avatar>{senderName.toUpperCase()[0]+senderName.toUpperCase()[senderName.length-1]}</Avatar>}
                  label={message.text}
                  className={classes.chip}
                  color="primary"
                  variant="outlined"
                />
              )}
            </DialogContentText>
          </DialogContent>
          <AppBar className={classes.content}>
            <Toolbar>
              <TextField
                id="filled-full-width"
                placeholder="Type Message"
                value={this.state.message}
                
                name="message"
                className={classes.textField}
                // variant="filled"
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
            </Toolbar>
          </AppBar>
        </Dialog>
      </>
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