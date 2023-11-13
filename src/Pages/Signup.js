import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
// import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSelector, useDispatch } from 'react-redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Media from 'react-media';
export default function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = useState([])
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [error, setError] = useState('')
    const buttonStyles = useSelector((state) => state.apply_new_theme)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        const { value, name } = event.target
        setFormData({ ...formData, [name]: value })
    }
    console.log(formData, 'form data')

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = {}
        if (formData) {
            if (formData.password !== formData.confirm_password) {
                errors.confirm_password = "Password does't match!"
            }
            else {
                errors.confirm_password = ""
            }
        }
        setError(errors)
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
                {(item) => (item.small && (

                    <>
                        <Box px={2} py={7} my={5} mx={2} sx={{
                            borderRadius: "10px",
                            backdropFilter: buttonStyles.child_backdropFilter,
                            background: buttonStyles.child_bg,
                            color: buttonStyles.child_div_text,
                        }}>
                            <Box>
                                <Typography textAlign='left' fontSize={36} >Sign up</Typography>
                                <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>Don't have account &nbsp;
                                    <span className='ThemeColorYellow'>
                                        <Link to='/signup'>Create Your Account</Link>&nbsp;
                                    </span> it's takes less then 30 second's.
                                </Typography>
                            </Box>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Box py={1}>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    id="standard-textarea"
                                                    label="Name"
                                                    name='name'
                                                    multiline
                                                    variant="standard"
                                                    required
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type='tel'  // Use type 'tel' for phone numbers
                                                    id="standard-textarea"
                                                    label="Phone number"
                                                    name='phone_number'
                                                    required
                                                    inputProps={{
                                                        pattern: "^[0-9]{10}$",
                                                    }}
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                    <Input
                                                        required
                                                        onChange={handleChange}
                                                        name='password'

                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                                    <Input
                                                        onChange={handleChange}
                                                        name='confirm_password'
                                                        required
                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <Typography color='error'>{error.confirm_password}</Typography>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} textAlign='left' >
                                                <Box sx={{ ml: -1.3, mt: -1.6 }}>
                                                    <FormControlLabel sx={{ opacity: '.8' }} required control={<Checkbox />} label={<Typography fontSize={12}>Accept T&C</Typography>} />

                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} textAlign='right' >
                                                <Box>
                                                    <Link to="/forgot_pass" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                        Forgot Password ?
                                                    </Link>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} py={2} textAlign='left'>
                                                <Link to="/login" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                    Already Have Account Login?
                                                </Link>
                                            </Grid>
                                            <Grid item xs={6} py={2} textAlign='right'>
                                                <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Signup</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </div>

                        </Box>

                    </>
                )
                )}

            </Media>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => (item.large && (

                    <>
                        <Box px={8} py={5} my={5} mx={15} sx={{
                            borderRadius: "10px",
                            backdropFilter: buttonStyles.child_backdropFilter,
                            background: buttonStyles.child_bg,
                            color: buttonStyles.child_div_text,
                        }}>
                            <Box>
                                <Typography textAlign='left' fontSize={46} >Sign up</Typography>
                                <Typography sx={{ opacity: '.7' }} fontSize={11} textAlign='left'>Don't have account &nbsp;
                                    <span className='ThemeColorYellow'>
                                        <Link to='/signup'>Create Your Account</Link>&nbsp;
                                    </span> it's takes less then 30 second's.
                                </Typography>
                            </Box>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Box py={1}>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    id="standard-textarea"
                                                    label="Name"
                                                    name='name'
                                                    multiline
                                                    variant="standard"
                                                    required
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <TextField
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type='tel'  // Use type 'tel' for phone numbers
                                                    id="standard-textarea"
                                                    label="Phone number"
                                                    name='phone_number'
                                                    required
                                                    inputProps={{
                                                        pattern: "^[0-9]{10}$",
                                                    }}
                                                    variant="standard"
                                                />
                                            </Grid>
                                            <Grid xs={12} item>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                    <Input
                                                        required
                                                        onChange={handleChange}
                                                        name='password'

                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid xs={12} item>
                                                <FormControl variant="standard" fullWidth>
                                                    <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                                                    <Input
                                                        onChange={handleChange}
                                                        name='confirm_password'
                                                        required
                                                        id="standard-adornment-password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    onClick={handleClickShowPassword}
                                                                    onMouseDown={handleMouseDownPassword}
                                                                >
                                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    <Typography color='error'>{error.confirm_password}</Typography>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} textAlign='left' >
                                                <Box sx={{ ml: -1.3, mt: -1.6 }}>
                                                    <FormControlLabel sx={{ opacity: '.8' }} required control={<Checkbox />} label={<Typography fontSize={12}>Accept T&C</Typography>} />

                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} textAlign='right' >
                                                <Box>
                                                    <Link to="/forgot_pass" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                        Forgot Password ?
                                                    </Link>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={6} py={2} textAlign='left'>
                                                <Link to="/login" color="primary" style={{ cursor: 'pointer', fontSize: '12px' }}>
                                                    Already Have Account Login?
                                                </Link>
                                            </Grid>
                                            <Grid item xs={6} py={2} textAlign='right'>
                                                <Button id='BackgroundColorChangeOnly' variant='contained' type='submit'>Signup</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </form>
                            </div>

                        </Box>

                    </>
                )
                )}

            </Media>


        </div>
    )
}
