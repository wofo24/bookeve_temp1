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
import CloseIcon from '@mui/icons-material/Close';


export default function Search(props) {
    const dispatch = useDispatch();
   
    const inputRef = useRef(null);
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const [queries, setQueries] = useState()

    const handleChange = (event) => {
        const { value } = event.target;
        setQueries(value)
        dispatch(get_search_item(value, props.search_type));
    }
    const handleDelete = (val) => {
        dispatch(empty_quarry(val));
    }

    useEffect(() => {
        dispatch(get_search_item(queries, props.search_type));
    }, [props.search_type])

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
                        <Box sx={{}}>
                            <FormControl fullWidth>
                                <TextField

                                    fullWidth
                                    onChange={handleChange}
                                    inputRef={inputRef} // Use inputRef here
                                    // value={query}
                                    size='medium'
                                    placeholder="Search..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchRoundedIcon sx={{ width: 40, height: 40, color: buttonStyles.icons_Color }} />
                                            </InputAdornment>
                                        ),
                                        style: { textAlign: 'center', borderRadius: '15px' },
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                border: '2px solid'
                                            }
                                        }

                                    }}
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
                                    inputRef={inputRef}

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
