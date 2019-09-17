import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, FormControlLabel } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Side = ({
  onCreate,
  checkedTypes,
  onCheckChange
}) => {
  const classes = useStyles();
  const now = moment();
  const handleCreate = () => {
    const newEvent = {
      title: 'NewEvent',
      start: now,
      end: now,
      slots: []
    }
    onCreate(newEvent);
  }

  const handleChange = name => () => {
    onCheckChange(name);
  }
  return (
    <Box pl={3} className="side">
      <Typography variant="h4" gutterBottom> Calendar App</Typography>
      <Button
        color="primary"
        size="large"
        variant="contained"
        className={classes.button}
        onClick={handleCreate}
      >
        <AddCircleIcon className={classes.leftIcon} />
        Create
      </Button>
      <Box display="flex" justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox 
            checked={checkedTypes.includes('TODO')}
            onChange={handleChange('TODO')}
          />}
          label="TODO"
        />
        <FormControlLabel
          control={<Checkbox 
            checked={checkedTypes.includes('EVENT')}
            onChange={handleChange('EVENT')}
          />}
          label="EVENT"
        />
        <FormControlLabel
          control={<Checkbox 
            checked={checkedTypes.includes('REMINDER')}
            onChange={handleChange('REMINDER')}
          />}
          label="REMINDER"
        />
      </FormGroup>
      </Box>
    </Box>
  )
}

export default Side;