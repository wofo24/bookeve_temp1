import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'; import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
export default function Navigation() {
    const [value, setValue] = React.useState(1);
    const navigate = useNavigate()
    React.useEffect(() => {
        if (value === 0) {
            navigate('/profile')
        }
        else if (value === 1) {
            navigate('/')
        }
        else if (value === 2) {
            navigate('/cart')
        }
    }, [value])


    return (
        <Box sx={{ position: 'fixed', bottom: 0, width: 373 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    console.log(newValue, 'value')
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Profile" icon={<AccountBoxRoundedIcon />} />
                <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
                <BottomNavigationAction label="Cart" icon={<ShoppingCartRoundedIcon />} />
            </BottomNavigation>
        </Box>
    );
}