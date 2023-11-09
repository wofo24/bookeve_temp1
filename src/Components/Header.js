import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Link } from 'react-router-dom';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import { useSelector, useDispatch } from 'react-redux';
export default function Header() {
    const pages = ['All orders', 'Address', 'Sign out'];
    const settings = ['Search', 'Offers', 'Profile', 'Cart'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [token, setToken] = useState(true)
    const navigate = useNavigate()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleChangeRoute = (index) => {
        if (0 === index) {
            navigate('/all_order')

        }
        else if (1 === index) {
            navigate('/address_profile')
        }
        else {

        }
    }
    return (
        <div>
            <AppBar position="static" sx={{ background: buttonStyles.child_bg }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ m: 'auto' }}>
                        <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, }} onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: buttonStyles.fontFamily,
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',

                            }}
                        >
                            Company Name
                        </Typography>
                        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>

                            <Menu
                                id="menu-appbar"

                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    zIndex: '9999'
                                }}
                            >
                                <Button onClick={() => navigate('/indexTheme')}>Try Theme</Button>
                            </Menu>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>




                        <Box sx={{ px: 17, flexGrow: 1, justifyContent: 'right', display: { xs: 'none', md: 'flex' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, fontSize: '50px' }} onClick={() => navigate('/')} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="a"
                                    href="#app-bar-with-responsive-menu"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: buttonStyles.fontFamily,
                                        fontWeight: 700,
                                        color: buttonStyles.color,
                                        letterSpacing: '.1rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        fontSize: '25px'
                                    }}
                                >

                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 1, justifyContent: 'right', display: { xs: 'none', md: 'flex' } }}>

                                <Link
                                    to={`/search`}
                                    style={{ textDecoration: 'none', }}
                                >
                                    <Button

                                        onClick={handleCloseNavMenu}
                                        sx={{ mx: 3, my: 2, color: 'white', display: 'flex', fontSize: '20px', textTransform: 'capitalize', alignItems: 'center' }}
                                    >
                                        <SearchRoundedIcon sx={{ m: 1 }} /> Search
                                    </Button>
                                </Link>

                                <Link
                                   
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}

                                        sx={{ mx: 3, my: 2, color: 'white', display: 'flex', fontSize: '20px', textTransform: 'capitalize' }}
                                    >
                                        <AccountCircleOutlinedIcon sx={{ m: 1 }} />  Ashu
                                    </Button>
                                </Link>


                                <Link
                                    // key={page}
                                    to={`/cart`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ mx: 3, my: 2, color: 'white', display: 'flex', fontSize: '20px', textTransform: 'capitalize' }}
                                    >
                                        <LocalMallOutlinedIcon sx={{ m: 1 }} />  Cart
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                        <Menu

                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Link to='/profile' style={{ textDecoration: 'none' }}> <MenuItem onClick={handleClose}  >Profile</MenuItem></Link>
                            <Link to='/all_booking' style={{ textDecoration: 'none' }}>  <MenuItem onClick={handleClose} >My Booking</MenuItem></Link>
                            <Link to='/indexTheme' style={{ textDecoration: 'none' }}> <MenuItem onClick={handleClose}>Theme</MenuItem></Link>
                            <Link to='/' style={{ textDecoration: 'none' }}> <MenuItem onClick={handleClose}>Logout</MenuItem></Link>

                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}
