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

function App() {
  // Initialize authentication
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <Router>
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
    </Router>
  );
}

export default App;
