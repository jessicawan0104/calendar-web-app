import React, { useState } from 'react';
import {
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

const EventPopOverContent = ({ 
  start,
  end,
  onStartChange,
  onEndChange,
  desc,
  onDescChange
}) => {
  return (
    <>
      <Box display="flex">
        <Box mr={1}>
          <KeyboardDateTimePicker
            autoOk
            ampm={false}
            label="Start date"
            value={start}
            onChange={onStartChange}
            clearable
            showTodayButton
            format="YYYY/MM/DD HH:mm"
          />
        </Box>
        <Box ml={1}>
          <KeyboardDateTimePicker
            autoOk
            ampm={false}
            label="End Date"
            value={end}
            onChange={onEndChange}
            clearable
            showTodayButton
            format="YYYY/MM/DD HH:mm"
            minDate={start}
          />
        </Box>
      </Box>
      <Box>
        <TextField
          id="standard-textarea"
          label="Description"
          placeholder="Placeholder"
          multiline
          fullWidth
          rowsMax={3}
          value={desc}
          onChange={onDescChange}
        />
      </Box>
    </>
  )
}

export default EventPopOverContent;