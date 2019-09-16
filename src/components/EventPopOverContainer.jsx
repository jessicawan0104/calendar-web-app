import React from 'react';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  popOver: {
    width: '500px',
  },
  paper: {
    width: '500px'
  }
});

const EventPopOverContainer = ({anchorEl, handleClose, classes, children}) => {
  return (
    <Popover
    id="simple-popper"
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    className={classes.popOver}
    classes={{
      paper: classes.paper,
    }}
  >{children}</Popover>
  )
};

export default withStyles(styles)(EventPopOverContainer);