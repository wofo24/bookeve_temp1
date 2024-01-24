import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useDispatch, useSelector } from 'react-redux';
import { get_search_item, empty_quarry } from '../../Redux/actions/actions';
import TextField from '@mui/material/TextField';
import Media from 'react-media';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
export default function Search(props) {
    const outerTheme = useTheme();
    const dispatch = useDispatch();
    const searched_quarry = useSelector((state) => state.searched_quarry)
    const inputRef = useRef(null);
    const buttonStyles = useSelector((state) => state.all_theme)
    const [queries, setQueries] = useState(props.queries_Recent ? props.queries_Recent : searched_quarry)
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { value } = event.target;
        setQueries(value);

        if (value && value.length >= 3) {
            dispatch(get_search_item(value, props.search_type));
        }
    }

    useEffect(() => {
        setQueries(props.queries_Recent);
      }, [props.queries_Recent]);
      

    const handleDelete = (val) => {
        dispatch(empty_quarry(val));
        setQueries('')
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (queries.split("").length >= 3) {
                navigate('/package-view')
            }
        }
    };

    useEffect(() => {
        if (window.location.pathname === '/search') {
            inputRef.current && inputRef.current.focus()
        }
    }, [])

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
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add this line for box shadow
                            borderRadius: '15px',
                            background: '#ffff'
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            borderColor: `white`,
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
            },
        });

    return (
        <div>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (
                    item.small && (
                        <Box >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { sm: '1fr 1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                            </Box>
                            <FormControl fullWidth>
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField
                                        fullWidth
                                        onChange={handleChange}
                                        inputRef={inputRef}
                                        value={queries}
                                        size='medium'
                                        placeholder="Search..."
                                        onKeyPress={handleKeyPress}
                                        defaultValue={queries ? queries : searched_quarry}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    {queries ? <CloseIcon onClick={handleDelete} sx={{ ml: -.5, width: 30, height: 30, color: buttonStyles.icons_Color }} /> : <SearchRoundedIcon sx={{ ml: -.5, width: 30, height: 30, color: buttonStyles.icons_Color }} />}
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {window.location.pathname === '/package-view' &&
                                                        <ChevronLeftRoundedIcon onClick={() => navigate('/search')} sx={{ ml: -1.5, width: 40, height: 40, color: buttonStyles.icons_Color }} />
                                                    }
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', borderRadius: '15px' },
                                        }}
                                    />
                                </ThemeProvider>
                            </FormControl>
                        </Box>
                    )
                )}
            </Media>

            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}>
                {(item => (
                    item.large && (
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 2, mt: 6 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                <ThemeProvider theme={customTheme(outerTheme)}>
                                    <TextField
                                        fullWidth
                                        onChange={handleChange}
                                        inputRef={inputRef}

                                        placeholder='Search..'
                                        size='medium'

                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <CloseIcon />
                                                </InputAdornment>
                                            ),
                                            style: { textAlign: 'center', borderRadius: '15px' },
                                        }}
                                    />
                                </ThemeProvider>


                            </FormControl>

                        </Box>
                    )
                ))}

            </Media>
        </div>
    );
}
