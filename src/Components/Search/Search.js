import React, { useEffect, useRef } from 'react';
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
import CloseIcon from '@mui/icons-material/Close';
export default function Search(props) {
    const dispatch = useDispatch();
    const query = useSelector((state) => state.search_item);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, []);

    const handleChange = (event) => {
        const { value } = event.target;
        dispatch(get_search_item(value));
    }
    const handleDelete = (val) => {
        dispatch(empty_quarry(val));
        console.log('this is called')
    }

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
                        <Box sx={{ border: '2px solid ', my: 1, mx: 1, borderRadius: '10px' }}>
                            <FormControl fullWidth>
                                <Input
                                    fullWidth
                                    onChange={handleChange}
                                    inputRef={inputRef} // Use inputRef here
                                    value={query}
                                    size='large'
                                    placeholder='Search..'
                                    id="input-with-icon-adornment"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchRoundedIcon sx={{ my: 2, mx: 1 }} />
                                        </InputAdornment>
                                    }
                                />
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
                                <OutlinedInput

                                    onChange={handleChange}
                                    inputRef={inputRef} // Use inputRef here
                                    value={query}
                                    id="outlined-adornment-password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                            >
                                                <CloseIcon onClick={() => handleDelete(' ')} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                        </Box>
                    )
                ))}

            </Media>
        </div>
    );
}
