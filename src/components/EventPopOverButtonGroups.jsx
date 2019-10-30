import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';

export const MainViewButtonGroup = ({
  onClose,
  handleSave,
  isSaveDisabled,
  handleDelete
}) => {
  return (
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
          <DeleteIcon />
          Delete
      </Button>
      </div>
    </Box>
  )
}

export const ShareViewButtonGroup = ({
  onCancel,
  onShare,
  isShareDisabled
}) => {
  return (
    <Box pt={3} display="flex" justifyContent="space-between">
      <div>
        <Button onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          onClick={onShare}
          color="primary"
          disabled={isShareDisabled}
        >
          Share
        </Button>
      </div>

    </Box>
  )
}

