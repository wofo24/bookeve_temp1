import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { theme_change, get_all_theme, apply_new_theme } from '../../Redux/actions/actions';
import { Box, Container, Paper, Typography } from '@mui/material';

export default function Index() {
  const dispatch = useDispatch()
  const buttonStyles = useSelector((state) => state.button_style)
  const themes = useSelector((state) => state.all_theme)
  const New_themes = useSelector((state) => state.apply_new_theme)

  const [buttonStyle, setButtonStyle] = useState({
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    textColor: 'white',
    background: 'green',
  });
  const [active, setActive] = useState(null)
  const activate_paper = {
    border: '1px solid green'
    //  backgroundColor:''
  }
  useEffect(() => {
    dispatch(get_all_theme())
  }, [])

  const [heading_Style, setHeading_Style] = useState({
    color: 'blue',
    fontFamily: 'Arial, sans-serif',
  });
  const handleSettingsChange = (newSettings) => {
    setButtonStyle(newSettings);
  };

  useEffect(() => {
    dispatch(theme_change(buttonStyle))
  }, [buttonStyle])

  const handleHeadingSettingsChange = (newSettings) => {
    setHeading_Style(newSettings);
  };

  const handleActivate = (item, index) => {
    setActive(index)
    dispatch(apply_new_theme(item))
    window.location.reload(true)
  }
  return (
    <Container>
     
      <Typography variant='h5' m={2}>Themes</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', flex: 'wrap' }}>
        {themes.map((item, index) => {
          return (
            <Paper onClick={() => handleActivate(item, index)}
              sx={{
                borderRadius: '10px',
                backgroundPosition: item.backgroundPosition,
                animation: `${item.keyframesStyle} ${item.animation}`,
                OAnimation: item.OAnimation,
                WebkitAnimation: item.WebkitAnimation,
                background: item.background,
                MozAnimation: item.MozAnimation,
                border: active === index ? activate_paper.border : 'none',
                color: '#fff',
                padding: '15px',
                height: '80px',
                backgroundSize: '600% 600%',
                width: '90px',
                margin: '10px',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >

              <Paper sx={{
                borderRadius: '10px',
                opacity: active === index ? activate_paper.opacity : '.9',
                backgroundColor: item.child_div_color,
                WebkitBackdropFilter: 'blur(5px)',
                backdropFilter: 'blur(5px)',
                background: item.child_bg,
                color: item.child_div_text,
                fontFamily: item.fontFamily,
                height: '100%',
                paddingLeft: '10px',
                cursor: 'pointer',
                overflow: 'hidden',
              }}>
                <Typography sx={{ mt: 1, fontFamily: item.fontFamily }}>Title</Typography>

              </Paper>
            </Paper>

          );
        })}
      </Box>

    </Container>
  )
}
