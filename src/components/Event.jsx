import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EventPopOverContainer from './EventPopOverContainer';
import EventPopOverContent from './EventPopOverContent';

const styles = theme => ({
  popOver: {
    minWidth: '800px',
  },
  paper: {
    minWidth: '800px'
  }
});

const Event = ({event, classes}) => {

  return (
    <>
      <div id={`event-${event.id}`}>{event.title || '(No Title)'}</div>
    </>
  )
}

export default withStyles(styles)(Event);