import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  popOver: {
    minWidth: '800px',
  },
  paper: {
    minWidth: '800px'
  }
});

const Event = ({event}) => {

  return (
    <>
      <div id={`event-${event.id}`}>{event.title || '(No Title)'}</div>
    </>
  )
}

export default withStyles(styles)(Event);