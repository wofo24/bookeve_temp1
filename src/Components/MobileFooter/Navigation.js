import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch, useSelector } from 'react-redux'
import { Paper } from '@mui/material';
import { get_all_cart_data } from '../../Redux/actions/actions';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Media from 'react-media';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Navigation() {
    // const buttonStyles = useSelector((state) => state.button_style)
    const cart_count = useSelector((state) => state.cart_count)
    const buttonStyles = useSelector((state) => state?.apply_new_theme)
    // const update_in_post = useSelector((state) => state.update_in_post)
    const [value, setValue] = React.useState(1);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [path, setPath] = useState()

    // console.log(cart_count, 'this is cart count data')
    useEffect(() => {
        setPath(window.location.pathname)
    }, [window.location.pathname])

    return (
        <Media
            queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
            {(item) => (item.small && (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, px: 3, pt: 1 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                    >
                        <BottomNavigationAction onClick={() => navigate('/profile')} label="My Account" style={{ marginLeft: '0px', height: '50px', width: 'auto', borderRadius: '35px', color: path === '/profile' ? `${buttonStyles.icons_Color}` : `${buttonStyles.icons_Color}`, background: path === '/profile' ? `${buttonStyles.icons_Background}` : 'white' }} icon={<AccountBoxRoundedIcon style={{ color: path === '/profile' ? `${buttonStyles.icons_Color}` : `${buttonStyles.icons_Color}` }} />} />

                        <BottomNavigationAction onClick={() => navigate('/')} label="Home" style={{ marginLeft: '0px', height: '50px', width: 'auto', borderRadius: '35px', color: path === '/' ? `${buttonStyles.icons_Color}` : `${buttonStyles.icons_Color}`, background: path === '/' ? `${buttonStyles.icons_Background}` : 'white' }} icon={<HomeRoundedIcon style={{ color: path === '/' ? `${buttonStyles.icons_Color}` : `${buttonStyles.icons_Color}` }} />} />
                        
                            <BottomNavigationAction onClick={() => navigate('/cart')}
                                label="Cart"
                                style={{
                                    marginRight: '3px',
                                    height:'50px',
                                    width: 'auto',
                                    borderRadius: '35px',
                                    color: path === '/cart'
                                    ? `${buttonStyles.icons_Color}`
                                    : `${buttonStyles.icons_Color}`,
                                    background: path === '/cart' ?
                                    `${buttonStyles.icons_Background}`
                                    : 'white'
                                }} icon={
                                    <Badge   label="Cart" badgeContent={cart_count} color="success">
                                <ShoppingCartRoundedIcon 
                                    style={{color: path === '/cart' 
                                    ? `${buttonStyles.icons_Color}` :
                                    `${buttonStyles.icons_Color}`
                                }} />
                                </Badge>
                                
                                } />
                        
                    </BottomNavigation>
                </Paper>
            ))}



        </Media>
    );
}