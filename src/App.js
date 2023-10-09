import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import Home from './Pages/Home';
import Cookies from 'js-cookie';
import Location from './Tracker/Location';
import axios from 'axios';
import Open_delete from './Components/Dialog/Open_delete';
import DeviceInfo from './Tracker/DeviceInfo';
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
const Cart = React.lazy(() => import('./Pages/Cart'))
const Signup = React.lazy(() => import('./Pages/Signup'))
const Login = React.lazy(() => import('./Pages/Login'))
const Otp = React.lazy(() => import('./Pages/Otp'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const Home = React.lazy(() => import('./Pages/Home'))
const Schedule = React.lazy(() => import('./Pages/Schedule'))
const Address = React.lazy(() => import('./Pages/Address'))
const Payment = React.lazy(() => import('./Pages/Payment'))

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <DialogComponent />
        <DetailsDlg />
        <Repeat />
        <Open_delete />
        <Add_address />
        <Routes>
          <Route path="/" element={<Suspense fallback={<div><Loading /></div>}><Home /></Suspense>} />
          <Route path="/cart" element={<Suspense fallback={<div><Loading /></div>}><Cart /></Suspense>} />
          <Route path="/signup" element={<Suspense fallback={<div><Loading /></div>}><Signup /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<div><Loading /></div>}><Login /></Suspense>} />
          <Route path="/otp" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Otp} /></Suspense>} />
          <Route path="/profile" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Profile} /></Suspense>} />
          <Route path="/schedule" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Schedule} /></Suspense>} />
          <Route path="/address" element={<Suspense fallback={<div><Loading /></div>}><Address /></Suspense>} />
          <Route path="/payment" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Payment} /></Suspense>} />
          <Route path="/coupon" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Coupon} /></Suspense>} />
          <Route path="/successful" element={<Suspense fallback={<div><Loading /></div>}><Protected component={SuccessFull} /></Suspense>} />
          <Route path="/track_order" element={<Suspense fallback={<div><Loading /></div>}><Protected component={Track_order} /></Suspense>} />
          <Route path="/package_view" element={<PackageView />} />
        </Routes>
        <Navigation />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
