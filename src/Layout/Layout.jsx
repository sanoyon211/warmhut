import React from 'react'
import Navbar from '../NavFoot/Navbar'
import { Outlet } from 'react-router'
import Footer from '../NavFoot/Footer'
import ScrollToTop from '../ScrollToTop'



const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout