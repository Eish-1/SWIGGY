import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center">
                <div className="text-orange-500 mb-6">
                    <FontAwesomeIcon icon={faExclamationTriangle} size="5x" />
                </div>

                <h1 className="text-4xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>

                <p className="text-gray-600 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound; 