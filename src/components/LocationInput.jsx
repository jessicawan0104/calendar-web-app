import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PlacesAutocomplete from 'react-places-autocomplete';

const useStyles = makeStyles({
  popup: {
    zIndex: 1301,
  },
});

const LocationInput = ({address, onAddressChange}) => {
  const classes = useStyles();

  const handleChange = address => {
    onAddressChange(address);
  };

  const handleSelect = address => {
    onAddressChange(address)
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      debounce={300}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Autocomplete
          classes={{
            popup: classes.popup
          }}
          autoComplete={true}
          options={suggestions}
          includeInputInList
          loading={loading}
          getOptionLabel={option => option.description}
          // style={{ width: 500 }}
          open={suggestions.length > 0}
          disableClearable
          
          renderInput={params => {
            const newProps = {
              ...params,
              inputProps: {
                ...params.inputProps,
                value: getInputProps().value,
                onChange: getInputProps().onChange
              },
            }
            return (<TextField {...newProps} fullWidth id="location-input" label="Location"/>)
          }}
          renderOption={(option) => {
            return (
              <div {...getSuggestionItemProps(option)}><span>{option.description}</span></div>
            )
          }}
        >
        </Autocomplete>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationInput;