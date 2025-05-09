import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { initAuth } from '../utils/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
    // Check auth state on page load
    useEffect(() => {
        // Initialize authentication
        initAuth();
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <Navbar />
            <main className="flex-grow w-full">
                <Outlet />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <footer className="py-4 bg-gray-100 text-center text-gray-600 text-sm">
                <p>© {new Date().getFullYear()} Swiggy Clone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default RootLayout; 