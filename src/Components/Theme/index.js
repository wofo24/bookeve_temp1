import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { theme_change, get_all_theme, apply_new_theme } from '../../Redux/actions/actions';
import { Box, Paper, Typography } from '@mui/material';

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
    <div>
      {/* <Box sx={{ m: 3, textAlign: 'center' }}>
        <div style={{ margin: '12px', }}>
          <Theme_Button  {...buttonStyles} label='Hello Aman' />
          <div>
            <label>Choose Icon & Text Color:</label>
            <input
              type="color"
              value={buttonStyle.color}
              onChange={(e) =>
                handleSettingsChange({ ...buttonStyle, color: e.target.value })
              }
            />
          </div>
          <div>
            <label>Font Family:</label>
            <select
              value={buttonStyle.fontFamily}
              onChange={(e) =>
                handleSettingsChange({
                  ...buttonStyle,
                  fontFamily: e.target.value,
                })
              }
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>
          <div>
            <label>Text Color:</label>
            <input
              type="color"
              value={buttonStyle.textColor}
              onChange={(e) =>
                handleSettingsChange({
                  ...buttonStyle,
                  textColor: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Background Color:</label>
            <input
              type="color"
              value={buttonStyle.background}
              onChange={(e) =>
                handleSettingsChange({
                  ...buttonStyle,
                  background: e.target.value,
                })
              }
            />
          </div>
    ////////////////////////////////
         
        </div>
      </Box> */}
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

    </div>
  )
}
