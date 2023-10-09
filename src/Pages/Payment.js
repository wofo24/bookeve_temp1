import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate()

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <CurrencyRupeeTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Cash" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <PaymentTwoToneIcon />
          </ListItemIcon>
          <ListItemText primary="Online Payment" />
        </ListItemButton>
      </List>
      <Divider />
      <Box sx={{p:3}}>
      <Button fullWidth variant='contained'  onClick={()=>navigate('/successful')}>Proceed</Button>
      </Box>
    </Box>
  );
}
