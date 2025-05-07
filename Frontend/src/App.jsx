import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import RestaurantDetails from './pages/RestaurantDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import MyRestaurants from './pages/MyRestaurants';
import AddRestaurant from './pages/AddRestaurant';
import EditRestaurant from './pages/EditRestaurant';
import ManageMenu from './pages/ManageMenu';
import { initAuth } from './utils/auth';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Initialize authentication
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col bg-background">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="restaurant/:id" element={<RestaurantDetails />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="my-restaurants" element={<MyRestaurants />} />
              <Route path="add-restaurant" element={<AddRestaurant />} />
              <Route path="edit-restaurant/:id" element={<EditRestaurant />} />
              <Route path="manage-menu/:id" element={<ManageMenu />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>

      {/* Toast notifications with custom styling */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
        progressStyle={{
          background: '#FC8019',
        }}
      />
    </>
  );
}

export default App;
