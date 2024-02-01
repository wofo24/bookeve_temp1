 
 
 const customTheme = (outerTheme) =>
createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '--TextField-brandBorderColor': `${buttonStyles.icons_Color}`,
                    '--TextField-brandBorderHoverColor': `${buttonStyles.icons_Color}`,
                    '--TextField-brandBorderFocusedColor': `${buttonStyles.icons_Color}`,
                    '& label.Mui-focused': {
                        color: `${buttonStyles.icons_Color}`,
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: `${buttonStyles.icons_Color}`,
                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: `${buttonStyles.icons_Color}`,
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: `${buttonStyles.icons_Color}`,
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '&:before, &:after': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                    '&.Mui-focused:after': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    '&:before': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                    '&.Mui-focused:after': {
                        borderBottom: `2px solid ${buttonStyles.icons_Color}`,
                    },
                },
            },
        },
    },
});
export default customTheme;