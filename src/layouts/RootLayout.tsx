import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/NavigationBar';
import {Toaster} from 'react-hot-toast';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import { useAppContext } from '../hooks/useAppContext';

function RootLayout() {
  const {showLogin} = useAppContext()
  const isSeller = useLocation().pathname.includes('seller');
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {isSeller ? null : <Navbar />}
      {showLogin && <LoginForm/>}
      <Toaster/>
      {/* Page Content */}
      <main className={`${isSeller ? '' : 'relative bg-white px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Outlet />
         {! isSeller && <Footer/>}
      </main>
    </div>
  );
}

export default RootLayout;
