import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  mutation SendMessage($text: String!, $sender: String!, $receiver: ID!) {
    sendMessage(text: $text, sender: $sender, receiver: $receiver) {
      id
      text
    }
  }
`;

class Messanger extends Component {
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
    const senderEmail = JSON.parse(localStorage.getItem("loginUser"))[1];
    sendMessage({ variables: { text: message, sender: senderEmail, receiver: receiverId }})
    this.setState({
      message: ''
    });
  };

  render() {
    const { classes, data } = this.props;
    return (
      <Paper className={classes.root}>
        <div>
          <Link component={RouterLink} to="/users" underline="none">
            <Button className={classes.button} color="primary" variant="outlined">
              BACK
            </Button>
          </Link>
        </div>
        {data.map(message => message.text)}
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
      </Paper>
    )
  }
}
Messanger.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf,
  subscribeToMore: PropTypes.func.isRequired,
};
Messanger.defaultProps = {
  match: {},
};
export default withStyles(styles)(Messanger);