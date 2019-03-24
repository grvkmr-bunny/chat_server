import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';

export default class CreateUser extends React.Component {
  state = {
    open: false,
    name: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
  };

  getDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today =  yyyy + '-' + mm + '-' + dd;
    return today;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  render() {
    const { open, name, email, confirmPassword, password, gender } = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="contained" color="primary">
          Create New Account
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
            <Grid container spacing={16} alignContent='space-between' >
              <Grid item xs={6}>
                <TextField
                required
                fullWidth
                id="outlined-birthday"
                label="Birthday"
                type="date"
                defaultValue={this.getDate()}
                onChange={this.handleChange('birthday')}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-gender"
                  label="Gender"
                  value={gender}
                  onChange={this.handleChange('gender')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={16} alignContent='space-between' >
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-password"
                  label="Password"
                  value={password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="outlined-confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={this.handleChange('confirmPassword')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button variant='contained' onClick={this.handleClose} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}