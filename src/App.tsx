import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout';
import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import SellMedicinePage from '@/pages/sell-medicine';
import BuyMedicinePage from '@/pages/buy-medicine';
import DisposeMedicinePage from '@/pages/DisposeMedicinePage';
import AuthHome from '@/pages/AuthHome'
import BlogPage from '@/pages/BlogPage';
import FAQPage from '@/pages/FAQPage';
import ProfilePage from '@/pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import ContactPage from '@/pages/ContactPage';
import { ThemeProvider } from "@/components/theme-provider"
import UserAdmin from './pages/Admin/UserAdmin';
import MedicineAdmin from './pages/Admin/SellMedicinesAdmin';
import Dashboard from './pages/Admin/Dashboard';
import AdminContactPage from "./pages/Admin/ContactPage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="sell" element={<SellMedicinePage />} />
            <Route path="buy" element={<BuyMedicinePage />} />
            <Route path="dispose" element={<DisposeMedicinePage />} />
            <Route path="auth" element={<AuthHome />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="admin/users" element={<UserAdmin/>}/>
            <Route path='admin/sell-medicine' element={<MedicineAdmin/>}/>
            <Route path='admin/dashboard' element={<Dashboard/>}/>
            <Route path='admin/contact' element={<AdminContactPage/>}/>
            <Route path="notifications/:id" element={<NotificationsPage />} />

          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
