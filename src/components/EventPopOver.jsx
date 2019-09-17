import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import EventPopOverContainer from './EventPopOverContainer';
import EventPopOverContent from './EventPopOverContent';
import Box from '@material-ui/core/Box';
import { isEqual } from 'lodash';
import DeleteIcon from '@material-ui/icons/Delete';

const EventPopOver = ({
  anchorEl,
  onClose,
  event,
  onSave,
  onDelete
}) => {
  const [editEvent, setEditEvent] = useState(event);
  const [origEvent, setOrigEvent] = useState(event);

  useEffect(() => {
    setEditEvent(event);
    setOrigEvent(event);
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


  return (
    <EventPopOverContainer anchorEl={anchorEl} handleClose={handlePopOverClose}>
      <Box p={3}>

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
        />

        <Box pt={3} display="flex" flexDirection="row-reverse" justifyContent="space-between">
          <div>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              color="primary"
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </div>
          <div>
            <Button onClick={handleDelete} color="secondary">
              <DeleteIcon/>
              Delete
            </Button>
          </div>
        </Box>

      </Box>
    </EventPopOverContainer>
  )
}

export default EventPopOver;