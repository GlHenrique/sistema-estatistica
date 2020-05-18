import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router';

export default function GoBack() {
  const location = useHistory();

  return (
    <IconButton
      onClick={() => location.goBack()}
      style={{ margin: '10px' }}
      color="default"
    >
      <ArrowBack />
    </IconButton>
  );
}
