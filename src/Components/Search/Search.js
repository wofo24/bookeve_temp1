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
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
export default function Search(props) {
    const outerTheme = useTheme();
    const dispatch = useDispatch();
    const searched_quarry = useSelector((state) => state.searched_quarry)
    const inputRef = useRef(null);
    const styles = useSelector((state) => state.all_theme)
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
                            '--TextField-brandBorderColor': `${styles?.colors?.primary}`,
                            '--TextField-brandBorderHoverColor': `${styles?.colors?.primary}`,
                            '--TextField-brandBorderFocusedColor': `${styles?.colors?.primary}`,
                            '& label.Mui-focused': {
                                color: `${styles?.colors?.primary}`,
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
                                borderColor: `${styles?.colors?.primary}`,
                            },
                            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: `${styles?.colors?.primary}`,
                            },
                        },
                    },
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '&:before, &:after': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
                            },
                            '&.Mui-focused:after': {
                                borderBottom: `2px solid ${styles?.colors?.primary}`,
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
                                                    {queries ? <CloseIcon onClick={handleDelete} sx={{ ml: -.5, width: 30, height: 30, color: styles?.colors?.primary }} /> : <SearchRoundedIcon sx={{ ml: -.5, width: 30, height: 30, color: styles?.colors?.primary }} />}
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {window.location.pathname === '/package-view' &&
                                                        <ChevronLeftRoundedIcon onClick={() => navigate('/search')} sx={{ ml: -1.5, width: 40, height: 40, color: styles?.colors?.primary }} />
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
                                '& > :not(style)': { m: 0, mt: 6 },
                            }}
                            noValidate
                            autoComplete="off"
                        >
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
                                                    {queries ? <CloseIcon onClick={handleDelete} sx={{ ml: -.5, width: 30, height: 30, color: styles?.colors?.primary }} /> : <SearchRoundedIcon sx={{ ml: -.5, width: 30, height: 30, color: styles?.colors?.primary }} />}
                                                </InputAdornment>
                                            ),
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {window.location.pathname === '/package-view' &&
                                                        <ChevronLeftRoundedIcon onClick={() => navigate('/search')} sx={{ ml: -1.5, width: 40, height: 40, color: styles?.colors?.primary }} />
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
                ))}

            </Media>
        </div>
    );
}
