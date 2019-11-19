import React from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box, Button, FormControlLabel } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
// import {blue, deepPurple} from '@material-ui/core/colors'
import moment from 'moment';
// const blueTheme = createMuiTheme({ palette: { primary: deepPurple } })

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
  onCheckChange,
  onOpenTodoList
}) => {
  const classes = useStyles();
  const now = moment().toISOString();
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
    <Box pl={3} className="side" display="flex" flexDirection="column" justifyContent="space-between">
      {/* <MuiThemeProvider theme={blueTheme}> */}
      <div>
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
      {/* </MuiThemeProvider> */}

      <Box display="flex" justifyContent="center">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox 
              checked={checkedTypes.includes('TODO')}
              onChange={handleChange('TODO')}
            />
          }
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
      </div>
      <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={onOpenTodoList}
      >
        <PlaylistAddCheckIcon className={classes.leftIcon} />
        Todo list
      </Button>
    </Box>
  )
}

export default Side;