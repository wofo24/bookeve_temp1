import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CurrencyRupeeTwoToneIcon from '@mui/icons-material/CurrencyRupeeTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Media from 'react-media';
import { checked_out_call, clear_all_cart_data } from '../Redux/actions/actions';

export default function Payment() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selected_date_time_var = useSelector(state => state.selected_date_time)
  const check_out_data = useSelector(state => state.check_out_data)
  const Coupon_Code_value = useSelector((state) => state.apply_onClick_coupon)
  const [data, setData] = React.useState()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const dat = check_out_data?.cart_item_for_check_out_address_id?.map((item) => item)
    const data = {
      "address": dat[0]?.id,
      "appointment_date": selected_date_time_var,
      ...(Coupon_Code_value ? { "coupon": Coupon_Code_value } : {}),
      "packages": check_out_data.cart_item_for_check_out_bag_data
    };
    setData(data)
  }, [])

  const submitData = () => {
    console.log(data, 'this is')
    dispatch(checked_out_call(data))
  }

  React.useEffect(() => {
    if (check_out_data?.check_out_success.success) {
      dispatch(clear_all_cart_data())
      navigate('/successful')
    }

  }, [check_out_data?.check_out_success])
  console.log(check_out_data)
  const navigate = useNavigate()

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const buttonStyles = useSelector((state) => state.apply_new_theme)

  return (
    <>

      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}>
        {(item) => (
          item.large && (
            <Container sx={{ my: 15 }}>
              <Box sx={{ width: '50%', bgcolor: 'background.paper', margin: 'auto', borderRadius: '10px', color: 'black', p: 2 }}>
                <Typography variant='h5' mb={2}>Select Payment method</Typography>
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
                <Box sx={{ p: 3 }}>
                  <Button fullWidth style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' onClick={() => navigate('/successful')}>Proceed</Button>
                </Box>
              </Box>
            </Container>
          )
        )}
      </Media>
      <Media
        queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}>
        {(item) => (
          item.small && (
            <Container>
              <Box sx={{
                width: '100%', bgcolor: 'background.paper', my: 5, borderRadius: '10px',
                backdropFilter: buttonStyles.child_backdropFilter,
                background: buttonStyles.child_bg,
                color: buttonStyles.child_div_text,
              }}>
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
                <Box sx={{ p: 3 }}>
                  <Button fullWidth style={{ background: buttonStyles.buttonColor, color: buttonStyles.buttonText }} variant='contained' onClick={submitData}>Proceed</Button>
                </Box>
              </Box>
            </Container>
          )
        )}


      </Media>


    </>
  );
}
