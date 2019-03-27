import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;
export default class CreateUser extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    showData: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      name: '',
      email: '',
      showData: true,
    });
  }  

  handleSubmit = (addUser) => {
    const { name, email } = this.state;
    let value = [name, email]
    localStorage.setItem("loginUser", JSON.stringify(value));
    addUser({ variables: { name, email }});
    this.handleClose();
  }  

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const { open, name, email, showData } = this.state;
    return (
        <div>
          <Button align="center" onClick={this.handleClickOpen} variant="contained" color="primary">
            Start
          </Button>
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title"> Enter your details:</DialogTitle>
            <DialogContent>
              <TextField
                required
                fullWidth
                id="outlined-name"
                label="Name"
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                id="outlined-email"
                label="Email"
                value={email}
                onChange={this.handleChange('email')}
                margin="normal"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button variant='contained' onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Mutation mutation={ADD_USER}>
              {(addUser, { data }) => (
              <Button variant='contained' 
                onClick={() => this.handleSubmit(addUser)}
                color="primary"
              >
                Create
              </Button>
              )}
              </Mutation>
            </DialogActions>
          </Dialog>
          {showData ?  <Route><Redirect to="/users" /></Route> : ''}
        </div>
    );
  }
}