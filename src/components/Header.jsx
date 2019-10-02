import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import * as firebase from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  name: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    cursor: 'pointer'
  }
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    firebase.auth().signOut();
  }

  const menuId = 'user-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      getContentAnchorEl={null}
      id={menuId}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogOut}>log out</MenuItem>
    </Menu>
  );

  const { displayName, photoURL } = firebase.auth().currentUser;


  const renderAvatar = () => {
    const shortName = displayName
      .split(' ')
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .map(name => name.charAt(0).toUpperCase());
    return photoURL
      ? <Avatar className={classes.avatar} alt={displayName} src={photoURL} onClick={handleMenuOpen}/>
      : <Avatar className={classes.avatar} onClick={handleMenuOpen}>{shortName}</Avatar>
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Calendar App
          </Typography>
          <p className={classes.name}>{firebase.auth().currentUser.displayName}</p>
          {renderAvatar()}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  )
};

export default Header;