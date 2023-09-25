import React from 'react';
import { Button } from '@mui/material';

const Theme_Button = ({ color, fontFamily, textColor, background, label }) => {
  const buttonStyle = {
    backgroundColor: background,
    color: textColor,
    fontFamily: fontFamily,
  };

  return (
    < Button style={buttonStyle} variant='contained'>
      {label}
    </ Button>
  );
};

export default Theme_Button;
