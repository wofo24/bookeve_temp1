import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useDispatch, useSelector } from 'react-redux'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'; import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Media from 'react-media';
export default function Navigation() {
    // const buttonStyles = useSelector((state) => state.button_style)
    const buttonStyles = useSelector((state) => state?.apply_new_theme)
    const [value, setValue] = React.useState(1);
    // console.log(buttonStyles, 'buttton style from Navigatuib')
    const navigate = useNavigate()
   

    return (
        <Media
            queries={{
                small: '(max-width: 768px)',
                medium: '(min-width: 769px) and (max-width: 1024px)',
                large: '(min-width: 1025px)',
            }}>
            {(item) => (item.small && (
                <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: '9999' }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                      
                    >
                        <BottomNavigationAction onClick={()=>navigate('/profile')} label="Profile" style={{ color: `${buttonStyles.icons_Color}` }} icon={<AccountBoxRoundedIcon style={{ color: `${buttonStyles.icons_Color}` }} />} />
                        <BottomNavigationAction onClick={()=>navigate('/')} label="Home" style={{ color: `${buttonStyles.icons_Color}` }} icon={<HomeRoundedIcon style={{ color: `${buttonStyles.icons_Color}` }} />} />
                        <BottomNavigationAction onClick={()=>navigate('/cart')} label="Cart" style={{ color: `${buttonStyles.icons_Color}` }} icon={<ShoppingCartRoundedIcon style={{ color: `${buttonStyles.icons_Color}` }} />} />
                    </BottomNavigation>
                </Box>
            ))}



        </Media>
    );
}