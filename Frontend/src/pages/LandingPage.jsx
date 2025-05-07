import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-6xl">
                <div className="w-full md:w-1/3 flex justify-center">
                    <img
                        src="/Home/Sushi_replace_1.jpg"
                        alt="Delicious Sushi"
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                        style={{ maxHeight: '400px' }}
                    />
                </div>

                <div className="w-full md:w-1/3 text-center">
                    <h1 className="text-5xl font-bold text-[#F97316] mb-4">Swiggy</h1>
                    <h2 className="text-xl text-gray-700">Delicious Food, Delivered Fast to Your Door</h2>

                    <div className="mt-8">
                        <Link
                            to="/restaurants"
                            className="bg-[#F97316] text-white py-3 px-8 rounded-full text-xl font-semibold hover:bg-[#E86306] transition-colors duration-300 shadow-md"
                        >
                            Browse Restaurants
                        </Link>
                    </div>
                </div>

                <div className="w-full md:w-1/3 flex justify-center">
                    <img
                        src="/Home/Veggies_new_1.jpg"
                        alt="Fresh Vegetables"
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                        style={{ maxHeight: '400px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LandingPage; 