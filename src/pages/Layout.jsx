import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './index';
import ProjectLaunchPage from './ProjectLaunch';
import Navbar from '../components/Navbar';
import Footer from "./../components/Footer";
// import "./../util/analytics";
// import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";
// import { QueryClientProvider } from "../util/db";

const Layout = () => {
  return (
    // <QueryClientProvider>
    // <AuthProvider>
    <ThemeProvider>
      <Router>
        <Navbar
          color="default"
          logo="https://uploads.divjoy.com/logo.svg"
          logoInverted="https://uploads.divjoy.com/logo-white.svg"
        />
        <Routes>
          <Route path="/" element={<IndexPage />} />

          <Route path="/projects/:id" element={<ProjectLaunchPage />} />

          <Route path="*" element={<div>Not found</div>} />
        </Routes>
        <Footer
          bgColor="light"
          size="normal"
          bgImage=""
          bgImageOpacity={1}
          description="A short description of what you do here"
          copyright={`© ${new Date().getFullYear()} Company`}
          logo="https://uploads.divjoy.com/logo.svg"
          logoInverted="https://uploads.divjoy.com/logo-white.svg"
          sticky={true}
        />
      </Router>
    </ThemeProvider>
    // </AuthProvider>
  // </QueryClientProvider>
  )
}

export default Layout
