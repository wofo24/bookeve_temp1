import React from 'react';
import {Typography } from '@mui/material';

const Theme_Heading = ({ fontFamily, textColor, label }) => {
    const buttonStyle = {
        color: textColor,
        fontFamily: fontFamily,
    };

    return (
        < Typography style={buttonStyle} variant='h2'>
            {label}
        </ Typography>
    );
};

export default Theme_Heading;
