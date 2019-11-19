import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Box } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlined from '@material-ui/icons/ClearOutlined';

const TodoItem = ({
  id,
  value,
  onChange,
  completed
}) => {
  const [isEditing, setIsEditing] = useState(value === '');
  return isEditing
    ? (
      <TextField
        fullWidth
        margin="none"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CheckOutlinedIcon onClick={() => { value !== '' && setIsEditing(false) }} />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={onChange}
      />)
    : (
      <ListItemText
        id={id}
        primary={completed ? <s>{value}</s> : value}
        onClick={() => setIsEditing(true)}
      />
    )
};

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minWidth: '500px',

  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    maxHeight: '500px',
    overflow: 'scroll'
  },
  footer: {
    marginTop: '30px',
  }
}));

const TodoList = (props) => {
  const classes = useStyles();
  const handleInputChange = (e, idx) => {
    props.onInputChange(e.target.value, idx);
  }
  return (
    <div>
      <Modal
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div className={classes.header}>
              <Typography variant="h4">
                Todo List
              </Typography>
            </div>
            {
              props.todos.length > 0
                ?
                <div>
                  <List className={classes.root}>
                    {props.todos.map((todo, index) => {
                      return (
                        <ListItem key={index} role={undefined}>
                          <ListItemIcon>
                            <Checkbox
                              onClick={() => props.onCheckChange(index)}
                              edge="start"
                              checked={todo.completed}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <TodoItem
                            value={todo.desc}
                            onChange={(e) => handleInputChange(e, index)}
                            completed={todo.completed}
                          />
                          <ListItemIcon>
                            <ClearOutlined onClick={() => props.onDelete(index)} />
                          </ListItemIcon>

                        </ListItem >
                      );
                    })}
                  </List>
                </div>
                :
                <p>No todos </p>}
            <div className={classes.footer}>
              <Button
                size="large"
                variant="contained"
                onClick={props.onAddTodo}
              >
                Add
            </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TodoList;