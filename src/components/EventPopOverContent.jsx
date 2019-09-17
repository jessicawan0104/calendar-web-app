import React from 'react';
import {
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const EventPopOverContent = ({
  start,
  end,
  onStartChange,
  onEndChange,
  desc,
  onDescChange,
  title,
  onTitleChange,
  type,
  onTypeChange
}) => {
  return (
    <>
      <Box display="flex" spacing={2}>
        <Box mr={2}>
          <TextField
            label="Title"
            value={title}
            margin="normal"
            onChange={onTitleChange}
            placeholder="Add title"
            autoFocus
          />
        </Box>

        <FormControl margin="normal">
          <InputLabel>Type</InputLabel>
          <Select name="Type" label="Type" value={type || 'NONE'} onChange={onTypeChange}>
            <MenuItem value={'NONE'}>None</MenuItem>
            <MenuItem value={'TODO'}>TODO</MenuItem>
            <MenuItem value={'EVENT'}>Event</MenuItem>
            <MenuItem value={'REMINDER'}>Reminder</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex">
        <Box mr={1}>
          <KeyboardDateTimePicker
            autoOk
            ampm={false}
            label="Start date"
            value={start}
            onChange={onStartChange}
            // clearable
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
            // clearable
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
          placeholder="Add description"
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