import React, { useState } from 'react';
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box, Button, FormControlLabel } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import {DropzoneDialog} from 'material-ui-dropzone'
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
  onOpenTodoList,
  onExport,
  onImport
}) => {
  const [dropZoneOpened, setDropZoneOpen] = useState(false);
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
  const handleSave = (files) => {
    var readFile = new FileReader();
    readFile.onload = function(e) { 
        var contents = e.target.result;
        try {
          const data = JSON.parse(contents);
          onImport(data)
        } catch (e) {
          alert('invalid data')
        }
        setDropZoneOpen(false);
    };
    readFile.readAsBinaryString(files[0]);
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
      <div>
      <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={() => setDropZoneOpen(true)}
      >
        <CloudDownloadOutlinedIcon className={classes.leftIcon} />
        import
      </Button>
      <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={onExport}
      >
        <CloudDownloadOutlinedIcon className={classes.leftIcon} />
        Export
      </Button>
      <Button
          size="large"
          variant="contained"
          className={classes.button}
          onClick={onOpenTodoList}
      >
        <PlaylistAddCheckIcon className={classes.leftIcon} />
        Todo list
      </Button>
      <DropzoneDialog
        open={dropZoneOpened}
        onSave={handleSave}
        showPreviewsInDropzone
        filesLimit={1}
        acceptedFiles={['application/json']}
        showPreviews={false}
      />
      </div>
    </Box>
  )
}

export default Side;