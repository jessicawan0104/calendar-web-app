import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EventPopOverContainer from './EventPopOverContainer';
import EventPopOverContent from './EventPopOverContent';
import { MainViewButtonGroup, ShareViewButtonGroup } from './EventPopOverButtonGroups';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { isEqual } from 'lodash';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as firebase from 'firebase';
import { convertMomentTOIsoString } from '../Containers/Calendar';
const useStyles = makeStyles(theme => ({
  select: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const VIEWS = {
  MAIN: "MAIN",
  SHARE: "SHARE"
}

const EventPopOver = ({
  anchorEl,
  onClose,
  event,
  onSave,
  onDelete,
  users
}) => {
  const [view, setView] = useState(VIEWS.MAIN)
  const [editEvent, setEditEvent] = useState(event);
  const [origEvent, setOrigEvent] = useState(event);
  const [selectedUser, setSelectedUser] = useState('');
  const classes = useStyles();


  useEffect(() => {
    setEditEvent(event);
    setOrigEvent(event);
    setView(VIEWS.MAIN);
  }, [event]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setEditEvent({ ...editEvent, title });
  };

  const handleSave = () => {
    onSave(editEvent);
    onClose();
  };

  const handleDateChange = dateType => dateMoment => {
    const date = dateMoment.toDate()
    setEditEvent({
      ...editEvent,
      [dateType]: date
    });
  };

  const handleDescChange = (e) => {
    const desc = e.target.value;
    setEditEvent({
      ...editEvent,
      desc
    });
  }

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setEditEvent({
      ...editEvent,
      type
    });
  }

  const isSaveDisabled = editEvent.end < editEvent.start;

  const handlePopOverClose = () => {
    if (isEqual(editEvent, origEvent) || isSaveDisabled) {
      onClose()
    } else {
      handleSave()
    }
  }

  const handleDelete = () => onDelete(event);

  const handleSelectUser = (e) => {
    setSelectedUser(e.target.value);
  }

  const handleClickShare = () => {
    setView(VIEWS.SHARE)
  }

  const handleShareViewCancel = () => {
    setView(VIEWS.MAIN)
  }

  const handleShare = () => {
    const selectedUserRef = firebase.firestore().collection('events').doc(selectedUser);
    selectedUserRef.get().then((doc) => {
      if(!doc.exists) { return; }
      const currEvents = doc.data().events;
      const newEvents = [...currEvents, ...convertMomentTOIsoString([event]) ]
      selectedUserRef.update({
        events: convertMomentTOIsoString(newEvents),
      })
      
    })
  }

  const renderMainView = () => (
    <>
      <EventPopOverContent
        start={editEvent.start}
        end={editEvent.end}
        desc={editEvent.desc}
        title={editEvent.title || ''}
        type={editEvent.type}
        onStartChange={handleDateChange('start')}
        onEndChange={handleDateChange('end')}
        onDescChange={handleDescChange}
        onTitleChange={handleTitleChange}
        onTypeChange={handleTypeChange}
        onClickShare={handleClickShare}
      />

      <MainViewButtonGroup
        onClose={onClose}
        handleSave={handleSave}
        isSaveDisabled={isSaveDisabled}
        handleDelete={handleDelete}
      />
    </>
  )


  const renderShareView = () => (
    <>
      <Typography>Share the event to</Typography>
      <Box mr={2}>
        <FormControl margin="normal">
          <InputLabel>Users</InputLabel>
          <Select
            className={classes.select}
            name="users"
            label="Users"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            {users.map(user => (
              <MenuItem
                key={user.id}
                value={user.id}
              >
                {`${user.name}(${user.email})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ShareViewButtonGroup
        onCancel={handleShareViewCancel}
        onShare={handleShare}
        isShareDisabled={!Boolean(selectedUser)}
      />
    </>
  )


  return (
    <EventPopOverContainer anchorEl={anchorEl} handleClose={handlePopOverClose}>
      <Box p={3}>
        {view === VIEWS.MAIN
          ? renderMainView()
          : renderShareView()
        }
      </Box>
    </EventPopOverContainer>
  )
}

export default EventPopOver;