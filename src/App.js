import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Unknown_user_entered, get_public_information, get_all_theme } from './Redux/actions/actions';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import Media from 'react-media';
import Open_delete from './Components/Dialog/Open_delete';
import DialogComponent from './Components/Dialog/DialogComponent';
import Repeat from './Components/Dialog/Repeat';
import PackageView from './Components/PackageView';
import DetailsDlg from './Components/Dialog/DetailsDlg';
import Footer from './Components/Footer';
import Navigation from './Components/MobileFooter/Navigation';
import Protected from './Components/ProtectedRouts/Protected';
import Loading from './Components/LoadingIcon/Loading';
import Add_address from './Components/Dialog/Add_address';
import Coupon from './Components/Coupon';
import SuccessFull from './Pages/SuccessFull';
import Track_order from './Pages/Track_order';
import Address_profile from './Pages/UserProfile/Address_profile';
import All_order from './Pages/UserProfile/All_order';
import CheckOut_list from './Components/Dialog/CheckOut_list';
import Index from './Components/Theme';
import InstallPrompt from './Components/InstallPrompt/Install';
import All_Address from './Components/Dialog/All_Address';
import Schedule_dialog from './Components/Dialog/Schedule_dialog';
import All_Bookings from './Pages/All_Bookings';
import Edit_Profile from './Components/Dialog/Edit_Profile';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Otp from './Pages/Otp';
import Profile from './Pages/UserProfile/Profile';
import Home from './Pages/Home';
import Schedule from './Pages/Schedule';
import Address from './Pages/Address';
import Payment from './Pages/Payment';
import Header from './Components/Header';
import Logout from './Components/Dialog/Logout';
import Search_page from './Components/Search/Search_page';
import Snack from './Components/SnackBar/Snack';
import Help from './Components/Dialog/Help';
import ViewT_C from './Components/Dialog/ViewT_C';
import AgreeDialog from './Components/Dialog/AgreeDialog';
import Booking_details from './Pages/Booking_details';

function App() {
  const all_theme = useSelector((state) => state.all_theme)
  const unknown_user_token = Cookies.get('unknown_user_token')
  const token = Cookies.get('token')
  const dispatch = useDispatch()

  useEffect(() => {
    if (unknown_user_token || token) {
      if (token) {
        Cookies.remove('unknown_user_token');
      }
    } else {
      dispatch(Unknown_user_entered());
    }
  }, [token, unknown_user_token, dispatch]);

  useEffect(() => {
    dispatch(get_public_information())
    dispatch(get_all_theme())
  }, [dispatch])
  return (
    <body style={all_theme} >
      {/* <style>{all_theme.keyframesStyle}</style> */}
      <BrowserRouter>
        <Header />
        <DialogComponent />
        <DetailsDlg />
        <Repeat />
        <Logout />
        <Open_delete />
        <Add_address />
        <All_Address />
        <Schedule_dialog />
        <Edit_Profile />
        <InstallPrompt />
        <AgreeDialog />
        <Coupon />
        <CheckOut_list />
        <ViewT_C />
        <Help />
        <Snack />
        <Suspense fallback={<Loading />}>
          <Media queries={{
            small: '(max-width: 768px)',
            medium: '(min-width: 769px) and (max-width: 1024px)',
            large: '(min-width: 1025px)',
          }}>

            {(matches) => (
              <>
                {matches.small ? (
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/profile" element={<Protected component={Profile} />} />
                    <Route path="/schedule" element={<Protected component={Schedule} />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/payment" element={<Protected component={Payment} />} />
                    <Route path="/coupon" element={<Protected component={Coupon} />} />
                    <Route path="/successful" element={<Protected component={SuccessFull} />} />
                    <Route path="/track-order" element={<Protected component={Track_order} />} />
                    <Route path="/address-profile" element={<Protected component={Address_profile} />} />
                    <Route path="/all-order" element={<Protected component={All_order} />} />
                    <Route path="/indexTheme" element={<Protected component={Index} />} />
                    <Route path="/package-view" element={<PackageView />} />
                    <Route path="/search" element={<Search_page />} />
                    <Route path="/booking" element={<All_Bookings />} />
                    <Route path="/booking-details" element={<Booking_details />} />
                    <Route path="/all-booking" element={<All_Bookings />} />
                  </Routes>
                ) :

                  <Container>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/otp" element={<Otp />} />
                      <Route path="/profile" element={<Protected component={Profile} />} />
                      <Route path="/schedule" element={<Protected component={Schedule} />} />
                      <Route path="/address" element={<Address />} />
                      <Route path="/payment" element={<Protected component={Payment} />} />
                      <Route path="/coupon" element={<Protected component={Coupon} />} />
                      <Route path="/successful" element={<Protected component={SuccessFull} />} />
                      <Route path="/track-order" element={<Protected component={Track_order} />} />
                      <Route path="/address-profile" element={<Protected component={Address_profile} />} />
                      <Route path="/all-order" element={<Protected component={All_order} />} />
                      <Route path="/indexTheme" element={<Protected component={Index} />} />
                      <Route path="/package-view" element={<PackageView />} />
                      <Route path="/search" element={<Search_page />} />
                      <Route path="/all-booking" element={<All_Bookings />} />
                      <Route path="/booking-details" element={<Booking_details />} />
                    </Routes>
                  </Container>}
              </>
            )}
          </Media>
        </Suspense>
        <Navigation />
        <Footer />
      </BrowserRouter>

    </body>

  );
}

export default App;
