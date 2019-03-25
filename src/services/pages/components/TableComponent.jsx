/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class TableComponent extends Component {

  componentDidMount() {
    this.props.subscribeToNewUsers();
  }

  tableBody = (data) => {
    const { classes, onSelect } = this.props;
    return data.getAllUser.map(dataItem => (
      <TableRow
        key={dataItem._id}
        className={classes.tableRow}
      >
        <TableCell align='center' onClick={() => onSelect(dataItem._id)}>
          {dataItem.name}
        </TableCell>
      </TableRow>
    ));
  };

  render() {
    const {
      classes,
      data,
    } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableBody>{this.tableBody(data)}</TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}
TableComponent.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  data: PropTypes.arrayOf.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  subscribeToNewUsers: PropTypes.func.isRequired,
};
export default withStyles(styles)(TableComponent);