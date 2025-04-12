import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout
import RootLayout from './layouts/RootLayout';

// Pages - Lazy loaded for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const RestaurantDetails = lazy(() => import('./pages/RestaurantDetails'));
// Import Cart directly for testing
// import Cart from './pages/Cart'; 
const Cart = lazy(() => import('./pages/Cart')); // Restore lazy loading
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
// Import OrderHistory directly for testing
import OrderHistory from './pages/OrderHistory';
// const OrderHistory = lazy(() => import('./pages/OrderHistory')); // Keep lazy version commented
const MyRestaurants = lazy(() => import('./pages/MyRestaurants'));
const AddRestaurant = lazy(() => import('./pages/AddRestaurant'));
const EditRestaurant = lazy(() => import('./pages/EditRestaurant'));
const ManageMenu = lazy(() => import('./pages/ManageMenu')); // Import ManageMenu

// Loading component for Suspense
const Loading = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC8019]"></div>
        <div className="ml-4 text-xl font-semibold text-gray-700">Loading...</div>
    </div>
);

// Error boundary component
const ErrorBoundary = ({ error }) => (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold text-red-600 mb-4">Something went wrong</div>
        <div className="text-gray-600 mb-4">{error.message}</div>
        <button
            onClick={() => window.location.reload()}
            className="bg-[#FC8019] text-white px-4 py-2 rounded-lg hover:bg-[#e07016] transition-colors duration-300"
        >
            Reload Page
        </button>
    </div>
);

// Auth protection wrapper
const ProtectedRoute = ({ children }) => {
    console.log('[ProtectedRoute] Checking authentication...'); // Log entry
    // This is a placeholder for actual auth logic
    // In a real app, you'd check if the user is logged in
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
    console.log(`[ProtectedRoute] Token: ${token}, IsAuthenticated: ${isAuthenticated}`); // Log auth status

    if (!isAuthenticated) {
        console.log('[ProtectedRoute] Not authenticated, navigating to /login'); // Log navigation
        return <Navigate to="/login" replace />;
    }

    console.log('[ProtectedRoute] Authenticated, rendering children.'); // Log rendering children
    return children;
};

// Create router configuration
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorBoundary error={new Error('Route not found')} />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'restaurant/:id',
                element: (
                    <Suspense fallback={<Loading />}>
                        <RestaurantDetails />
                    </Suspense>
                )
            },
            {
                path: 'my-restaurants',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <MyRestaurants />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'add-restaurant',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <AddRestaurant />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'edit-restaurant/:id',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <EditRestaurant />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'manage-menu/:id',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <ManageMenu />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'cart',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <Cart />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'checkout',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <Checkout />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'order-success',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <OrderSuccess />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'order-history',
                element: (
                    <ProtectedRoute>
                        {/* Temporarily remove Suspense */}
                        {/* <Suspense fallback={<Loading />}> */}
                        <OrderHistory />
                        {/* </Suspense> */}
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<Loading />}>
                            <Profile />
                        </Suspense>
                    </ProtectedRoute>
                )
            },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                )
            },
            {
                path: 'register',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Register />
                    </Suspense>
                )
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<Loading />}>
                        <NotFound />
                    </Suspense>
                ),
            },
        ]
    }
]);

// AppRouter component
const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter; 