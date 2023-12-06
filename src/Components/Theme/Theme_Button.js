import React from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

const Theme_Button = ({ borderRadius, funBtn, label, mt, ml, mr, mb, px }) => {
  const buttonStyles = useSelector((state) => state.apply_new_theme)
  return (
    < Button onClick={funBtn} sx={{ mt: mt, ml: ml, borderRadius: borderRadius, px:px }} style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained'>
      {label}
    </ Button>
  );
};

export default Theme_Button;
