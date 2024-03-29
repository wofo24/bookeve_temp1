import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Open_delete from './Components/Dialog/Open_delete';
import Header from './Components/Header';
import DialogComponent from './Components/Dialog/DialogComponent'
import Repeat from './Components/Dialog/Repeat';
import PackageView from './Components/PackageView';
import DetailsDlg from './Components/Dialog/DetailsDlg'
import Footer from './Components/Footer';
import Navigation from './Components/MobileFooter/Navigation';
import Protected from './Components/ProtectedRouts/Protected';
import Loading from './Components/LoadingIcon/Loading';
import Add_address from './Components/Dialog/Add_address';
import Coupon from './Components/Coupon';
import SuccessFull from './Pages/SuccessFull';
import Track_order from './Pages/Track_order';
import Address_profile from './Pages/UserProfile/Address_profile';
import All_order from './Pages/UserProfile/All_order'
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import CheckOut_list from './Components/Dialog/CheckOut_list';
import Index from './Components/Theme';
import Media from 'react-media';
import InstallPrompt from './Components/InstallPrompt/Install';
import Search from './Components/Search/Search';
import All_Address from './Components/Dialog/All_Address';
import Schedule_dialog from './Components/Dialog/Schedule_dialog';
import All_Bookings from './Pages/All_Bookings';
import Edit_Profile from './Components/Dialog/Edit_Profile';
import Booking_details from './Pages/Booking_details';
import AgreeDialog from './Components/Dialog/AgreeDialog'
import ViewT_C from './Components/Dialog/ViewT_C'
import Help from './Components/Dialog/Help';
import Snack from './Components/SnackBar/Snack'
import Search_page from './Components/Search/Search_page';
import { Unknown_user_entered, get_public_information, get_all_theme } from './Redux/actions/actions';
import Logout from './Components/Dialog/Logout';
const Cart = React.lazy(() => import('./Pages/Cart'))
const Signup = React.lazy(() => import('./Pages/Signup'))
const Login = React.lazy(() => import('./Pages/Login'))
const Otp = React.lazy(() => import('./Pages/Otp'))
const Profile = React.lazy(() => import('./Pages/UserProfile/Profile'))
const Home = React.lazy(() => import('./Pages/Home'))
const Schedule = React.lazy(() => import('./Pages/Schedule'))
const Address = React.lazy(() => import('./Pages/Address'))
const Payment = React.lazy(() => import('./Pages/Payment'))

function App() {
  const New_themes = useSelector((state) => state.apply_new_theme)
  const all_theme = useSelector((state) => state.all_theme)
  const pathname = useSelector((state) => state.pathname)
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
  }, [])

  useEffect(() => {
    dispatch(get_all_theme())
  }, [])
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
        <Media queries={{
          small: '(max-width: 768px)',
          medium: '(min-width: 769px) and (max-width: 1024px)',
          large: '(min-width: 1025px)',
        }}>

          {(matches) => (
            <>
              {matches.small ? (
                <Routes>
                  <Route path="/" element={<Suspense fallback={<div><Loading /></div>}><Home /></Suspense>} />
                  <Route path="/cart" element={<Suspense fallback={<div><Loading /></div>}><Cart /></Suspense>} />
                  <Route path="/signup" element={<Suspense fallback={<div><Loading /></div>}><Signup /></Suspense>} />
                  <Route path="/login" element={<Suspense fallback={<div><Loading /></div>}><Login /></Suspense>} />
                  <Route path="/otp" element={<Suspense fallback={<div><Loading /></div>}><Otp /></Suspense>} />
                  <Route path="/profile" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Profile} /></Suspense>} />
                  <Route path="/schedule" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Schedule} /></Suspense>} />
                  <Route path="/address" element={<Suspense fallback={<div><Loading /></div>}><Address /></Suspense>} />
                  <Route path="/payment" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Payment} /></Suspense>} />
                  <Route path="/coupon" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Coupon} /></Suspense>} />
                  <Route path="/successful" element={<Suspense fallback={<div><Loading /></div>}><Protected component={SuccessFull} /></Suspense>} />
                  <Route path="/track-order" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Track_order} /></Suspense>} />
                  <Route path="/address-profile" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Address_profile} /></Suspense>} />
                  <Route path="/all-order" element={<Suspense fallback={<div><Loading /></div>}><Protected component={All_order} /></Suspense>} />
                  <Route path="/indexTheme" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Index} /></Suspense>} />
                  <Route path="/package-view" element={<PackageView />} />
                  <Route path="/search" element={<Search_page />} />
                  <Route path="/booking" element={<All_Bookings />} />
                  <Route path="/booking-details" element={<Booking_details />} />
                  <Route path="/all-booking" element={<All_Bookings />} />
                </Routes>
              ) :

                <Container>
                  <Routes>
                    <Route path="/" element={<Suspense fallback={<div><Loading /></div>}><Home /></Suspense>} />
                    <Route path="/cart" element={<Suspense fallback={<div><Loading /></div>}><Cart /></Suspense>} />
                    <Route path="/signup" element={<Suspense fallback={<div><Loading /></div>}><Signup /></Suspense>} />
                    <Route path="/login" element={<Suspense fallback={<div><Loading /></div>}><Login /></Suspense>} />
                    <Route path="/otp" element={<Suspense fallback={<div><Loading /></div>}><Otp /></Suspense>} />
                    <Route path="/profile" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Profile} /></Suspense>} />
                    <Route path="/schedule" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Schedule} /></Suspense>} />
                    <Route path="/address" element={<Suspense fallback={<div><Loading /></div>}><Address /></Suspense>} />
                    <Route path="/payment" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Payment} /></Suspense>} />
                    <Route path="/coupon" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Coupon} /></Suspense>} />
                    <Route path="/successful" element={<Suspense fallback={<div><Loading /></div>}><Protected component={SuccessFull} /></Suspense>} />
                    <Route path="/track-order" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Track_order} /></Suspense>} />
                    <Route path="/address-profile" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Address_profile} /></Suspense>} />
                    <Route path="/all-order" element={<Suspense fallback={<div><Loading /></div>}><Protected component={All_order} /></Suspense>} />
                    <Route path="/indexTheme" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Index} /></Suspense>} />
                    <Route path="/package-view" element={<PackageView />} />
                    <Route path="/search" element={<Search_page />} />
                    <Route path="/all-booking" element={<All_Bookings />} />
                    <Route path="/booking-details" element={<Booking_details />} />
                  </Routes>
                </Container>}
            </>
          )}
        </Media>
        <Navigation />
        <Footer />
      </BrowserRouter>

    </body>

  );
}

export default App;
