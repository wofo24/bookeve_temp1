import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Link } from 'react-router-dom';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import { useSelector, useDispatch } from 'react-redux';
import { get_public_information } from '../Redux/actions/actions';
import Media from 'react-media';

export default function Header() {
    const pages = ['All orders', 'Address', 'Sign out'];
    const settings = ['Search', 'Offers', 'Profile', 'Cart'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
    const buttonStyles = useSelector((state) => state.apply_new_theme)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const public_info = useSelector((state) => state?.public_information?.data)
    const error = useSelector((state) => state.error)
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    useEffect(() => {
        dispatch(get_public_information())
    }, [])

    return (
        <>
            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => item.large && (
                    <AppBar sx={{
                        position: 'sticky',
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                    }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters sx={{ m: 'auto' }}>
                                <Box sx={{ height: '40px', width: '40px', display: { xs: 'flex', md: 'none' } }}>
                                    {public_info && public_info.company_logo ? (<img src={public_info.company_logo} style={{ height: '40px', width: '40px', marginRight: '9px' }} />) :
                                        (
                                            <>
                                                <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, height: '40px', width: '40px' }} onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                                            </>
                                        )}

                                </Box>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: buttonStyles.fontFamily,
                                        fontWeight: 700,
                                        letterSpacing: '.1rem',
                                        color: buttonStyles.Company_Name_title,
                                        textDecoration: 'none',

                                    }}
                                >
                                    {public_info?.business_name}
                                </Typography>
                                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, color: buttonStyles.icons_Color }}>

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
                                            zIndex: '9999',
                                            color: 'black'
                                        }}
                                    >
                                        <Button color='success' onClick={() => navigate('/indexTheme')}>Try Theme</Button>
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
                                        <Box sx={{ height: '40px', width: '40px' }}>
                                            {public_info && public_info.company_logo ? (<img src={public_info.company_logo} style={{ height: '50px', width: '50px', marginRight: '9px' }} />) :
                                                (
                                                    <>
                                                        <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, height: '40px', width: '40px' }} onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                                                    </>
                                                )}

                                        </Box>
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
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/search' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize', alignItems: 'center' }}
                                            >
                                                <SearchRoundedIcon fontSize='large' sx={{ mx: 1 }} /> Search
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

                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/profile' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize' }}
                                            >
                                                <AccountCircleOutlinedIcon fontSize='large' sx={{ mx: 1 }} />  Ashu
                                            </Button>
                                        </Link>


                                        <Link
                                            // key={page}
                                            to={`/cart`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/cart' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize' }}
                                            >
                                                <Badge badgeContent={4} color="success">
                                                    <LocalMallOutlinedIcon fontSize='large' sx={{ mx: 1, mt: .2 }} />  Cart
                                                </Badge>
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box>
                                    <Menu

                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',

                                        }}

                                    >
                                        <Box sx={{ width: 200 }}>
                                            <Link to='/profile' style={{
                                                textDecoration: 'none', color: 'inherit',
                                            }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }}  >Profile</MenuItem></Link>
                                            <Link to='/all-booking' style={{ textDecoration: 'none', color: 'inherit', }}>  <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }} >My Booking</MenuItem></Link>
                                            <Link to='/indexTheme' style={{ textDecoration: 'none', color: 'inherit', }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }} >Theme</MenuItem></Link>
                                            <Link to='/' style={{ textDecoration: 'none', color: 'inherit', }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500, color: 'red' }} >Logout</MenuItem></Link>
                                        </Box>
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar >
                )}

            </Media>

            <Media
                queries={{
                    small: '(max-width: 768px)',
                    medium: '(min-width: 769px) and (max-width: 1024px)',
                    large: '(min-width: 1025px)',
                }}
            >
                {(item) => item.small && (window.location.pathname !== '/search' && window.location.pathname !== '/package-view') && (
                    <AppBar sx={{
                        position: 'sticky',
                        backdropFilter: buttonStyles.child_backdropFilter,
                        background: buttonStyles.child_bg,
                    }}>
                        <Container maxWidth="xl">
                            <Toolbar disableGutters >
                                <Box sx={{ height: '40px', width: '40px', display: { xs: 'flex', md: 'none' } }}>
                                    {public_info && public_info.company_logo ? (<img src={public_info.company_logo} style={{ height: '40px', width: '40px', marginRight: '9px' }} />) :
                                        (
                                            <>
                                                <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, height: '40px', width: '40px' }} onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                                            </>
                                        )}
                                </Box>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="a"
                                    href="/"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'flex', md: 'none' },
                                        flexGrow: 1,
                                        fontFamily: buttonStyles.fontFamily,
                                        fontWeight: 700,
                                        letterSpacing: '.1rem',
                                        color: buttonStyles.Company_Name_title,
                                        textDecoration: 'none',

                                    }}
                                >
                                    {public_info?.business_name}
                                </Typography>
                                <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, color: buttonStyles.icons_Color }}>

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
                                            zIndex: '9999',
                                            color: 'black'
                                        }}
                                    >
                                        <Button color='success' onClick={() => navigate('/indexTheme')}>Try Theme</Button>
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
                                        <Box sx={{ height: '40px', width: '40px' }}>
                                            {public_info && public_info.company_logo ? (<img src={public_info.company_logo} style={{ height: '50px', width: '50px', marginRight: '9px' }} />) :
                                                (
                                                    <>
                                                        <StoreRoundedIcon style={{ color: buttonStyles.icons_Color, height: '40px', width: '40px' }} onClick={() => navigate('/')} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                                                    </>
                                                )}

                                        </Box>
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
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/search' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize', alignItems: 'center' }}
                                            >
                                                <SearchRoundedIcon fontSize='large' sx={{ mx: 1 }} /> Search
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

                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/profile' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize' }}
                                            >
                                                <AccountCircleOutlinedIcon fontSize='large' sx={{ mx: 1 }} />  Ashu
                                            </Button>
                                        </Link>


                                        <Link
                                            // key={page}
                                            to={`/cart`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Button
                                                onClick={handleCloseNavMenu}
                                                sx={{ mx: 3, my: 2, color: window.location.pathname === '/cart' ? buttonStyles.icons_Color : 'black', display: 'flex', fontSize: '25px', textTransform: 'capitalize' }}
                                            >
                                                <Badge badgeContent={4} color="success">
                                                    <LocalMallOutlinedIcon fontSize='large' sx={{ mx: 1, mt: .2 }} />  Cart
                                                </Badge>
                                            </Button>
                                        </Link>
                                    </Box>
                                </Box>
                                <Box>
                                    <Menu

                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',

                                        }}

                                    >
                                        <Box sx={{ width: 200 }}>
                                            <Link to='/profile' style={{
                                                textDecoration: 'none', color: 'inherit',
                                            }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }}  >Profile</MenuItem></Link>
                                            <Link to='/all-booking' style={{ textDecoration: 'none', color: 'inherit', }}>  <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }} >My Booking</MenuItem></Link>
                                            <Link to='/indexTheme' style={{ textDecoration: 'none', color: 'inherit', }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500 }} >Theme</MenuItem></Link>
                                            <Link to='/' style={{ textDecoration: 'none', color: 'inherit', }}> <MenuItem onClick={handleClose} style={{ fontSize: '20px', fontWeight: 500, color: 'red' }} >Logout</MenuItem></Link>
                                        </Box>
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar >
                )}
            </Media>
        </>
    )
}
